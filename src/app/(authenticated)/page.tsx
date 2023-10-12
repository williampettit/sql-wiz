import { Page } from "@/components/page";

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
