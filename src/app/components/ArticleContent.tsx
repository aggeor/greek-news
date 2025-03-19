
import DOMPurify from "dompurify";

export function ArticleContent({ content }: { content: string }) {
    const sanitizedHTML = DOMPurify.sanitize(content);

    return (
        <div className="prose max-w-none article-content" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
}
