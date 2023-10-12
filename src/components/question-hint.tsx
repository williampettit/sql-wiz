"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";

type QuestionHintProps = {
  hint: string;
  idx: number;
};

export function QuestionHint({ hint, idx }: QuestionHintProps) {
  const [revealed, setRevealed] = useState<boolean>(false);

  return (
    <Badge
      onClick={() => setRevealed((prevRevealed) => !prevRevealed)}
      className="w-max"
    >
      {revealed ? `Hint #${idx + 1}: ${hint}` : `Reveal Hint #${idx + 1}`}
    </Badge>
  );
}
