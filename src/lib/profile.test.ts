import { describe, expect, it } from "vitest";
import {
  bioParagraphsToText,
  bioTextToParagraphs,
  serializeProfile,
  type ProfileData,
} from "./profile";

describe("bio paragraph helpers", () => {
  it("splits textarea content into paragraphs on blank lines", () => {
    const text = "First paragraph.\n\nSecond paragraph.\n\n\nThird paragraph.";
    expect(bioTextToParagraphs(text)).toEqual([
      "First paragraph.",
      "Second paragraph.",
      "Third paragraph.",
    ]);
  });

  it("joins paragraphs back into textarea text with blank lines", () => {
    expect(bioParagraphsToText(["One.", "Two."])).toBe("One.\n\nTwo.");
  });

  it("round-trips through both directions", () => {
    const paragraphs = ["Para one.", "Para two.", "Para three."];
    expect(bioTextToParagraphs(bioParagraphsToText(paragraphs))).toEqual(
      paragraphs,
    );
  });
});

describe("serializeProfile", () => {
  it("produces valid, parseable JSON with a trailing newline", () => {
    const data: ProfileData = {
      name: "Test",
      role: "Role",
      resumeUrl: "/resume.pdf",
      hero: {
        eyebrow: "Eyebrow",
        titleA: "First",
        titleB: " Last",
        sub: "Sub.",
      },
      about: {
        eyebrow: "Eyebrow",
        title: "Title",
        lead: "Lead.",
        p2: "P2.",
        p3: "P3.",
      },
      sections: {
        skills: { eyebrow: "Eyebrow", title: "Title" },
        work: { eyebrow: "Eyebrow", title: "Title" },
        exp: { eyebrow: "Eyebrow", title: "Title" },
        resume: {
          eyebrow: "Eyebrow",
          title: "Title",
          sub: "Sub.",
          download: "Download",
          contact: "Contact",
        },
        contact: { eyebrow: "Eyebrow", title: "Title" },
      },
      contacts: [
        { id: "c_email", label: "Email", value: "a@b.com", icon: "mail" },
      ],
    };
    const serialized = serializeProfile(data);
    expect(serialized.endsWith("\n")).toBe(true);
    expect(JSON.parse(serialized)).toEqual(data);
  });
});
