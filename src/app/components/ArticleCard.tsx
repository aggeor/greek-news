import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { processArticleDescription } from "../helper";
import { ArticleContent } from "./ArticleContent";

interface ArticleCardProps{
    article:any
    toggleDetails:(article:any)=>void
}

export function ArticleCard({ article, toggleDetails }: ArticleCardProps) {
  const { imageUrl, cleanedDescription } = processArticleDescription(article.description);

  return (
    <Card className="grid grid-cols-[auto_1fr] max-w-3xl p-2 gap-1">
      {imageUrl ? <Image src={imageUrl} width={256} height={256} alt="Image" className="rounded-md object-cover" /> : <div/>}
      <CardHeader className="overflow-hidden">
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            <div>{article.author}</div>
            <div>{article.pubDate}</div>
            <CardDescription>
              <ArticleContent content={cleanedDescription} />
            </CardDescription>

            <button onClick={()=>toggleDetails(article)} > Διαβαστε Περισσότερα </button>
      </CardHeader>
    </Card>
  )
}
