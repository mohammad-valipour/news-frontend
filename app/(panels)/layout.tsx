import "../globals.css";
import {Vazirmatn} from "next/font/google";
import {Metadata} from "next";
import AdminShell from "@/features/panels/admin/components/admin-shell";
import Providers from "@/providers/providers";
import {ReactNode} from "react";
import AuthorShell from "@/features/panels/author/components/author-shell";

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazir",
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "پنل مدیریت | نیوز",
    description: "مدیریت اخبار، دسته‌بندی‌ها و نویسندگان سایت نیوز",
};

export default function AdminRootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="fa" dir="rtl" className={vazirmatn.variable}>
        <body className="antialiased">
        <Providers>
            {/*<AdminShell>{children}</AdminShell>*/}
            <AuthorShell>{children}</AuthorShell>
        </Providers>
        </body>
        </html>
    );
}
