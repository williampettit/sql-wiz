"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type RevealableProps = {
  children: React.ReactNode;
};

export function Revealable(props: RevealableProps) {
  const [revealed, setRevealed] = useState<boolean>(false);

  return (
    <div
      className={cn({
        "blur-sm": !revealed,
      })}
      onClick={() => setRevealed((prev) => !prev)}
    >
      {props.children}
    </div>
  );
}
