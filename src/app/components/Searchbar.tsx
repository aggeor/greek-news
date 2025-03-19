"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

function Searchbar({ value, onChange, onClear }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close search bar when clicking outside (only if input is empty)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        value === "" // Only collapse if input is empty
      ) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      {/* Search Icon (acts as a button for expansion) */}
      <button
        onClick={() => setIsExpanded(true)}
        className="absolute left-3 text-gray-400"
      >
        <Search size={18} />
      </button>

      {/* Motion Input Field */}
      <motion.input
        ref={inputRef}
        value={value}
        onChange={onChange}
        initial={{ width: "2.5rem" }}
        animate={{ width: isExpanded ? "16rem" : "2.5rem" }} 
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`p-2 pl-10 pr-8 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          isExpanded ? "shadow-md" : "cursor-pointer"
        }`}
        placeholder={isExpanded ? "Αναζήτηση..." : ""}
        onFocus={() => setIsExpanded(true)}
      />

      {/* Clear Button (Only Visible When Expanded & Input is Not Empty) */}
      {isExpanded && value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent outside click from collapsing
            onClear(); // Clears the input
          }}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default Searchbar;
