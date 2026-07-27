import { describe, expect, it } from "vitest";
import { tagsArrayToText, tagsTextToArray } from "./tags";

describe("tagsTextToArray", () => {
  it("splits a comma-separated string, trimming whitespace", () => {
    expect(tagsTextToArray("STM32, BLE ,  C")).toEqual(["STM32", "BLE", "C"]);
  });

  it("drops empty entries from stray commas", () => {
    expect(tagsTextToArray("STM32,, BLE,")).toEqual(["STM32", "BLE"]);
  });

  it("returns an empty array for blank input", () => {
    expect(tagsTextToArray("")).toEqual([]);
  });
});

describe("tagsArrayToText", () => {
  it("joins tags with a comma and space", () => {
    expect(tagsArrayToText(["STM32", "BLE", "C"])).toBe("STM32, BLE, C");
  });

  it("round-trips through both directions", () => {
    const tags = ["ESP32", "FreeRTOS"];
    expect(tagsTextToArray(tagsArrayToText(tags))).toEqual(tags);
  });
});
