export interface GithubRepoImport {
  title: string;
  summary: string;
  tags: string[];
  githubUrl: string;
}

interface GithubRepoResponse {
  name: string;
  description: string | null;
  topics?: string[];
  html_url: string;
}

export function parseRepoResponse(json: GithubRepoResponse): GithubRepoImport {
  return {
    title: json.name,
    summary: json.description ?? "",
    tags: Array.isArray(json.topics) ? json.topics : [],
    githubUrl: json.html_url,
  };
}

interface GithubContentResponse {
  content: string;
  encoding: string;
  sha: string;
}

export function decodeBase64Content(
  json: Pick<GithubContentResponse, "content" | "encoding">,
): string {
  if (json.encoding !== "base64") return json.content;

  const binary = atob(json.content.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export function encodeBase64Content(text: string): string {
  const bytes = new TextEncoder().encode(text);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    "",
  );
  return btoa(binary);
}

export interface GithubApiError {
  message: string;
  status: number;
}

export function parseApiError(
  status: number,
  json: { message?: string },
): GithubApiError {
  return {
    status,
    message: json.message ?? `GitHub API error (${status})`,
  };
}
