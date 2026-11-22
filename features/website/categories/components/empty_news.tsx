
import Link from "next/link";
import {Newspaper, ArrowRight} from "lucide-react";

export default function EmptyNews() {

    return (
        <div className="
            flex flex-col items-center
            justify-center rounded-2xl
            border border-border bg-surface
            px-5 py-16 text-center
        ">

            <div className="
                mb-5 flex size-16
                items-center justify-center
                rounded-2xl bg-primary/10
                text-primary
            ">
                <Newspaper size={30}/>
            </div>

            <h2 className="
                text-lg font-bold text-foreground
            ">
                خبری در این دسته‌بندی وجود ندارد
            </h2>

            <p className="
                mt-3 max-w-md text-sm
                leading-8 text-muted-foreground
            ">
                در حال حاضر خبری برای این دسته‌بندی منتشر نشده است.
                بعداً دوباره به این بخش سر بزنید.
            </p>

            <Link
                href="/categories"
                className="
                    mt-6 inline-flex items-center
                    gap-2 rounded-xl bg-primary
                    px-5 py-3 text-sm font-medium
                    text-white transition-colors
                    hover:bg-primary-hover
                "
            >
                <ArrowRight size={17}/>
                مشاهده دسته‌بندی‌ها
            </Link>

        </div>
    );
}
