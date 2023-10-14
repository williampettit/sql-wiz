import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Concepts",
};

export default function Layout(props: LayoutProps) {
  return <>{props.children}</>;
}
