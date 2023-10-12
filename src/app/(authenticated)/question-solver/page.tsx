import { type Metadata } from "next/types";

import { Page } from "@/components/page";

import { QuestionSolverForm } from "./form";

export const metadata: Metadata = {
  title: "Question Solver",
};

export default function QuestionSolverPage() {
  return (
    <Page title="Question Solver" description="Solve a SQL question.">
      <QuestionSolverForm />
    </Page>
  );
}
