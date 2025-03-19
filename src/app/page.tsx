"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import getFeeds from "./api";
import { ArticleCard } from "./components/ArticleCard";
import ArticleDetails from "./components/ArticleDetails";
import { LoadingSkeleton } from "./components/Skeleton";
import { DarkModeToggle } from "./components/DarkModeToggle";
import Searchbar from "./components/Searchbar";

export default function App() {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollPositionRef = useRef(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getFeeds();
      setArticles(data);
      setFilteredArticles(data);
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
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setInput(searchTerm);
  
    if (searchTerm !== "") {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm)||
        article.author.toLowerCase().includes(searchTerm)
      );
      setFilteredArticles(filtered);
      window.scrollTo(0, 0);
    } else {
      setFilteredArticles(articles);
    }
  };

  const handleSearchClear = () => {
    setInput("");
    setFilteredArticles(articles);
  };

  if (showDetails) return ( <ArticleDetails article={selectedArticle} onBack={back} />);

  return (
    <div>
      <div className="flex flex-row justify-between sticky top-0 z-10 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold m-4">Τελευταία Νέα & Ειδήσεις</h1>
          <Searchbar 
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              value={input}
          />
        </div>
        <DarkModeToggle />
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-2">
          {filteredArticles.sort((a,b) => (a.pubDate < b.pubDate) ? 1 : -1 ).map((article, index) => (
            <ArticleCard key={index} article={article} toggleDetails={toggleDetails}/>
          ))}
        </div>
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}
