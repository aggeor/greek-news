import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import DOMPurify from "dompurify";

interface ArticleCardProps{
    article:any
}

// Function to extract first image URL from HTML description
function extractImageSrc(html: string): string | null {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const img = doc.querySelector("img");
  return img ? img.getAttribute("src") : null;
}

// Function to remove img element from HTML description
function removeImageFromDescription(html: string): string | null {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const img = doc.querySelector("img");
  if (img && img.parentNode) {
    img.parentNode.removeChild(img); // remove the image from its parent
  }
  return doc.body.innerHTML; // Return the cleaned innerHTML
}

function Description({ description }: { description: string }) {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
      <div className="prose max-w-none article-description" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} /> 
  );
}

export function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.thumbnail || extractImageSrc(article.description) || null;
  const articleDescription = removeImageFromDescription(article.description) || "";
  const articleLink = article.link;
  return (
    <Card className="grid grid-cols-[auto_1fr] max-w-3xl p-2 gap-1">
      {imageUrl ? <Image src={imageUrl} width={256} height={256} alt="Image" className="rounded-md object-cover" /> : <div/>}
      <CardHeader className="overflow-hidden">
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            <div>{article.author}</div>
            <div>{article.pubDate}</div>
            <CardDescription>
              <Description description={articleDescription} />
            </CardDescription>
            <a href={articleLink}>Διαβαστε Περισσότερα</a>
      </CardHeader>
    </Card>
  )
}
