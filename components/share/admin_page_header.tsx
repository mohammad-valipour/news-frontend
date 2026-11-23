import type {ReactNode} from "react";

interface AdminPageHeaderProps {
    title: string;
    description: string;
    action?: ReactNode;
}

export default function Admin_page_header({title, description, action}: AdminPageHeaderProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
                <h1 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h1>
                <p className="text-sm leading-7 text-muted-foreground">{description}</p>
            </div>
            {action}
        </div>
    );
}
