import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupBy<T, K extends string | number>(
  array: T[],
  func: (item: T) => K,
) {
  return array.reduce(
    (previous, current) => {
      const groupKey = func(current);
      const group = previous[groupKey] || [];
      group.push(current);
      return { ...previous, [groupKey]: group };
    },
    {} as Record<K, T[]>,
  );
}

export function splitSentences(question: string): string {
  return question.replaceAll("\n", " ").split(".").join(".\n");
}

export function getClassesForDifficulty(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-500";
    case "hard":
      return "bg-red-500";
    case "expert":
      return "bg-pink-500";
    default:
      return "";
  }
}
