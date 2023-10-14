import { type Metadata } from "next";

import { Page } from "@/components/page";

import { QuestionGeneratorForm } from "./form";

export const metadata: Metadata = {
  title: "Question Generator",
};

type QuestionGeneratorPageProps = {
  searchParams: {
    concept?: string;
  };
};

export default function QuestionGeneratorPage(
  props: QuestionGeneratorPageProps,
) {
  return (
    <Page title="Question Generator" description="Generate a mock question.">
      <QuestionGeneratorForm
        defaultValues={{
          concept: props.searchParams.concept,
        }}
      />
    </Page>
  );
}
