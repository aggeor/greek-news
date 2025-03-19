"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import DOMPurify from "dompurify";
import { processArticleDescription } from "../helper";
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button";

interface ArticleCardProps{
  article:any
  onBack:()=>void
}

export default function ArticleDetails({ article, onBack }: ArticleCardProps) {

  const { imageUrl, cleanedDescription } = processArticleDescription(article.description);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
            <Button onClick={onBack} variant="outline" size="icon">
              <ChevronLeft />
            </Button>

          <CardTitle className="text-2xl">{article.title}</CardTitle>
          {imageUrl && <Image src={imageUrl} width={1000} height={400} alt="Image" className="rounded-md object-cover" />}
          <div>{article.author}</div>
          <div>{article.pubDate}</div>
          <CardDescription>
            <Description description={cleanedDescription} />
          </CardDescription>
          <CardContent>
            {article.content}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

function Description({ description }: { description: string }) {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
    <div className="prose max-w-none article-description" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  );
}
