"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type UserSettingsFormValues,
  userSettingsFormSchema,
} from "@/schemas/user-settings-form-schema";

import { updateUserSettings } from "@/server/actions/update-user-settings";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

type SettingsFormProps = {
  defaultValues: Partial<UserSettingsFormValues>;
};

export function SettingsForm(props: SettingsFormProps) {
  const form = useForm<UserSettingsFormValues>({
    resolver: zodResolver(userSettingsFormSchema),
    defaultValues: {
      ...props.defaultValues,
    },
  });

  async function onSubmit(values: UserSettingsFormValues) {
    toast({ title: "Updating settings..." });

    updateUserSettings(values)
      .then(() =>
        toast({
          title: "Updated settings!",
        }),
      )
      .catch((error) =>
        toast({
          variant: "destructive",
          title: "Failed to update settings",
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
          name="openAiApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OpenAI API Key</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your OpenAI API key here"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disabled}>
          Save
        </Button>
      </form>
    </Form>
  );
}
