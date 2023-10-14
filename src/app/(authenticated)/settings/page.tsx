import { type Metadata } from "next";

import { requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

import { Page } from "@/components/page";

import { SettingsForm } from "./form";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const session = await requireSession();

  const initialValues = await prismaClient.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: {
      openAiApiKey: true,
    },
  });

  return (
    <Page title="Settings" description="Update your settings.">
      <SettingsForm
        defaultValues={{
          openAiApiKey: initialValues.openAiApiKey,
        }}
      />
    </Page>
  );
}
