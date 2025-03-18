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
import { processArticleDescription } from "../helper";
import Link from "next/link";
import { useState } from "react";
import ArticleDetails from "./ArticleDetails";

interface ArticleCardProps{
    article:any
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [showDetails, setShowDetails ] = useState(false);
  const { imageUrl, cleanedDescription } = processArticleDescription(article.description);
  const articleData = encodeURIComponent(JSON.stringify(article)); // Serialize article data

  function toggleDetails (){
    setShowDetails(!showDetails);
  }

  if (showDetails) return ( <ArticleDetails article={article} />);

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

            <button onClick={toggleDetails} > Διαβαστε Περισσότερα </button>
      </CardHeader>
    </Card>
  )
}

function Description({ description }: { description: string }) {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
      <div className="prose max-w-none article-description" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} /> 
  );
}