import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    imageURL: string;
}

export default function Logo({imageURL}: LogoProps) {
    return (
        <Link
            href="/"
            aria-label="صفحه اصلی نیوز"
            className="relative flex h-12 w-36 shrink-0 items-center"
        >
            <Image
                src={imageURL}
                alt="لوگوی نیوز"
                width={144}
                height={48}
                priority
                className="h-full w-full object-contain"
            />
        </Link>
    );
}