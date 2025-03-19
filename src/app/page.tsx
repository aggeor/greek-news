"use client";

import { useState, useEffect } from "react";
import getFeeds from "./api";
import { ArticleCard } from "./components/ArticleCard";
import ArticleDetails from "./components/ArticleDetails";

export default function App() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getFeeds();
      setArticles(data);
    }
    fetchData();
  }, []);

  
  const [showDetails, setShowDetails ] = useState(false);
  function toggleDetails (article:any){
    setShowDetails(!showDetails);
    setSelectedArticle(article);
  }

  function back(){
    setShowDetails(false);
    setSelectedArticle(null);
  }

  if (showDetails) return ( <ArticleDetails article={selectedArticle} onBack={back} />);

  return (
    <div>
      <h1>Latest News</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} toggleDetails={toggleDetails} />
            // <li key={index}>
            //   <a href={article.link} target="_blank" rel="noopener noreferrer">
            //     {article.title}
            //   </a>
            // </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
