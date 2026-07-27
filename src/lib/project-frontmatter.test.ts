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

  it("omits case-study fields when not provided", () => {
    const result = serializeProjectFrontmatter(sample);
    expect(result).not.toContain("category");
    expect(result).not.toContain("lead");
    expect(result).not.toContain("problem");
    expect(result).not.toContain("solution");
    expect(result).not.toContain("result");
  });

  it("includes case-study fields when provided", () => {
    const result = serializeProjectFrontmatter({
      ...sample,
      category: "iot",
      lead: "A compact node.",
      problem: "Needed wireless telemetry.",
      solution: ["Step one", "Step two"],
      result: "3 years of battery life.",
    });
    expect(result).toContain(`category: ${JSON.stringify("iot")}`);
    expect(result).toContain(`lead: ${JSON.stringify("A compact node.")}`);
    expect(result).toContain(
      `problem: ${JSON.stringify("Needed wireless telemetry.")}`,
    );
    expect(result).toContain(
      `solution: ${JSON.stringify(["Step one", "Step two"])}`,
    );
    expect(result).toContain(
      `result: ${JSON.stringify("3 years of battery life.")}`,
    );
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

  it("round-trips case-study fields including the solution array", () => {
    const withCaseStudy = {
      ...sample,
      category: "iot",
      lead: "A compact node.",
      problem: "Needed wireless telemetry.",
      solution: ["Step one", "Step two"],
      result: "3 years of battery life.",
    };
    const raw = serializeProjectFrontmatter(withCaseStudy);
    const { frontmatter } = parseProjectMarkdown(raw);

    expect(frontmatter.category).toBe("iot");
    expect(frontmatter.lead).toBe("A compact node.");
    expect(frontmatter.problem).toBe("Needed wireless telemetry.");
    expect(frontmatter.solution).toEqual(["Step one", "Step two"]);
    expect(frontmatter.result).toBe("3 years of battery life.");
  });

  it("returns an empty frontmatter object for content without delimiters", () => {
    const { frontmatter, body } = parseProjectMarkdown("just plain text");
    expect(frontmatter).toEqual({});
    expect(body).toBe("just plain text");
  });
});
