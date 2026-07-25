import { describe, expect, it } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("lowercases and keeps simple ascii titles as-is", () => {
    expect(slugify("Signal-Master")).toBe("signal-master");
    expect(slugify("PoolControl")).toBe("poolcontrol");
  });

  it("collapses spaces and punctuation into single hyphens", () => {
    expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("transliterates cyrillic characters", () => {
    expect(slugify("Привет мир")).toBe("privet-mir");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("--test--")).toBe("test");
  });
});
