import { type Metadata } from "next/types";

import { Page } from "@/components/page";

export const metadata: Metadata = {
  title: "Home",
};

export default function AuthenticatedPage() {
  return (
    <Page
      title="Authenticated"
      description="This page is only accessible to authenticated users."
    >
      Hello!
    </Page>
  );
}
