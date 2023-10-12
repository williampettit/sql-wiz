"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

export async function favoriteQuestion(questionId: string, favorited: boolean) {
  const session = await requireSession();

  await prismaClient.mockQuestion.update({
    where: {
      id: questionId,
      user: {
        id: session.user.id,
      },
    },
    data: {
      isFavorite: favorited,
    },
  });

  revalidatePath("/");
}
