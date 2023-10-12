"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function UnauthenticatedPage() {
  return (
    <div>
      <h1>
        You are not authenticated.
      </h1>

      <Button onClick={() => signIn()}>
        Sign In
      </Button>
    </div>
  );
}
