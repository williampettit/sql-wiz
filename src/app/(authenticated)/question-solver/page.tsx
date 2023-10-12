import { Page } from "@/components/page";

import { QuestionSolverForm } from "./form";

export default function QuestionSolverPage() {
  return (
    <Page title="Question Solver" description="Solve a SQL question.">
      <QuestionSolverForm />
    </Page>
  );
}
