"use client";

import { useSearchParams } from "next/navigation";  // Import from next/navigation
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import DOMPurify from "dompurify";
import { processArticleDescription } from "../helper";

interface ArticleCardProps{
  article:any
}

export default function ArticleDetails({ article }: ArticleCardProps) {

  const { imageUrl, cleanedDescription } = processArticleDescription(article.description);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        {imageUrl && <Image src={imageUrl} width={600} height={400} alt="Image" className="rounded-md object-cover" />}
        <CardHeader>
          <CardTitle className="text-2xl">{article.title}</CardTitle>
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
