import { describe, it, expect } from "vitest";
import { validateMemberForm, validateWithSchema } from "./validation";
import { memberFormSchema, errorResponseSchema } from "./schemas";

describe("validateMemberForm", () => {
  it("returns success with typed data for valid input", async () => {
    const result = await validateMemberForm({ name: "Alice", email: "alice@example.com" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ name: "Alice", email: "alice@example.com" });
    }
  });

  it("returns failure with error array for invalid email", async () => {
    const result = await validateMemberForm({ name: "Alice", email: "not-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toContain("Please enter a valid email address");
    }
  });

  it("collects multiple errors for empty object", async () => {
    const result = await validateMemberForm({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("returns failure for null input", async () => {
    const result = await validateMemberForm(null);
    expect(result.success).toBe(false);
  });
});

describe("validateWithSchema", () => {
  it("validates successfully with memberFormSchema", async () => {
    const input = { name: "Bob", email: "bob@example.com" };
    const result = await validateWithSchema(memberFormSchema, input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(input);
    }
  });

  it("validates successfully with errorResponseSchema", async () => {
    const input = { error: "test error", details: "some detail" };
    const result = await validateWithSchema(errorResponseSchema, input);
    expect(result.success).toBe(true);
  });

  it("returns failure for data that violates the schema", async () => {
    const result = await validateWithSchema(memberFormSchema, {
      name: "x".repeat(200),
      email: "invalid",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toBeInstanceOf(Array);
    }
  });

  it("returns ['Unknown validation error'] when schema throws a non-ValidationError", async () => {
    const brokenSchema = {
      validate: () => Promise.reject(new Error("Unexpected error")),
    };
    const result = await validateWithSchema(brokenSchema, {});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toEqual(["Unknown validation error"]);
    }
  });
});
