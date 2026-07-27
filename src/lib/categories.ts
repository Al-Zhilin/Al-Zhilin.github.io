export const CATEGORY_LABELS: Record<string, string> = {
  firmware: "Прошивки",
  hardware: "Платы",
  iot: "IoT",
  tools: "Инструменты",
};

export function catLabel(cat?: string): string {
  if (!cat) return "Проект";
  return CATEGORY_LABELS[cat] ?? cat;
}
