import { describe, expect, it } from "vitest";
import { serializeSkills, type SkillCard } from "./skills";

describe("serializeSkills", () => {
  it("produces valid, parseable JSON with a trailing newline", () => {
    const data: SkillCard[] = [
      {
        icon: "cpu",
        title: "Микроконтроллеры",
        desc: "ESP32.",
        tags: ["ESP32"],
      },
    ];
    const serialized = serializeSkills(data);
    expect(serialized.endsWith("\n")).toBe(true);
    expect(JSON.parse(serialized)).toEqual(data);
  });
});
