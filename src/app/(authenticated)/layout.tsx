import { redirect } from "next/navigation";

import { getServerSessionWrapper } from "@/server/auth";

import { SideNav } from "@/components/side-nav";

export default async function Layout(props: LayoutProps) {
  const session = await getServerSessionWrapper();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex h-screen w-screen flex-row">
      <SideNav name={session.user.name} image={session.user.image} />

      <div className="flex-1 overflow-y-auto p-10">{props.children}</div>
    </div>
  );
}
