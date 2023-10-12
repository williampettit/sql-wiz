import { splitSentences } from "@/lib/utils";

import { getQuestionData } from "@/server/actions/get-question-data";

import { DeleteQuestionDialog } from "@/components/delete-question-dialog";
import { FavoriteQuestionDialog } from "@/components/favorite-question-dialog";
import { HiddenAnswer } from "@/components/hidden-answer";
import { HiddenExplanation } from "@/components/hidden-explanation";
import { Page } from "@/components/page";
import { QuestionHint } from "@/components/question-hint";
import { Badge } from "@/components/ui/badge";

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
          <HiddenExplanation explanation={explanation} />
        </div>

        <div className="col-span-6">
          <h2 className="font-bold">Answer</h2>
          <HiddenAnswer answer={answer} />
        </div>
      </div>

      {/* <div className="flex flex-col space-y-8">
        <Separator />

        <div className="flex flex-col space-y-2">
          {hints.length > 0 ? (
            hints.map((hint, idx) => (
              <QuestionHint key={hint} idx={idx} hint={hint} />
            ))
          ) : (
            <p className="text-sm italic text-muted-foreground">
              No hints were automatically generated for this question, most
              likely because the AI deemed it too simple.
            </p>
          )}
        </div>

        <Separator />

        <HiddenExplanation explanation={explanation} />

        <HiddenAnswer answer={answer} />
      </div> */}
    </Page>
  );
}
