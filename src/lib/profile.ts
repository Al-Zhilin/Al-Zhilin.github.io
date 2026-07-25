export interface ProfileData {
  name: string;
  role: string;
  bio: string[];
  resumeUrl: string;
  contacts: {
    email: string;
    github: string;
    telegram: string;
  };
}

export function serializeProfile(data: ProfileData): string {
  return JSON.stringify(data, null, 2) + "\n";
}

export function bioTextToParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function bioParagraphsToText(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}
