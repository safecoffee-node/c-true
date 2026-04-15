import data from "../content/quotes/quotes.json";
import { db } from "./db.ts";
import { series, topics, seriesTopics, quotes } from "./schema.ts";

async function seed() {
  const [saison1] = await db
    .insert(series)
    .values({
      name: "Saison 1",
      userId: "ibaVT5FhANHbVkMp1Jj4bhQpkd1U7d8s",
    })
    .returning();

  for (const [key, theme] of Object.entries(data.themes)) {
    const [topic] = await db
      .insert(topics)
      .values({
        name: theme.titre,
      })
      .returning();

    await db.insert(seriesTopics).values({
      serieId: saison1.id,
      topicId: topic.id,
    });

    await db.insert(quotes).values(
      theme.citations.map((c) => ({
        body: c.citation,
        author: c.auteur,
        nationalite: c.nationalite,
        source: c.source,
        statut: c.statut as any,
        topicId: topic.id,
      })),
    );

    console.log(`${theme.titre} — ${theme.citations.length} quote`);
  }

  console.log("Done");
}

seed().catch(console.error);
