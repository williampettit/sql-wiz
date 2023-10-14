"use server";

import { revalidatePath } from "next/cache";

import OpenAI from "openai";

import {
  QUESTION_DIFFICULTIES,
  type QuestionGeneratorFormValues,
  questionGeneratorFormSchema,
  questionGeneratorResponseSchema,
} from "@/schemas/generate-question-schema";

import { requireOpenAiApiKey, requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

export async function generateQuestion(inputData: QuestionGeneratorFormValues) {
  //
  const session = await requireSession();
  const userOpenAiApiKey = await requireOpenAiApiKey();

  const parsedInputData = questionGeneratorFormSchema.safeParse(inputData);

  if (!parsedInputData.success) {
    throw new Error(parsedInputData.error.message);
  }

  // create openai client with user's api key
  const openaiClient = new OpenAI({ apiKey: userOpenAiApiKey });

  // format prompt
  const systemPrompt = [
    "You are an AI assistant that helps people learn SQL for their upcoming SQL exam.",
    `You are given a SQL concept and a difficulty level, the possible levels are: ${QUESTION_DIFFICULTIES.map(
      (diff) => `"${diff}"`,
    ).join(", ")}.`,
    "Generate a real world business question for the user to solve using the Northwinds Database.",
    "Provide the correct SQL query solution to the problem.",
    "Put each clause on a new line.",
    "In the question itself, you must provide the exact table and column names in PascalCase that the user will need to use (e.g. Select the most profitable ProductIDs from the Orders table).",
    "---",
    "You must incorporate the given concept and difficulty level:",
    `Concept: "${parsedInputData.data.concept}"`,
    `Difficulty: "${parsedInputData.data.difficulty}`,
    parsedInputData.data.customInstructions
      ? `Custom Instructions: "${parsedInputData.data.customInstructions}"`
      : "",
  ].join("\n");

  // generate question with openai
  const openaiResponse = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    function_call: {
      name: "submit_question_to_user",
    },
    functions: [
      {
        name: "submit_question_to_user",
        description: "Submit a question to the user.",
        parameters: {
          type: "object",
          required: [
            "title",
            "question",
            "answer",
            "hints",
            "explanation",
            "tables",
            "columns",
          ],
          properties: {
            title: {
              type: "string",
              description:
                "The summary of the question. (e.g. 'Using GROUP BY with COUNT to count the number of customers in each country.')",
            },
            question: {
              type: "string",
              description: "The question to submit to the user.",
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
    questionGeneratorResponseSchema.safeParse(functionCallDataJson);

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
      concept: parsedInputData.data.concept,
      difficulty: parsedInputData.data.difficulty,
      question: parsedFunctionCallData.data.question,
      answer: parsedFunctionCallData.data.answer,
      hints: parsedFunctionCallData.data.hints,
      explanation: parsedFunctionCallData.data.explanation,
      tables: parsedFunctionCallData.data.tables,
      columns: parsedFunctionCallData.data.columns,
      isGenerated: true,
    },
  });

  revalidatePath("/");

  return {
    newQuestionId: newlyCreatedQuestion.id,
  };
}
