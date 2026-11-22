import Link from "next/link";
import {Newspaper, ArrowUpLeft} from "lucide-react";

const footerLinks = [
    {
        title: "دسترسی سریع",
        links: [
            {title: "صفحه اصلی", href: "/"},
            {title: "دسته‌بندی اخبار", href: "/categories"},
            {title: "درباره ما", href: "/about"},
            {title: "تماس با ما", href: "/contact"},
        ],
    },
];

export default function Footer() {
    return (
        <footer className="mt-20 bg-slate-950 text-slate-300">

            {/* بخش اصلی فوتر */}
            <div className="container-page px-4 py-12 md:py-16">

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">

                    {/* معرفی سایت */}
                    <div className="space-y-5">

                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-white"
                        >
                            <span
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                                <Newspaper size={24}/>
                            </span>

                            <span className="text-2xl font-black">
                                نیوز
                            </span>
                        </Link>

                        <p className="max-w-sm text-sm leading-8 text-slate-400">
                            نیوز، همراه شما برای دسترسی به تازه‌ترین اخبار،
                            رویدادها و اتفاقات روز. تلاش می‌کنیم اطلاعات
                            را سریع، دقیق و ساده در اختیار شما قرار دهیم.
                        </p>

                    </div>

                    {/* لینک‌های سایت */}
                    {footerLinks.map((group) => (
                        <div key={group.title} className="space-y-5">

                            <h3 className="font-bold text-white">
                                {group.title}
                            </h3>

                            <ul className="space-y-4">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
                                        >
                                            <ArrowUpLeft size={14}/>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}

                    {/* راه ارتباطی */}
                    <div className="space-y-5">

                        <h3 className="font-bold text-white">
                            همراه نیوز باشید
                        </h3>

                        <p className="text-sm leading-8 text-slate-400">
                            برای اطلاع از تازه‌ترین اخبار، به صفحه
                            دسته‌بندی‌ها سر بزنید و اخبار موردعلاقه خود
                            را دنبال کنید.
                        </p>

                        <Link
                            href="/categories"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                        >
                            مشاهده اخبار
                            <ArrowUpLeft size={17}/>
                        </Link>

                    </div>

                </div>

            </div>

            {/* نوار پایانی */}
            <div className="border-t border-white/10 pb-24 md:pb-0">

                <div
                    className="container-page flex flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-slate-500 sm:flex-row">

                    <p>
                        © {new Date().getFullYear()} تمامی حقوق برای نیوز محفوظ است.
                    </p>

                    <p>
                        ساخته شده با ❤️ برای آگاهی بیشتر
                    </p>

                </div>

            </div>

        </footer>
    );
}
