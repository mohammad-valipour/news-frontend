"use client";

import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useNews} from "@/features/website/home/queries/news.queries";
import Link from "next/link";
import Image from "next/image";

export default function Slider() {
    const {data, isLoading, isError, refetch} = useNews();
    const news = data?.slice(0, 4);

    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground">
                    در حال دریافت اخبار...
                </p>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground">
                    دریافت اخبار با خطا مواجه شد.
                </p>

                <button
                    onClick={() => refetch()}
                    className="text-sm font-medium text-primary hover:underline"
                >
                    تلاش مجدد
                </button>
            </div>
        );
    }
    if (!news?.length) {
        return (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground">
                    خبری برای نمایش وجود ندارد.
                </p>
            </div>
        );
    }


    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{clickable: true}}
            slidesPerView={1}
            spaceBetween={1}
            loop={true}
            className="w-full h-full overflow-hidden rounded-2xl"
        >
            {
                news.map(item =>
                    <SwiperSlide key={item.id}>
                        <Link
                            href={`/news/${item.id}`}
                            className="group relative block h-full w-full overflow-hidden"
                        >
                            {/* تصویر خبر */}
                            {
                                item.image_url ?
                                    <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        fill
                                        sizes="100vw"
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    :
                                    <div className="absolute inset-0 bg-slate-800"/>
                            }

                            {/* گرادیانت برای خوانایی عنوان */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent"/>

                            {/* عنوان خبر */}
                            <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-right sm:p-8 lg:p-10">
                                <h2 className="max-w-3xl text-lg font-bold leading-8 text-white sm:text-2xl sm:leading-10 lg:text-3xl">
                                    {item.title}
                                </h2>
                            </div>
                        </Link>
                    </SwiperSlide>
                )
            }
        </Swiper>
    );
}