import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
    return (
        new Array(5).fill('').map((_, index) => <ArticleSkeletonCard key={index} />)
    )
}
  
export function ArticleSkeletonCard() {
    return (
      <Card className="grid sm:grid-cols-[1fr] lg:grid-cols-[auto_1fr] max-w-3xl items-start gap-0.5 m-4">
        <Skeleton className="h-[125px] w-[250px] rounded-md object-cover sm:max-h-64 lg:self-start ml-6 mb-2" />
        <div className="space-y-5">
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
      </Card>
    )
  }