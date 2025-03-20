import { format } from "date-fns";
import { el } from "date-fns/locale";

// Function to extract first image URL and clean the description
export function processArticleDescription(html: string): { imageUrl: string | null; cleanedDescription: string } {
    const doc = new DOMParser().parseFromString(html, "text/html");
  
    // Extract first image URL
    const img = doc.querySelector("img");
    const imageUrl = img ? img.getAttribute("src") : null;
    img?.parentNode?.removeChild(img); // Remove the image from the description
  
    // Remove unwanted text-based elements
    doc.querySelectorAll("p, a").forEach((el) => {
      const text = el.textContent || "";
      if (
        text.includes("εμφανίστηκε πρώτα στο") || 
        text.includes("appeared first on") || 
        text.includes("Διαβάστε εδώ ⇛") || 
        text.includes("Περισσότερα")
      ) {
        el.parentNode?.removeChild(el);
      }
    });
  
    return {
      imageUrl,
      cleanedDescription: doc.body.innerHTML,
    };
  }

  
// Function to clean the article content
export function processArticleContent(html: string): { cleanedContent: string } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  
  // Extract first image URL
  const img = doc.querySelector("img");
  img?.parentNode?.removeChild(img); // Remove image

  return {
    cleanedContent: doc.body.innerHTML,
  };
}

// Remove greek character accents and return lowercase text
export function normalizeString(str:string): string{
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Format date to d MMMM yyyy, HH:mm
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy, HH:mm", { locale: el });
}