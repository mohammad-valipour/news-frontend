"use client";

import {LogIn, UserRound} from "lucide-react";
import Link from "next/link";

interface HeaderActionsProps {
    isAuthenticated: boolean;
}

export default function HeaderActions({isAuthenticated}: HeaderActionsProps) {

    return (
        <div className="flex shrink-0 items-center gap-4">
            {/* Authentication */}
            {
                isAuthenticated ?
                    <Link
                        href="/profile"
                        aria-label="حساب کاربری"
                        className="w-10 h-10 flex justify-center items-center border border-primary-foreground rounded-full text-muted-foreground transition-colors hover:text-primary"
                    >
                        <UserRound size={21}/>
                    </Link>
                    :
                    <div className="flex items-center gap-2">

                        <Link
                            href="/login"
                            aria-label="ورود"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            <LogIn size={20}/>
                        </Link>

                    </div>
            }
        </div>
    );
}