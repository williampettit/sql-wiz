"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type QuestionSolverFormValues,
  questionSolverFormSchema,
} from "@/schemas/solve-question-schema";

import { solveQuestion } from "@/server/actions/solve-question";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export function QuestionSolverForm() {
  const router = useRouter();

  const form = useForm<QuestionSolverFormValues>({
    resolver: zodResolver(questionSolverFormSchema),
    defaultValues: {
      question: "",
    },
  });

  async function onSubmit(values: QuestionSolverFormValues) {
    console.log(values);

    toast({
      title: `Solving question...`,
      description: "This may take a few seconds...",
    });

    const response = await solveQuestion(values);

    toast({
      title: "Solved question!",
      description: "Redirecting you to the answer page...",
    });

    router.push(`/saved-questions/${response.newQuestionId}`);
  }

  const disabled = form.formState.isSubmitting || !form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="The question to generate a solution for."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disabled}>
          Solve
        </Button>
      </form>
    </Form>
  );
}
