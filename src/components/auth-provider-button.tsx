"use client";

import Image from "next/image";

import { type ClientSafeProvider, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

type AuthProviderButtonProps = {
  provider: ClientSafeProvider;
};

export function AuthProviderButton(props: AuthProviderButtonProps) {
  const providerImage = `https://authjs.dev/img/providers/${props.provider.id}.svg`;

  return (
    <Button
      onClick={() => signIn(props.provider.id)}
      className="flex flex-row space-x-2"
    >
      <Image
        src={providerImage}
        alt={props.provider.name}
        width={16}
        height={16}
      />

      <span>Sign in with {props.provider.name}</span>
    </Button>
  );
}
