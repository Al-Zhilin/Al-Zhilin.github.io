export function tagsTextToArray(text: string): string[] {
  return text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function tagsArrayToText(tags: string[]): string {
  return tags.join(", ");
}
