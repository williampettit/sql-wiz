"use client";

import { splitSentences } from "@/lib/utils";

import { Revealable } from "@/components/revealable";

type HiddenExplanationProps = {
  explanation: string;
};

export function HiddenExplanation({ explanation }: HiddenExplanationProps) {
  return (
    <Revealable>
      <p className="whitespace-pre-line">{splitSentences(explanation)}</p>
    </Revealable>
  );
}
