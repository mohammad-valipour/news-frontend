import {HEADER} from "@/constants/header.constants";
import Logo from "@/components/layout/header/logo";
import Navbar from "@/components/layout/header/navbar";
import HeaderActions from "@/components/layout/header/header_actions";
import MobileNavbar from "@/components/layout/header/mobile_navbar";

interface HeaderClientProps {
    isAuthenticated: boolean;
}

export default function HeaderClient({isAuthenticated}: HeaderClientProps) {
    return (
        <>
            <header
                className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-xl">
                <div
                    className="container-page flex h-16 md:h-20 items-center justify-between gap-4">
                    {/* Logo */}
                    <Logo imageURL={HEADER.logo}/>

                    {/* Desktop Navbar */}
                    <Navbar/>

                    {/* Actions */}
                    <HeaderActions isAuthenticated={isAuthenticated}/>
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <MobileNavbar/>
        </>
    );
}