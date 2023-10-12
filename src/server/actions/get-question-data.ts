"use server";

import { notFound } from "next/navigation";

import { requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

export async function getQuestionData(questionId: string) {
  const session = await requireSession();

  const questionData = await prismaClient.mockQuestion.findUnique({
    where: {
      id: questionId,
      user: {
        id: session.user.id,
      },
    },
    select: {
      concept: true,
      title: true,
      question: true,
      answer: true,
      hints: true,
      isFavorite: true,
      explanation: true,
      tables: true,
      columns: true,
    },
  });

  if (!questionData) {
    notFound();
  }

  return questionData;
}

export async function getAllQuestionData() {
  const session = await requireSession();

  const allQuestionData = await prismaClient.mockQuestion.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      difficulty: true,
      concept: true,
      question: true,
      isFavorite: true,
    },
  });

  return allQuestionData;
}
