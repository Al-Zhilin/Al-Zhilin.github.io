export interface ExperienceEntry {
  when: string;
  role: string;
  company: string;
  current: boolean;
  desc: string;
  tags: string[];
}

export function serializeExperience(data: ExperienceEntry[]): string {
  return JSON.stringify(data, null, 2) + "\n";
}
