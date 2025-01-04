import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://citizenprep.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://citizenprep.vercel.app/civics",
      lastModified: new Date(),
    },
    {
      url: "https://citizenprep.vercel.app/meaning",
      lastModified: new Date(),
    },
    {
      url: "https://citizenprep.vercel.app/mocktest",
      lastModified: new Date(),
    },
    {
      url: "https://citizenprep.vercel.app/readingandwriting",
      lastModified: new Date(),
    },
    {
      url: "https://citizenprep.vercel.app/yesno",
      lastModified: new Date(),
    },
  ];
}
