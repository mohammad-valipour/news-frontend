import {Inbox} from "lucide-react";

export default function Empty_state({
                                       title,
                                       description,
                                   }: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
      <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Inbox className="size-6"/>
      </span>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
    );
}
