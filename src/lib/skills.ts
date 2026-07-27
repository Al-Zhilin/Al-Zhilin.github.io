export interface SkillCard {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

export function serializeSkills(data: SkillCard[]): string {
  return JSON.stringify(data, null, 2) + "\n";
}
