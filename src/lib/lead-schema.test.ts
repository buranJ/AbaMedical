import { describe, expect, it } from "vitest";
import { leadSchema } from "./lead-schema";

describe("leadSchema", () => {
  it("accepts a valid consultation request", () => expect(leadSchema.safeParse({ name: "Айбек", phone: "+996555291291", email: "", consent: true, website: "" }).success).toBe(true));
  it("rejects a bot honeypot", () => expect(leadSchema.safeParse({ name: "Bot", phone: "1234567", email: "", consent: true, website: "spam" }).success).toBe(false));
});
