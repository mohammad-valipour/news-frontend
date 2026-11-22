import "../globals.css";
import type {Metadata} from "next";
import {Vazirmatn} from "next/font/google";
import Providers from "@/providers/providers";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazir",
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "نیوز",
    description: "سایت خبری نیوز",
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html lang="fa" dir="rtl" className={`container  mx-auto ${vazirmatn.variable}`}>
        <body className="antialiased">
        <Header isAuthenticated={false}/>

        <main className="px-2 lg:px-0">
            <Providers>
                {children}
            </Providers>
        </main>

        <Footer />
        </body>
        </html>
    );
}
