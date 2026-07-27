import { describe, expect, it } from "vitest";
import { catLabel } from "./categories";

describe("catLabel", () => {
  it("resolves known category keys to Russian labels", () => {
    expect(catLabel("iot")).toBe("IoT");
    expect(catLabel("firmware")).toBe("Прошивки");
  });

  it("falls back to a generic label when category is missing", () => {
    expect(catLabel(undefined)).toBe("Проект");
  });

  it("falls back to the raw key for an unknown category", () => {
    expect(catLabel("mystery")).toBe("mystery");
  });
});
