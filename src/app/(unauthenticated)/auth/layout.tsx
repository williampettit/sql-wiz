import { redirect } from "next/navigation";

import { getServerSessionWrapper } from "@/server/auth";

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSessionWrapper();

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}
