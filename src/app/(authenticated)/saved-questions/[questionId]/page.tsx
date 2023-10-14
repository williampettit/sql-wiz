import { type Metadata } from "next";

import { splitSentences } from "@/lib/utils";

import { getQuestionData } from "@/server/actions/get-question-data";

import { DeleteQuestionDialog } from "@/components/delete-question-dialog";
import { FavoriteQuestionDialog } from "@/components/favorite-question-dialog";
import { HiddenAnswer } from "@/components/hidden-answer";
import { Page } from "@/components/page";
import { QuestionHint } from "@/components/question-hint";
import { Revealable } from "@/components/revealable";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Question",
};

type QuestionPageProps = {
  params: {
    questionId: string;
  };
};

export default async function QuestionPage(props: QuestionPageProps) {
  const {
    concept,
    title,
    question,
    answer,
    hints,
    isFavorite,
    explanation,
    tables,
    columns,
  } = await getQuestionData(props.params.questionId);

  return (
    <Page
      title="Question"
      description="View a question and its hints here."
      buttons={
        <>
          <FavoriteQuestionDialog
            questionId={props.params.questionId}
            isFavorite={isFavorite}
          />

          <DeleteQuestionDialog questionId={props.params.questionId} />
        </>
      }
    >
      <div className="flex flex-row space-x-2">
        <Badge variant="secondary">Concept: {concept}</Badge>
        <Badge variant="secondary">Summary: {title}</Badge>
      </div>

      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <h2 className="font-bold">Question</h2>
          <p className="whitespace-pre-line">{splitSentences(question)}</p>
        </div>

        <div>
          <h2 className="font-bold">Table Names</h2>
          <ol>
            {tables.map((table) => (
              <li key={table}>{table}</li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-bold">Column Names</h2>
          <ol>
            {columns.map((column) => (
              <li key={column}>{column}</li>
            ))}
          </ol>
        </div>

        <div className="col-span-6">
          <h2 className="font-bold">Hints</h2>
          <div className="flex flex-col space-y-1">
            {hints.map((hint, idx) => (
              <QuestionHint key={hint} hint={hint} idx={idx} />
            ))}
          </div>
        </div>

        <div className="col-span-6">
          <h2 className="font-bold">Explanation</h2>
          <Revealable>
            <p className="whitespace-pre-line">{splitSentences(explanation)}</p>
          </Revealable>
        </div>

        <div className="col-span-6">
          <h2 className="font-bold">Answer</h2>
          <HiddenAnswer answer={answer} />
        </div>
      </div>
    </Page>
  );
}
