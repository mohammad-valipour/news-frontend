"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface NewsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function NewsPagination({
                                           currentPage,
                                           totalPages,
                                           onPageChange,
                                       }: NewsPaginationProps) {
    if (totalPages <= 1) return null;

    function handlePageChange(page: number) {
        if (page < 1 || page > totalPages) return;

        onPageChange(page);
    }

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {/* صفحه قبل */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={currentPage === 1}
                        className={
                            currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                        onClick={(event) => {
                            event.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                    />
                </PaginationItem>

                {/* شماره صفحات */}
                {Array.from(
                    {length: totalPages},
                    (_, index) => index + 1
                ).map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(event) => {
                                event.preventDefault();
                                handlePageChange(page);
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* صفحه بعد */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        aria-disabled={currentPage === totalPages}
                        className={
                            currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                        onClick={(event) => {
                            event.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
