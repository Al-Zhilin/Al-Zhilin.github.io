import { describe, expect, it } from "vitest";
import {
  parseProjectMarkdown,
  serializeProjectFrontmatter,
  type ProjectFormData,
} from "./project-frontmatter";

const sample: ProjectFormData = {
  title: "Signal-Master",
  slug: "signal-master",
  summary: "A hardware/software complex for remote equipment control.",
  tags: ["FastAPI", "PyVISA", "Raspberry Pi 5"],
  githubUrl: "https://github.com/Al-Zhilin/signal-master",
  date: "2026-01-01",
  body: "Detailed description.",
};

describe("serializeProjectFrontmatter", () => {
  it("produces a frontmatter block wrapped in --- delimiters", () => {
    const result = serializeProjectFrontmatter(sample);
    expect(result.startsWith("---\n")).toBe(true);
    expect(result).toContain("\n---\n\n");
  });

  it("serializes all required fields as valid JSON-compatible scalars", () => {
    const result = serializeProjectFrontmatter(sample);
    expect(result).toContain(`title: ${JSON.stringify(sample.title)}`);
    expect(result).toContain(`slug: ${JSON.stringify(sample.slug)}`);
    expect(result).toContain(`tags: ${JSON.stringify(sample.tags)}`);
    expect(result).toContain(`githubUrl: ${JSON.stringify(sample.githubUrl)}`);
  });

  it("omits coverImage when not provided", () => {
    const result = serializeProjectFrontmatter(sample);
    expect(result).not.toContain("coverImage");
  });

  it("includes coverImage when provided", () => {
    const result = serializeProjectFrontmatter({
      ...sample,
      coverImage: "/cover.png",
    });
    expect(result).toContain(`coverImage: ${JSON.stringify("/cover.png")}`);
  });

  it("appends the trimmed body after the frontmatter block", () => {
    const result = serializeProjectFrontmatter({
      ...sample,
      body: "  \nDetailed description.\n\n  ",
    });
    expect(result.endsWith("Detailed description.\n")).toBe(true);
  });
});

describe("parseProjectMarkdown", () => {
  it("round-trips data produced by serializeProjectFrontmatter", () => {
    const raw = serializeProjectFrontmatter(sample);
    const { frontmatter, body } = parseProjectMarkdown(raw);

    expect(frontmatter.title).toBe(sample.title);
    expect(frontmatter.slug).toBe(sample.slug);
    expect(frontmatter.summary).toBe(sample.summary);
    expect(frontmatter.tags).toEqual(sample.tags);
    expect(frontmatter.githubUrl).toBe(sample.githubUrl);
    expect(frontmatter.date).toBe(sample.date);
    expect(body).toBe(sample.body);
  });

  it("returns an empty frontmatter object for content without delimiters", () => {
    const { frontmatter, body } = parseProjectMarkdown("just plain text");
    expect(frontmatter).toEqual({});
    expect(body).toBe("just plain text");
  });
});
