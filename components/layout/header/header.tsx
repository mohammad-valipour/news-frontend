
import { Suspense } from "react";

import Logo from "@/components/layout/header/logo";
import Navbar from "@/components/layout/header/navbar";
import HeaderActions from "@/components/layout/header/header_actions";
import MobileNavbar from "@/components/layout/header/mobile_navbar";
import { HEADER } from "@/constants/header.constants";

interface HeaderClientProps {
    isAuthenticated: boolean;
}

export default function Header({isAuthenticated}: HeaderClientProps) {
    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-xl">
                <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">

                    <Logo imageURL={HEADER.logo} />

                    <Suspense fallback={null}>
                        <Navbar />
                    </Suspense>

                    <HeaderActions
                        isAuthenticated={isAuthenticated}
                    />
                </div>
            </header>

            <Suspense fallback={null}>
                <MobileNavbar />
            </Suspense>
        </>
    );
}
