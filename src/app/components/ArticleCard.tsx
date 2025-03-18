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
// Function to remove img element from HTML description
function removeFirstAppearedFromDescription(html: string): string | null {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const paragraphs = doc.querySelectorAll("p");

  paragraphs.forEach((p) => {
    if (p.textContent?.includes("εμφανίστηκε πρώτα στο") || p.textContent?.includes("appeared first on")) {
      p.parentNode?.removeChild(p); // Remove the paragraph if it contains the phrase
    }
  });

  return doc.body.innerHTML; // Return the cleaned HTML
}

// Function to remove link element from HTML description
function removeLinksFromDescription(html: string): string | null {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const links = doc.querySelectorAll("a");
  links.forEach((l) => {
    if (l.textContent?.includes("Διαβάστε εδώ ⇛") || l.textContent?.includes("Περισσότερα")) {
      l.parentNode?.removeChild(l); // Remove the paragraph if it contains the phrase
    }
  });
  return doc.body.innerHTML; // Return the cleaned HTML
}

function Description({ description }: { description: string }) {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
      <div className="prose max-w-none article-description" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} /> 
  );
}

export function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.thumbnail || extractImageSrc(article.description) || null;
  var articleDescription = removeImageFromDescription(article.description) || "";
  const removedFirstAppearedDescription = removeFirstAppearedFromDescription(articleDescription) || "" ;
  const cleanedDescription = removeLinksFromDescription(removedFirstAppearedDescription) || "" ;
  const articleLink = article.link;
  return (
    <Card className="grid grid-cols-[auto_1fr] max-w-3xl p-2 gap-1">
      {imageUrl ? <Image src={imageUrl} width={256} height={256} alt="Image" className="rounded-md object-cover" /> : <div/>}
      <CardHeader className="overflow-hidden">
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            <div>{article.author}</div>
            <div>{article.pubDate}</div>
            <CardDescription>
              <Description description={cleanedDescription} />
            </CardDescription>
            <a href={articleLink}>Διαβαστε Περισσότερα</a>
      </CardHeader>
    </Card>
  )
}
