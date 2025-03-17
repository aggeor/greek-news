"use client";

import { useState, useEffect } from "react";
import getFeeds from "./api";

export default function App() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getFeeds();
      setArticles(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Latest News</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
