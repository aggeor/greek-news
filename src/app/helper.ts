
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