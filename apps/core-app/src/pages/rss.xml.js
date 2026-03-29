import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const items = await getCollection("quotes");
  const allCitations = items.flatMap((item) =>
    Object.values(item.data.themes).flatMap((t) => t.citations),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: allCitations.map((citation) => ({
      title: citation.auteur,
      description: citation.citation_originale,
      pubDate: new Date(citation.publishAt[0]),
      link: `/browse/${citation.publishAt[0].replace(/-/g, "-")}/`,
    })),
  });
}
