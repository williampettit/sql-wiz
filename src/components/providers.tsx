"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/toaster";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  return (
    <>
      <SessionProvider>
        {props.children}

        <Toaster />
      </SessionProvider>
    </>
  );
}
