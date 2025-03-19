import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { processArticleDescription } from "../helper";
import { ArticleContent } from "./ArticleContent";

interface ArticleCardProps {
  article: any;
  toggleDetails: (article: any) => void;
}

export function ArticleCard({ article, toggleDetails }: ArticleCardProps) {
  const { imageUrl, cleanedDescription } = processArticleDescription(article.description);

  return (
    <Card className="grid sm:grid-cols-[1fr] lg:grid-cols-[auto_1fr] max-w-3xl items-start gap-0.5">
      
      {imageUrl && (
        <Image
          src={imageUrl}
          width={256}
          height={256}
          alt="Article Image"
          className="rounded-md object-cover h-auto sm:max-h-64 lg:self-start ml-6 mb-2"
        />
      )}
      
      <CardContent>
        <CardTitle className="text-lg line-clamp-2 mb-2">{article.title}</CardTitle>
        <div className="text-sm text-gray-600 mb-0.5">{article.author}</div>
        <div className="text-sm text-gray-500 mb-2">{article.pubDate}</div>
        <CardDescription>
          <ArticleContent content={cleanedDescription} />
        </CardDescription>

        <button
          onClick={() => toggleDetails(article)}
          className="mt-2 text-blue-500 hover:underline"
        >
          Διαβάστε Περισσότερα
        </button>
      </CardContent>
    </Card>
  );
}
