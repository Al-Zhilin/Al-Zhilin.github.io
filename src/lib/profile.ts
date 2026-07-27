export interface ProfileContact {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  role: string;
  resumeUrl: string;
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    sub: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    p2: string;
    p3: string;
  };
  contacts: ProfileContact[];
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
