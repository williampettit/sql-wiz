"use client";

import { useState } from "react";

import { Highlight, themes } from "prism-react-renderer";
import { format as formatSql } from "sql-formatter";

import { cn } from "@/lib/utils";

type HiddenAnswerProps = {
  answer: string;
};

export function HiddenAnswer(props: HiddenAnswerProps) {
  const formattedAnswer = formatSql(props.answer, {
    tabWidth: 4,
    useTabs: false,
    keywordCase: "upper",
    indentStyle: "standard",
  });

  // state to store which line numbers have been revealed
  const [revealedLineNumbers, setRevealedLineNumbers] = useState<number[]>([]);

  return (
    <Highlight theme={themes.vsDark} code={formattedAnswer} language="sql">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={cn(className, "rounded-md border p-4 shadow-sm")}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line })}
              className="flex flex-row space-x-4"
            >
              <span className={cn("w-4 text-right")}>{i + 1}</span>

              <div
                className={cn(
                  "flex-grow",
                  !revealedLineNumbers.includes(i) && "blur-sm",
                )}
                onClick={
                  revealedLineNumbers.includes(i)
                    ? () =>
                        setRevealedLineNumbers((prev) =>
                          prev.filter((n) => n !== i),
                        )
                    : () => setRevealedLineNumbers((prev) => [...prev, i])
                }
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
