import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

interface ArticleCardProps{
    article:any
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="grid grid-cols-[auto_1fr] max-w-3xl p-2 gap-1">
      {article.thumbnail ? <Image src={article.thumbnail} width={256} height={256} alt="Image" className="rounded-md object-cover" /> : <div/>}
      <CardHeader className="overflow-hidden">
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            <div>{article.author}</div>
            <div>{article.pubDate}</div>
            <CardDescription>{article.description}</CardDescription>
            <div>Διαβαστε Περισσότερα</div>
      </CardHeader>
    </Card>
  )
}
