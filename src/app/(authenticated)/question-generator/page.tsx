import { Page } from "@/components/page";

import { MockQuestionGeneratorForm } from "./form";

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
      <MockQuestionGeneratorForm
        initialValues={{
          concept: props.searchParams.concept,
        }}
      />
    </Page>
  );
}
