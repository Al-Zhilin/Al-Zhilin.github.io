import { describe, expect, it } from "vitest";
import {
  dataUrlToBase64,
  decodeBase64Content,
  encodeBase64Content,
  parseApiError,
  parseRepoResponse,
} from "./github-api";

describe("parseRepoResponse", () => {
  it("extracts title, summary, tags and githubUrl from a repo response", () => {
    const result = parseRepoResponse({
      name: "signal-master",
      description: "Remote instrument control",
      topics: ["fastapi", "pyvisa"],
      html_url: "https://github.com/Al-Zhilin/signal-master",
    });

    expect(result).toEqual({
      title: "signal-master",
      summary: "Remote instrument control",
      tags: ["fastapi", "pyvisa"],
      githubUrl: "https://github.com/Al-Zhilin/signal-master",
    });
  });

  it("falls back to empty values when description/topics are missing", () => {
    const result = parseRepoResponse({
      name: "no-description",
      description: null,
      html_url: "https://github.com/Al-Zhilin/no-description",
    });

    expect(result.summary).toBe("");
    expect(result.tags).toEqual([]);
  });
});

describe("base64 content round-trip", () => {
  it("decodes base64-encoded GitHub content responses", () => {
    const original = "Hello, мир!";
    const encoded = encodeBase64Content(original);
    const decoded = decodeBase64Content({
      content: encoded,
      encoding: "base64",
    });
    expect(decoded).toBe(original);
  });

  it("passes through content unchanged when encoding is not base64", () => {
    const decoded = decodeBase64Content({
      content: "plain text",
      encoding: "utf-8",
    });
    expect(decoded).toBe("plain text");
  });
});

describe("dataUrlToBase64", () => {
  it("strips the data URL header, keeping only the base64 payload", () => {
    expect(dataUrlToBase64("data:image/png;base64,AAAA==")).toBe("AAAA==");
  });

  it("throws when the URL is not base64-encoded", () => {
    expect(() => dataUrlToBase64("data:text/plain,hello")).toThrow();
  });

  it("throws when there is no comma separating header and payload", () => {
    expect(() => dataUrlToBase64("not-a-data-url")).toThrow();
  });
});

describe("parseApiError", () => {
  it("uses the message from the response body when present", () => {
    expect(parseApiError(404, { message: "Not Found" })).toEqual({
      status: 404,
      message: "Not Found",
    });
  });

  it("falls back to a generic message when the body has no message", () => {
    expect(parseApiError(500, {})).toEqual({
      status: 500,
      message: "GitHub API error (500)",
    });
  });
});
