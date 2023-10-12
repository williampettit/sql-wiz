import { z } from "zod";

import { SQL_CONCEPTS } from "@/data/sql-concepts";

export const MOCK_QUESTION_DIFFICULTIES = [
  "easy",
  "medium",
  "hard",
  "expert"
] as const;

export const mockQuestionGeneratorFormSchema = z.object({
  concept: z.enum(["__NONE__", ...SQL_CONCEPTS.map((concept) => concept.name)]),
  difficulty: z.enum(MOCK_QUESTION_DIFFICULTIES),
  customInstructions: z.string().optional(),
});

export type MockQuestionGeneratorFormValues = z.infer<
  typeof mockQuestionGeneratorFormSchema
>;

//
// (openai response schema)
//

export const mockQuestionGeneratorResponseSchema = z.object({
  title: z.string(),
  question: z.string(),
  answer: z.string(),
  hints: z.array(z.string()),
  columns: z.array(z.string()),
  tables: z.array(z.string()),
  explanation: z.string(),
});

export type MockQuestionGeneratorResponse = z.infer<
  typeof mockQuestionGeneratorResponseSchema
>;
