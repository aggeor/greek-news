import { AspectRatio } from "@/components/ui/aspect-ratio"
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
    <Card className="w-[40vw] h-[20vh] mt-3">
      <CardHeader>
        <div className="flex flex-row">
            <Image src={article.thumbnail} width={64} height={50} alt="Image" className="rounded-md object-cover" />
            <div className="flex flex-col">
                <CardTitle>{article.title}</CardTitle>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* <CardDescription>{article.description}</CardDescription> */}
        {article.pubDate}
        </CardContent>
      <CardFooter>
        Περισσότερα
      </CardFooter>
    </Card>
  )
}
