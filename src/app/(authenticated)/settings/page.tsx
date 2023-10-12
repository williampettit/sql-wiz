import { requireSession } from "@/server/auth";
import { prismaClient } from "@/server/prisma";

import { Page } from "@/components/page";

import { SettingsForm } from "./form";

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
        initialValues={{
          openAiApiKey: initialValues.openAiApiKey,
        }}
      />
    </Page>
  );
}
