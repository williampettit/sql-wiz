"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SIDE_NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    exact: true,
  },
  {
    label: "Concepts",
    href: "/concepts",
  },
  {
    label: "Question Generator",
    href: "/question-generator",
  },
  {
    label: "Question Solver",
    href: "/question-solver",
  },
  {
    label: "Saved Questions",
    href: "/saved-questions",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export function SideNav() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <div
      className="
        flex
        w-64
        min-w-[260px]
        flex-col
        justify-between
        border-r
        bg-accent
        p-4
      "
    >
      <div className="flex flex-col space-y-4">
        <Link
          href="/"
          className="
            p-2
            text-center
            text-4xl
            font-black
            italic
            text-sky-500
            transition
            hover:text-sky-400
          "
        >
          sql-wiz
        </Link>

        <Separator />

        <div className="flex flex-col space-y-2">
          {SIDE_NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="link"
                className={cn(
                  `
                    text-md
                    flex
                    h-12
                    cursor-pointer
                    flex-row
                    items-center
                    justify-center
                    text-center
                    text-accent-foreground
                  `,
                  {
                    "font-bold italic text-black": item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href),
                  },
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center space-x-2">
        <Avatar>
          <AvatarImage src={session.data?.user?.image ?? undefined} />
          <AvatarFallback />
        </Avatar>

        <span className="font-medium">
          {session.data?.user?.name ?? session.data?.user?.email ?? "Unknown"}
        </span>
      </div>
    </div>
  );
}
