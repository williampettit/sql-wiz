import { type Metadata } from "next";

import { getProviders } from "next-auth/react";

import { AuthProviderButton } from "@/components/auth-provider-button";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="font-bold">Welcome! Please sign in to continue.</h1>

      <div className="flex flex-col space-y-2">
        {providers &&
          Object.entries(providers).map(([key, provider]) => (
            <AuthProviderButton key={key} provider={provider} />
          ))}
      </div>
    </div>
  );
}
