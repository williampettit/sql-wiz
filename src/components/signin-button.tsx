"use client";

import { signIn } from "next-auth/react";

import { Button } from "./ui/button";

type SignInButtonProps = {
  callbackUrl?: string;
  children: React.ReactNode;
};

export function SignInButton(props: SignInButtonProps) {
  return (
    <Button
      onClick={() =>
        signIn(undefined, {
          callbackUrl: props.callbackUrl,
        })
      }
    >
      {props.children}
    </Button>
  );
}
