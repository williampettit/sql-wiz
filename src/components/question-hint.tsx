"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";

type QuestionHintProps = {
  hint: string;
  idx: number;
};

export function QuestionHint(props: QuestionHintProps) {
  const [revealed, setRevealed] = useState<boolean>(false);

  return (
    <Badge
      onClick={() => setRevealed((prevRevealed) => !prevRevealed)}
      className="w-max"
    >
      {revealed
        ? `Hint #${props.idx + 1}: ${props.hint}`
        : `Reveal Hint #${props.idx + 1}`}
    </Badge>
  );
}
