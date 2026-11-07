// Browser-only structural inspection. This is NOT the Python ML classifier.
// No network requests, URL visits, attachment execution, or reputation queries.
export type Inspection = {
  senderDomain: string;
  urls: string[];
  phrases: string[];
  warnings: string[];
  wordCount: number;
};

const warningTerms = ["verify your account", "urgent action", "act now", "password reset", "confirm your identity", "click here", "limited time", "bank account", "payment failed"];

export function inspectEmail(sender: string, subject: string, body: string): Inspection {
  const text = `${subject}\n${body}`;
  const lower = text.toLowerCase();
  const matches = text.match(/https?:\/\/[^\s<>"']+/gi) ?? [];
  const urls = [...new Set(matches.map((url) => url.replace(/[),.;!?]+$/, "")))].slice(0, 30);
  const phrases = warningTerms.filter((phrase) => lower.includes(phrase));
  const senderDomain = sender.trim().match(/@([a-z0-9.-]+)/i)?.[1]?.toLowerCase() ?? "Not available";
  const warnings: string[] = [];

  if (urls.some((url) => url.toLowerCase().startsWith("http://"))) warnings.push("An unencrypted HTTP link appears in the message.");
  if (urls.some((url) => { try { return /^\d{1,3}(\.\d{1,3}){3}$/.test(new URL(url).hostname); } catch { return false; } })) warnings.push("A link contains an IPv4-style host.");
  if (phrases.length >= 2) warnings.push("Multiple account-pressure or urgency phrases were detected.");
  if (senderDomain === "Not available") warnings.push("Sender address could not be parsed from the supplied value.");

  return { senderDomain, urls, phrases, warnings, wordCount: text.trim() ? text.trim().split(/\s+/).length : 0 };
}
