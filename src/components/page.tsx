import { Separator } from "@/components/ui/separator";

type PageProps = {
  title: string;
  description: string | React.ReactNode;
  children: React.ReactNode;
  buttons?: React.ReactNode;
};

export function Page(props: PageProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className="text-lg font-bold">{props.title}</h1>

          <p className="text-sm italic text-muted-foreground">
            {props.description}
          </p>
        </div>

        <div
          className="
          flex
          flex-row
          items-center
          space-x-2
        "
        >
          {props.buttons}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col space-y-4">{props.children}</div>
    </div>
  );
}
