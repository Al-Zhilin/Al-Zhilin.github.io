import { describe, expect, it } from "vitest";
import { serializeExperience, type ExperienceEntry } from "./experience";

describe("serializeExperience", () => {
  it("produces valid, parseable JSON with a trailing newline", () => {
    const data: ExperienceEntry[] = [
      {
        when: "Сейчас",
        role: "Руководитель проекта",
        company: "Signal-Master",
        current: true,
        desc: "Описание.",
        tags: ["FastAPI"],
      },
    ];
    const serialized = serializeExperience(data);
    expect(serialized.endsWith("\n")).toBe(true);
    expect(JSON.parse(serialized)).toEqual(data);
  });
});
