interface NewsImageProps {
    src: string;
    alt: string;
}

export default function NewsImage({src, alt}: NewsImageProps) {
    return (
        <figure className="overflow-hidden rounded-2xl bg-muted">
            <img
                src={src}
                alt={alt}
                className="h-auto max-h-140 w-full object-cover"
            />
        </figure>
    );
}