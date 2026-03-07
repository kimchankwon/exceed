import { describe, it, expect, vi, afterEach } from "vitest";
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import handler from "./create-member";

function createRequest(overrides: Partial<GatsbyFunctionRequest> = {}): GatsbyFunctionRequest {
  return {
    method: "POST",
    body: { name: "Alice", email: "alice@example.com" },
    headers: { "content-type": "application/json" },
    ...overrides,
  } as unknown as GatsbyFunctionRequest;
}

function createResponse() {
  const res = {
    statusCode: null as number | null,
    body: undefined as unknown,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(data: unknown) {
      res.body = data;
      return res;
    },
    send(data: unknown) {
      res.body = data;
      return res;
    },
  };
  return res as typeof res & GatsbyFunctionResponse;
}

function mockFetch(status: number, body: unknown, ok = status >= 200 && status < 300) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(typeof body === "string" ? body : JSON.stringify(body)),
  });
}

describe("POST /api/create-member", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("method guard", () => {
    it("returns 405 for GET requests", async () => {
      const res = createResponse();
      await handler(createRequest({ method: "GET" }), res);
      expect(res.statusCode).toBe(405);
      expect((res.body as any).error).toBe("Method not allowed");
    });

    it("returns 405 for DELETE requests", async () => {
      const res = createResponse();
      await handler(createRequest({ method: "DELETE" }), res);
      expect(res.statusCode).toBe(405);
    });
  });

  describe("request body validation", () => {
    it("returns 400 when name is missing", async () => {
      const res = createResponse();
      await handler(createRequest({ body: { email: "alice@example.com" } }), res);
      expect(res.statusCode).toBe(400);
      expect((res.body as any).error).toBe("Validation failed");
    });

    it("returns 400 with details when email is invalid", async () => {
      const res = createResponse();
      await handler(createRequest({ body: { name: "Alice", email: "not-email" } }), res);
      expect(res.statusCode).toBe(400);
      expect((res.body as any).details).toContain("Please enter a valid email address");
    });

    it("returns 400 for empty body", async () => {
      const res = createResponse();
      await handler(createRequest({ body: {} }), res);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("Fibery API integration", () => {
    it("calls the Fibery API with the correct command payload", async () => {
      const fetchMock = mockFetch(200, [{ result: { id: "123" } }]);
      vi.stubGlobal("fetch", fetchMock);

      const res = createResponse();
      await handler(createRequest(), res);

      expect(fetchMock).toHaveBeenCalledOnce();
      const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("fibery.io/api/commands");
      expect(options.method).toBe("POST");
      expect(options.headers).toMatchObject({
        Authorization: expect.stringContaining("Token"),
        "Content-Type": "application/json",
      });
      const payload = JSON.parse(options.body as string) as unknown[];
      expect(payload[0]).toMatchObject({
        command: "fibery.entity/create",
        args: {
          type: "Space/Members",
          entity: { "Space/Name": "Alice", "Space/Email": "alice@example.com" },
        },
      });
    });

    it("returns 200 with member data on success", async () => {
      vi.stubGlobal("fetch", mockFetch(200, [{ result: { id: "123" } }]));
      const res = createResponse();
      await handler(createRequest(), res);
      expect(res.statusCode).toBe(200);
      expect((res.body as any).message).toBe("Member created successfully");
      expect((res.body as any).member).toEqual({ name: "Alice", email: "alice@example.com" });
    });

    it("returns Fibery's status code when Fibery responds with an error", async () => {
      vi.stubGlobal("fetch", mockFetch(422, "Unprocessable Entity", false));
      const res = createResponse();
      await handler(createRequest(), res);
      expect(res.statusCode).toBe(422);
      expect((res.body as any).error).toBe("Failed to create member in Fibery");
    });

    it("returns 500 when fetch throws a network error", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));
      const res = createResponse();
      await handler(createRequest(), res);
      expect(res.statusCode).toBe(500);
      expect((res.body as any).error).toBe("Internal server error");
      expect((res.body as any).message).toContain("ECONNREFUSED");
    });
  });
});
