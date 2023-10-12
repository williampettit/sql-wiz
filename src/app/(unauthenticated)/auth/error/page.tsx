import { type Metadata } from "next/types";

import { SignInButton } from "@/components/signin-button";

export const metadata: Metadata = {
  title: "Error",
};

type ErrorPageProps = {
  searchParams: {
    error?: string;
  };
};

export default function ErrorPage(props: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="font-bold">An error occurred while signing in.</h1>

      <p className="text-muted-foreground">
        Details: {JSON.stringify(props.searchParams.error ?? null)}
      </p>

      <SignInButton callbackUrl="">Sign in again</SignInButton>
    </div>
  );
}
