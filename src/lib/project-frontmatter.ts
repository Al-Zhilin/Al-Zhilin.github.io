export interface ProjectFormData {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  githubUrl: string;
  coverImage?: string;
  category?: string;
  lead?: string;
  problem?: string;
  solution?: string[];
  result?: string;
  date: string;
  body: string;
}

export function serializeProjectFrontmatter(data: ProjectFormData): string {
  const lines = [
    `title: ${JSON.stringify(data.title)}`,
    `slug: ${JSON.stringify(data.slug)}`,
    `summary: ${JSON.stringify(data.summary)}`,
    `tags: ${JSON.stringify(data.tags)}`,
    `githubUrl: ${JSON.stringify(data.githubUrl)}`,
  ];

  if (data.coverImage) {
    lines.push(`coverImage: ${JSON.stringify(data.coverImage)}`);
  }
  if (data.category) {
    lines.push(`category: ${JSON.stringify(data.category)}`);
  }
  if (data.lead) {
    lines.push(`lead: ${JSON.stringify(data.lead)}`);
  }
  if (data.problem) {
    lines.push(`problem: ${JSON.stringify(data.problem)}`);
  }
  if (data.solution && data.solution.length > 0) {
    lines.push(`solution: ${JSON.stringify(data.solution)}`);
  }
  if (data.result) {
    lines.push(`result: ${JSON.stringify(data.result)}`);
  }

  lines.push(`date: ${JSON.stringify(data.date)}`);

  return `---\n${lines.join("\n")}\n---\n\n${data.body.trim()}\n`;
}

export interface ParsedProjectFile {
  frontmatter: Record<string, unknown>;
  body: string;
}

export function parseProjectMarkdown(raw: string): ParsedProjectFile {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const [, frontmatterBlock, body] = match;
  const frontmatter: Record<string, unknown> = {};

  for (const line of frontmatterBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();

    try {
      frontmatter[key] = JSON.parse(rawValue);
    } catch {
      frontmatter[key] = rawValue;
    }
  }

  return { frontmatter, body: body.trim() };
}
