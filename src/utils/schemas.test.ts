import { describe, it, expect } from "vitest";
import { memberFormSchema, createMemberRequestSchema, errorResponseSchema } from "./schemas";
import type { MemberFormData } from "./schemas";

const validData: MemberFormData = { name: "Jane Doe", email: "jane@example.com" };

describe("memberFormSchema", () => {
  it("accepts valid name and email", async () => {
    const result = await memberFormSchema.validate(validData);
    expect(result).toEqual(validData);
  });

  describe("name field", () => {
    it("rejects empty string with 'Name is required'", async () => {
      await expect(memberFormSchema.validate({ ...validData, name: "" })).rejects.toThrow(
        "Name is required"
      );
    });

    it("rejects missing name with 'Name is required'", async () => {
      await expect(memberFormSchema.validate({ email: "jane@example.com" })).rejects.toThrow(
        "Name is required"
      );
    });

    it("rejects name longer than 100 characters", async () => {
      await expect(
        memberFormSchema.validate({ ...validData, name: "a".repeat(101) })
      ).rejects.toThrow("Name must be less than 100 characters");
    });

    it("accepts name exactly 100 characters", async () => {
      const result = await memberFormSchema.validate({ ...validData, name: "a".repeat(100) });
      expect(result.name).toHaveLength(100);
    });

    it("accepts name with 1 character", async () => {
      const result = await memberFormSchema.validate({ ...validData, name: "A" });
      expect(result.name).toBe("A");
    });
  });

  describe("email field", () => {
    it("rejects missing email with 'Email is required'", async () => {
      await expect(memberFormSchema.validate({ name: "Jane" })).rejects.toThrow(
        "Email is required"
      );
    });

    it("rejects invalid email format", async () => {
      await expect(
        memberFormSchema.validate({ ...validData, email: "not-an-email" })
      ).rejects.toThrow("Please enter a valid email address");
    });

    it("rejects email without domain", async () => {
      await expect(memberFormSchema.validate({ ...validData, email: "user@" })).rejects.toThrow(
        "Please enter a valid email address"
      );
    });

    it("accepts valid email formats", async () => {
      for (const email of ["user@example.com", "user+tag@sub.domain.org", "a@b.co"]) {
        const result = await memberFormSchema.validate({ ...validData, email });
        expect(result.email).toBe(email);
      }
    });
  });

  it("collects multiple errors when abortEarly is false", async () => {
    try {
      await memberFormSchema.validate({ name: "", email: "bad" }, { abortEarly: false });
      expect.fail("Should have thrown");
    } catch (err: any) {
      expect(err.name).toBe("ValidationError");
      expect(err.errors.length).toBeGreaterThanOrEqual(2);
      expect(err.errors).toContain("Name is required");
    }
  });
});

describe("createMemberRequestSchema", () => {
  it("is the same schema reference as memberFormSchema", () => {
    expect(createMemberRequestSchema).toBe(memberFormSchema);
  });
});

describe("errorResponseSchema", () => {
  it("accepts object with only the required error field", async () => {
    const result = await errorResponseSchema.validate({ error: "Something went wrong" });
    expect(result.error).toBe("Something went wrong");
  });

  it("accepts object with all optional fields", async () => {
    const data = { error: "Validation failed", details: "name is required", message: "Retry" };
    const result = await errorResponseSchema.validate(data);
    expect(result).toEqual(data);
  });

  it("rejects object missing the error field", async () => {
    await expect(errorResponseSchema.validate({ details: "oops" })).rejects.toThrow();
  });
});
