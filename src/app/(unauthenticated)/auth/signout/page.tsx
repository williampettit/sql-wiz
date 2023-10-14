import { type Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign Out",
};

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="font-bold">Goodbye! You have been signed out.</h1>

      <Link href="/auth/signin">
        <Button>Sign in again</Button>
      </Link>
    </div>
  );
}
