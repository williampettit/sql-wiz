import { type Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Concepts",
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
