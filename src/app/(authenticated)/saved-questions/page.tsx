import Link from "next/link";
import { type Metadata } from "next/types";

import { getClassesForDifficulty } from "@/lib/utils";

import { getAllQuestionData } from "@/server/actions/get-question-data";

import { Page } from "@/components/page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Saved Questions",
};

export default async function SavedQuestionsPage() {
  const questions = await getAllQuestionData();

  return (
    <Page
      title="Your Saved Questions"
      description="View all of your saved questions here."
    >
      <div className="flex flex-col space-y-4">
        {questions.map((question) => (
          <Link key={question.id} href={`/saved-questions/${question.id}`}>
            <Card>
              <CardHeader>
                <CardTitle className="line-clamp-1">
                  Question: {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row space-x-2">
                  <Badge
                    className={getClassesForDifficulty(question.difficulty)}
                  >
                    {question.difficulty}
                  </Badge>
                  <Badge>{question.concept}</Badge>
                  <Badge>{question.title}</Badge>
                  {question.isFavorite && (
                    <Badge className="bg-yellow-500">Favorited</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Page>
  );
}
