import { describe, expect, it } from "vitest";
import {
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
