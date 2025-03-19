"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatDate, processArticleContent, processArticleDescription } from "../helper";
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button";
import { ArticleContent } from "./ArticleContent";

interface ArticleCardProps{
  article:any
  onBack:()=>void
}

export default function ArticleDetails({ article, onBack }: ArticleCardProps) {

  const { imageUrl, cleanedDescription } = processArticleDescription(article.description);
  const { cleanedContent } = processArticleContent(article.content);
  window.scrollTo(0,0);
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
          <div>{formatDate(article.pubDate)}</div>
        </CardHeader>
        <CardContent>
          <ArticleContent content={cleanedContent} />
        </CardContent>
      </Card>
    </div>
  );
}
