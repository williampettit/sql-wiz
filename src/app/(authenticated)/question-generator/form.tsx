"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SQL_CONCEPTS } from "@/data/sql-concepts";
import {
  MOCK_QUESTION_DIFFICULTIES,
  type MockQuestionGeneratorFormValues,
  mockQuestionGeneratorFormSchema,
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
  initialValues: Partial<MockQuestionGeneratorFormValues>;
};

export function MockQuestionGeneratorForm(
  props: MockQuestionGeneratorFormProps,
) {
  const router = useRouter();

  const form = useForm<MockQuestionGeneratorFormValues>({
    resolver: zodResolver(mockQuestionGeneratorFormSchema),
    defaultValues: {
      concept: props.initialValues.concept ?? undefined,
      difficulty: undefined,
      customInstructions: "",
    },
  });

  async function onSubmit(values: MockQuestionGeneratorFormValues) {
    console.log(values);

    toast({
      title: `Generating ${values.difficulty} ${values.concept} question...`,
      description: "This may take a few seconds...",
    });

    const response = await generateQuestion(values);

    toast({
      title: "Generated question!",
      description: "Redirecting you to the question page...",
    });

    router.push(`/saved-questions/${response.newQuestionId}`);
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
                  {MOCK_QUESTION_DIFFICULTIES.map((difficulty) => (
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
