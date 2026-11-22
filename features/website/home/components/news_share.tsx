"use client";

import {useState} from "react";
import {Copy, Share2, Check} from "lucide-react";

interface NewsShareProps {
    title: string;
}

export default function NewsShare({title}: NewsShareProps) {
    const [copied, setCopied] = useState(false);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            console.error("کپی لینک انجام نشد.");
        }
    }

    async function shareNews() {
        const shareData = {title, url: window.location.href,};

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                // کاربر ممکن است پنجره اشتراک‌گذاری را ببندد.
            }
        }

        await copyLink();
    }

    return (
        <div className="flex flex-wrap items-center gap-3 border-y border-border py-5">

            <span className="text-sm font-semibold text-foreground">
                اشتراک‌گذاری:
            </span>

            <button
                type="button"
                onClick={shareNews}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
                <Share2 size={17}/>
                اشتراک‌گذاری
            </button>

            <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
                {
                    copied ?
                        <Check size={17} className="text-green-600"/>
                        :
                        <Copy size={17}/>
                }

                {
                    copied ? "کپی شد" : "کپی لینک"
                }
            </button>

        </div>
    );
}