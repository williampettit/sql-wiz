import { z } from "zod";

import { SQL_CONCEPTS } from "@/data/sql-concepts";

export const QUESTION_DIFFICULTIES = [
  "easy",
  "medium",
  "hard",
  "expert",
] as const;

export const questionGeneratorFormSchema = z.object({
  concept: z.enum(["__NONE__", ...SQL_CONCEPTS.map((concept) => concept.name)]),
  difficulty: z.enum(QUESTION_DIFFICULTIES),
  customInstructions: z.string().optional(),
});

export type QuestionGeneratorFormValues = z.infer<
  typeof questionGeneratorFormSchema
>;

//
// (openai response schema)
//

export const questionGeneratorResponseSchema = z.object({
  title: z.string(),
  question: z.string(),
  answer: z.string(),
  hints: z.array(z.string()),
  columns: z.array(z.string()),
  tables: z.array(z.string()),
  explanation: z.string(),
});

export type QuestionGeneratorResponse = z.infer<
  typeof questionGeneratorResponseSchema
>;
