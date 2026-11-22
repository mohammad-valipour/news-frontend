
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AboutCTAProps {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
}

export default function AboutCTA({title, description, buttonText, buttonUrl}: AboutCTAProps) {
    return (
        <section className="my-12 rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-12">

            <h2 className="text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                {title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-300">
                {description}
            </p>

            <Link
                href={buttonUrl}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
                {buttonText}
                <ArrowLeft size={18} />
            </Link>

        </section>
    );
}
