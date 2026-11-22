
import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";

function Pagination({
                        className,
                        dir = "rtl",
                        ...props
                    }: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="صفحه‌بندی"
            data-slot="pagination"
            dir={dir}
            className={cn(
                "mx-auto flex w-full items-center justify-center",
                className
            )}
            {...props}
        />
    );
}

function PaginationContent({
                               className,
                               ...props
                           }: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn(
                "flex items-center justify-center gap-2",
                className
            )}
            {...props}
        />
    );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
    return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">;

function PaginationLink({
                            className,
                            isActive = false,
                            size = "icon",
                            ...props
                        }: PaginationLinkProps) {
    return (
        <Button
            variant="ghost"
            size={size}
            nativeButton={false}
            className={cn(
                "size-10 rounded-lg border text-sm font-medium transition-all duration-200",
                "border-border bg-surface text-foreground",
                "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
                "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
                "active:scale-95",
                isActive &&
                "border-primary bg-primary text-primary-foreground shadow-sm hover:border-primary hover:bg-primary hover:text-primary-foreground",
                className
            )}
            render={
                <a
                    aria-current={isActive ? "page" : undefined}
                    data-slot="pagination-link"
                    data-active={isActive}
                    {...props}
                />
            }
        />
    );
}

function PaginationPrevious({
                                className,
                                ...props
                            }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="رفتن به صفحه قبلی"
            title="صفحه قبلی"
            className={cn(
                "size-10 rounded-lg",
                className
            )}
            {...props}
        >
            <ChevronRightIcon className="size-4" />
        </PaginationLink>
    );
}

function PaginationNext({
                            className,
                            ...props
                        }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="رفتن به صفحه بعدی"
            title="صفحه بعدی"
            className={cn(
                "size-10 rounded-lg",
                className
            )}
            {...props}
        >
            <ChevronLeftIcon className="size-4" />
        </PaginationLink>
    );
}

function PaginationEllipsis({
                                className,
                                ...props
                            }: React.ComponentProps<"span">) {
    return (
        <span
            aria-label="صفحات بیشتر"
            data-slot="pagination-ellipsis"
            className={cn(
                "flex size-10 items-center justify-center text-muted-foreground",
                className
            )}
            {...props}
        >
            <MoreHorizontalIcon className="size-5" />
            <span className="sr-only">صفحات بیشتر</span>
        </span>
    );
}

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
