import { writeFileSync } from "fs";
import data from "src/content/quotes/quotes.json";

const escape = (str: string) => str.replace(/'/g, "''");

let sql = "";

// 1. Série
sql += `INSERT INTO series (id, name, userId) VALUES ('sr_saison1', 'Saison 1', 'ibaVT5FhANHbVkMp1Jj4bhQpkd1U7d8s');\n\n`;

// 2. Topics + seriesTopics + quotes
for (const [key, theme] of Object.entries(data.themes)) {
  const topicId = `tp_${key}`;

  sql += `INSERT INTO topics (id, name) VALUES ('${topicId}', '${escape(theme.titre)}');\n`;
  sql += `INSERT INTO series_topics (series_id, topic_id) VALUES ('sr_saison1', '${topicId}');\n\n`;

  for (const c of theme.citations) {
    const id = `qt_${crypto.randomUUID().slice(0, 8)}`;
    sql += `INSERT INTO quotes (id, body, author, nationalite, source, publishAt, statut, topic_id) VALUES ('${id}', '${escape(c.citation_originale)}', '${escape(c.auteur)}', '${escape(c.nationalite)}', '${escape(c.source_originale)}','${escape(JSON.stringify(c.publishAt))}',  '${c.statut}', '${topicId}');\n`;
  }

  sql += "\n";
}

writeFileSync("./seed.sql", sql);
console.log("Done");
