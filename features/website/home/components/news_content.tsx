import sanitizeHtml from "sanitize-html";

interface NewsContentProps {
    content: string;
}

export default function NewsContent({content}: NewsContentProps) {
    const cleanContent = sanitizeHtml(content);

    return (
        <div
            className="news-content"
            dangerouslySetInnerHTML={{
                __html: cleanContent,
            }}
        />
    );
}