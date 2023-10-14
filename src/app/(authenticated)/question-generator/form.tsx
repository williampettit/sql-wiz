"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SQL_CONCEPTS } from "@/data/sql-concepts";
import {
  QUESTION_DIFFICULTIES,
  type QuestionGeneratorFormValues,
  questionGeneratorFormSchema,
} from "@/schemas/generate-question-schema";

import { generateQuestion } from "@/server/actions/generate-question";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

type MockQuestionGeneratorFormProps = {
  defaultValues: Partial<QuestionGeneratorFormValues>;
};

export function QuestionGeneratorForm({
  defaultValues,
}: MockQuestionGeneratorFormProps) {
  const router = useRouter();

  const form = useForm<QuestionGeneratorFormValues>({
    resolver: zodResolver(questionGeneratorFormSchema),
    defaultValues: {
      ...defaultValues,
      concept: defaultValues.concept ?? undefined,
      difficulty: undefined,
      customInstructions: "",
    },
  });

  async function onSubmit(values: QuestionGeneratorFormValues) {
    toast({
      title: `Generating ${values.difficulty} ${values.concept} question...`,
      description: "This may take a few seconds...",
    });

    generateQuestion(values)
      .then((response) => {
        toast({
          title: "Generated question!",
          description: "Redirecting you to the question page...",
        });

        router.push(`/saved-questions/${response.newQuestionId}`);
      })
      .catch((error) =>
        toast({
          variant: "destructive",
          title: "Failed to generate question",
          description: error.message,
        }),
      );
  }

  const disabled = form.formState.isSubmitting || !form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="concept"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Concept</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select concept" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SQL_CONCEPTS.map((concept) => (
                    <SelectItem key={concept.name} value={concept.name}>
                      {concept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {QUESTION_DIFFICULTIES.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Make the mock question more specific by adding custom instructions."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disabled}>
          Generate
        </Button>
      </form>
    </Form>
  );
}
