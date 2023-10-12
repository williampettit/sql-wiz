"use server";

import { revalidatePath } from "next/cache";

import OpenAI from "openai";

import { SQL_CONCEPTS } from "@/data/sql-concepts";
import { MOCK_QUESTION_DIFFICULTIES } from "@/schemas/generate-question-schema";
import {
  type QuestionSolverFormValues,
  questionSolverFormSchema,
  questionSolverResponseSchema,
} from "@/schemas/solve-question-schema";

import { requireOpenAiApiKey, requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

export async function solveQuestion(inputData: QuestionSolverFormValues) {
  const parsedInputData = questionSolverFormSchema.safeParse(inputData);

  if (!parsedInputData.success) {
    throw new Error(parsedInputData.error.message);
  }

  const session = await requireSession();

  // create openai client with user's api key
  const userOpenAiApiKey = await requireOpenAiApiKey();
  const openaiClient = new OpenAI({
    apiKey: userOpenAiApiKey,
  });

  // format prompt
  const systemPrompt = [
    "You are an AI assistant that helps people learn SQL for their upcoming SQL exam.",
    "You are given a question to solve.",
    "Provide the correct SQL query solution to the problem.",
    "Put each clause on a new line.",
    "If you are unsure of what schema to use, use the Northwinds Database.",
    "In the question itself, you must provide the exact table and column names in PascalCase that the user will need to use (e.g. Select the most profitable ProductIDs from the Orders table).",
    "---",
    "The question is:",
    parsedInputData.data.question,
  ].join("\n");

  // solve question
  const openaiResponse = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    function_call: {
      name: "submit_solution_to_user",
    },
    functions: [
      {
        name: "submit_solution_to_user",
        description: "Submit the solution to the user.",
        parameters: {
          type: "object",
          required: [
            "title",
            "answer",
            "hints",
            "explanation",
            "tables",
            "columns",
            "concept",
            "difficulty",
          ],
          properties: {
            title: {
              type: "string",
              description:
                "The summary of the question. (e.g. 'Using GROUP BY with COUNT to count the number of customers in each country.')",
            },
            answer: {
              type: "string",
              description: "The answer (as an SQL query) to the question.",
            },
            hints: {
              type: "array",
              items: {
                type: "string",
              },
              description: "The hints to provide to the user.",
            },
            difficulty: {
              type: "string",
              enum: MOCK_QUESTION_DIFFICULTIES,
            },
            concept: {
              type: "string",
              enum: SQL_CONCEPTS.map((concept) => concept.name),
            },
            tables: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "The tables that the user will need to use in the SQL query.",
            },
            columns: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "The columns that the user will need to use in the SQL query.",
            },
            explanation: {
              type: "string",
              description: "The explanation to provide to the user.",
            },
          },
        },
      },
    ],
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
    ],
  });

  // get data from response
  const functionCallData =
    openaiResponse.choices[0].message.function_call?.arguments;

  // if no data, throw error
  if (!functionCallData) {
    throw new Error("OpenAI response is missing function_call.arguments");
  }

  //
  const functionCallDataJson = JSON.parse(functionCallData);

  // parse data
  const parsedFunctionCallData =
    questionSolverResponseSchema.safeParse(functionCallDataJson);

  // if invalid data, throw error
  if (!parsedFunctionCallData.success) {
    console.error(parsedFunctionCallData.error.toString());

    throw new Error(parsedFunctionCallData.error.message);
  }

  // save question data to database
  const newlyCreatedQuestion = await prismaClient.mockQuestion.create({
    data: {
      userId: session.user.id,
      title: parsedFunctionCallData.data.title,
      concept: parsedFunctionCallData.data.concept,
      difficulty: parsedFunctionCallData.data.difficulty,
      question: parsedInputData.data.question,
      answer: parsedFunctionCallData.data.answer,
      hints: parsedFunctionCallData.data.hints,
      explanation: parsedFunctionCallData.data.explanation,
      tables: parsedFunctionCallData.data.tables,
      columns: parsedFunctionCallData.data.columns,
      isGenerated: false,
    },
  });

  revalidatePath("/");

  return {
    newQuestionId: newlyCreatedQuestion.id,
  };
}
