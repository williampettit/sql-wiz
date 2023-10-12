"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

export async function deleteQuestion(questionId: string) {
  const session = await requireSession();

  await prismaClient.mockQuestion.delete({
    where: {
      id: questionId,
      user: {
        id: session.user.id,
      },
    },
  });

  revalidatePath("/");
}
