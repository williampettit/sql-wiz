import { z } from "zod";

export const userSettingsFormSchema = z.object({
  openAiApiKey: z.string().nullable().optional(),
});

export type UserSettingsFormValues = z.infer<typeof userSettingsFormSchema>;
