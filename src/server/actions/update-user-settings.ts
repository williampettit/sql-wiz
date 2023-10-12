"use server";

import { revalidatePath } from "next/cache";

import {
  type UserSettingsFormValues,
  userSettingsFormSchema,
} from "@/schemas/user-settings-form-schema";

import { requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

export async function updateUserSettings(inputData: UserSettingsFormValues) {
  const session = await requireSession();

  const parsedInputData = userSettingsFormSchema.safeParse(inputData);

  if (!parsedInputData.success) {
    throw new Error(parsedInputData.error.message);
  }

  await prismaClient.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      openAiApiKey: parsedInputData.data.openAiApiKey,
    },
  });

  revalidatePath("/");
}
