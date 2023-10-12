import { redirect } from "next/navigation";

import { getServerSessionWrapper } from "@/server/auth";

import { SideNav } from "@/components/side-nav";

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSessionWrapper();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="flex h-screen w-screen flex-row">
      <SideNav />

      <div className="flex-1 overflow-y-auto p-8">{children}</div>
    </div>
  );
}
