import axios from "axios";

const PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

const RSS_SOURCES = [
    `${PROXY}https://thepressproject.gr/feed/`,
    `${PROXY}https://www.newsbomb.gr/oles-oi-eidhseis?format=feed&type=rss`,
    `${PROXY}https://www.avgi.gr/rss.xml`,
    `${PROXY}https://www.documentonews.gr/feed`,
    `${PROXY}https://feeds.feedburner.com/leftgr`,
    `${PROXY}https://www.kontranews.gr/feed/`,
    `${PROXY}https://www.ertnews.gr/feed/`,
    
];

export default async function getFeeds(){
    try {
        const responses = await Promise.allSettled(RSS_SOURCES.map((url) => axios.get(url)));
        const successfulFeeds = responses
            .filter((res) => res.status === "fulfilled")
            .map((res) => (res as PromiseFulfilledResult<any>).value.data.items)
            .flat();

        return successfulFeeds;
      } catch (error) {
        console.error("Error fetching feeds:", error);
        return [];
      }
}