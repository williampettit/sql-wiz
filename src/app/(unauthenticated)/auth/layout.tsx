import { redirect } from "next/navigation";

import { getServerSessionWrapper } from "@/server/auth";

import { LogoText } from "@/components/logo-text";
import { Separator } from "@/components/ui/separator";

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSessionWrapper();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center space-y-8 bg-accent p-8">
      <LogoText className="text-6xl" />

      <Separator />

      {children}
    </div>
  );
}
