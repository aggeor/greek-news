"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import getFeeds from "./api";
import { ArticleCard } from "./components/ArticleCard";
import ArticleDetails from "./components/ArticleDetails";
import { LoadingSkeleton } from "./components/Skeleton";
import { DarkModeToggle } from "./components/DarkModeToggle";
import Searchbar from "./components/Searchbar";
import { normalizeString } from "./helper";
import TagsList from "./components/TagsList";

export default function App() {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollPositionRef = useRef(0);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showDetails, setShowDetails ] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const visibleTags = showAllTags ? tags : tags.slice(0, 10);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getFeeds();
      setArticles(data);
      setFilteredArticles(data);
      const categories = new Set(
        data.flatMap((article) => 
          (article.categories || []).map((category: string) => normalizeString(category).toUpperCase())
        )
      );

      setTags(Array.from(categories));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];

      if (newTags.length === 0) {
        setFilteredArticles(articles);
      } else {
        setFilteredArticles(
          articles.filter((article) =>
            article.categories?.some((category: string) => newTags.includes(normalizeString(category).toUpperCase()))
          )
        );
      }
      return newTags;
    });
  };

  const handleShowAllTagsToggleClick = ()=>{
    setShowAllTags(!showAllTags)
  }

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
        normalizeString(article.title).includes(normalizeString(searchTerm)) ||
        normalizeString(article.description).includes(normalizeString(searchTerm)) ||
        normalizeString(article.content).includes(normalizeString(searchTerm)) ||
        normalizeString(article.author).includes(normalizeString(searchTerm))
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
          <h1 className="text-3xl font-bold m-4">Τελευταία Νέα</h1>
          <Searchbar 
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              value={input}
          />
        </div>
        <DarkModeToggle />
      </div>
      <TagsList 
        visibleTags={visibleTags}
        selectedTags={selectedTags}
        showAllTags={showAllTags}
        totalTags={tags.length}
        onTagClick={handleTagClick}
        onTagToggle={handleShowAllTagsToggleClick}
      />
      
      {!isLoading ? (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 md:justify-self-center">
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
