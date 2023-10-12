"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { LogoText } from "@/components/logo-text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SideNavUserMenu } from "./side-nav-user-menu";

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

type SideNavProps = {
  name: string;
  image: string;
};

export function SideNav(props: SideNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex w-64 min-w-[260px] flex-col justify-between border-r bg-accent p-4">
      <div className="flex flex-col space-y-4">
        <LogoText className="p-2" />

        <Separator />

        <div className="flex flex-col space-y-2">
          {SIDE_NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="link"
                className={cn(
                  "text-md flex h-12 cursor-pointer flex-row items-center justify-center text-center text-accent-foreground",
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

      <SideNavUserMenu name={props.name} image={props.image} />
    </div>
  );
}
