"use client";

import {ReactNode, Suspense, useState} from "react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({children}: ProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={null}>
                {children}
            </Suspense>
        </QueryClientProvider>
    );
}
