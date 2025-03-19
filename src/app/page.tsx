"use client";

import { useState, useEffect, useRef } from "react";
import getFeeds from "./api";
import { ArticleCard } from "./components/ArticleCard";
import ArticleDetails from "./components/ArticleDetails";
import { LoadingSkeleton } from "./components/Skeleton";
import { DarkModeToggle } from "./components/DarkModeToggle";

export default function App() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getFeeds();
      setArticles(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  
  const [showDetails, setShowDetails ] = useState(false);
  function toggleDetails (article:any){
    scrollPositionRef.current = window.scrollY;
    setShowDetails(!showDetails);
    setSelectedArticle(article);
  }

  function back(){
    setShowDetails(false);
    setSelectedArticle(null);
  }
  useEffect(() => {
    if (!showDetails) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [showDetails]);

  if (showDetails) return ( <ArticleDetails article={selectedArticle} onBack={back} />);

  return (
    <div>
      <div className="flex flex-row justify-between sticky top-0 z-10 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent">
        <h1 className="text-3xl font-bold m-4">Latest News</h1>
        <DarkModeToggle />
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-2">
          {articles.sort((a,b) => (a.pubDate < b.pubDate) ? 1 : -1 ).map((article, index) => (
            <ArticleCard key={index} article={article} toggleDetails={toggleDetails}/>
          ))}
        </div>
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}
