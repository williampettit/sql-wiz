import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoTextProps = React.HTMLAttributes<HTMLHeadingElement>;

export function LogoText(props: LogoTextProps) {
  const { className, ...otherProps } = props;

  return (
    <Link href="/">
      <h1
        className={cn(
          "animated-logo-text  select-none text-center text-4xl font-black italic",
          className,
        )}
        {...otherProps}
      >
        sql-wiz
      </h1>
    </Link>
  );
}
