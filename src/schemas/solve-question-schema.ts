import { z } from "zod";

export const questionSolverFormSchema = z.object({
  question: z.string(),
});

export type QuestionSolverFormValues = z.infer<
  typeof questionSolverFormSchema
>;

//
// (openai response schema)
//

export const questionSolverResponseSchema = z.object({
  title: z.string(),
  answer: z.string(),
  hints: z.array(z.string()),
  columns: z.array(z.string()),
  tables: z.array(z.string()),
  explanation: z.string(),
  concept: z.string(),
  difficulty: z.string(),
});

export type QuestionSolverResponse = z.infer<
  typeof questionSolverResponseSchema
>;
