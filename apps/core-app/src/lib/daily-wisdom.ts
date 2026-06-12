const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;

export function todayPubDate(): string {
  const d = new Date();
  return `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
}

export function dateToPubDate(year: number, month: number, day: number): string {
  return `${MONTHS[month - 1]} ${String(day).padStart(2, "0")}`;
}

const END_PUNCTUATION = /[.!?]["'\u2019»]?$/;
const SOURCE_PAT = /(?:proverb|poem|riddle|folktale|legend|saying|superstition)$/i;
const PERSON_PAT = /^[A-Z][a-z]+ [A-Z][a-z]+,/;
const GARBAGE = /^(?:[A-Z]?[a-z]?$|"[a-z]+ [a-z]+$|Brass chameleon|Catfish pendant|Skull guardian|I khoko pendant|NK$|"i es$|Wy$|fe WW$)/;

export function cleanBody(body: string): string[] {
  const lines = body.split("\n").map(l => l.trim()).filter(l => l.length > 0 && !GARBAGE.test(l));
  if (lines.length === 0) return [];

  const chunks: string[] = [];
  let block: string[] = [];

  for (const line of lines) {
    block.push(line);
    if (END_PUNCTUATION.test(line) || SOURCE_PAT.test(line) || PERSON_PAT.test(line)) {
      chunks.push(block.join(" ").replace(/- /g, ""));
      block = [];
    }
  }
  if (block.length) chunks.push(block.join(" ").replace(/- /g, ""));

  return chunks;
}
