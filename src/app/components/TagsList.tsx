import React from 'react'

interface TagsListProps {
    visibleTags:any[],
    selectedTags:any[],
    showAllTags:boolean,
    totalTags:number,
    onTagClick:(tag:any)=>void,
    onTagToggle:()=>void
}

function TagsList({visibleTags,selectedTags,showAllTags,totalTags,onTagClick,onTagToggle}:TagsListProps) {
  return (
    <div className="flex flex-wrap gap-2 m-4">
        {visibleTags.map((tag,index)=>(
          <button 
            onClick={() => onTagClick(tag)} 
            key={index} 
            className={`px-3 py-1 rounded-2xl text-sm transition ${
              selectedTags.includes(tag) 
                ? "bg-blue-600 text-white dark:bg-blue-400"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
        {totalTags > 10 && (
          <button 
            onClick={onTagToggle}
            className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-600 rounded-2xl transition"
          >
            {showAllTags ? "Λιγοτερες Κατηγοριες" : "Περισσοτερες Κατηγοριες"}
          </button>
        )}
      </div>
  )
}

export default TagsList
