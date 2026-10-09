import type { MetadataRoute } from "next";

const SITE_URL = "https://www.ntalpha.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/imoveis",
    "/sobre",
    "/regiao",
    "/contato",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/imoveis" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/imoveis" ? 0.9 : 0.7,
  }));
}
