import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, afterEach } from "vitest";
import MemberForm from "./MemberForm";

function mockFetch(status: number, body: Record<string, unknown>) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  });
}

describe("MemberForm", () => {
  const user = userEvent.setup();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("rendering", () => {
    it("renders name field, email field, and submit button", () => {
      render(<MemberForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /create member/i })).toBeInTheDocument();
    });

    it("submit button is disabled when the form is pristine", () => {
      render(<MemberForm />);
      expect(screen.getByRole("button", { name: /create member/i })).toBeDisabled();
    });

    it("does not show success or error alerts on initial render", () => {
      render(<MemberForm />);
      expect(screen.queryByText(/member created successfully/i)).not.toBeInTheDocument();
    });
  });

  describe("validation", () => {
    it("enables submit button once both fields are valid", async () => {
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /create member/i })).not.toBeDisabled();
      });
    });

    it("shows email validation error after invalid input and blur", async () => {
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/email/i), "notvalid");
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it("keeps submit button disabled when name is empty", async () => {
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /create member/i })).toBeDisabled();
      });
    });
  });

  describe("successful submission", () => {
    it("calls fetch with correct URL, method, and body", async () => {
      vi.stubGlobal("fetch", mockFetch(200, { message: "Member created successfully" }));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/create-member", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Alice", email: "alice@example.com" }),
        });
      });
    });

    it("shows success alert after successful submission", async () => {
      vi.stubGlobal("fetch", mockFetch(200, { message: "Member created successfully" }));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(screen.getByText(/member created successfully!/i)).toBeInTheDocument();
      });
    });

    it("clears form fields after successful submission", async () => {
      vi.stubGlobal("fetch", mockFetch(200, { message: "Member created successfully" }));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).toHaveValue("");
        expect(screen.getByLabelText(/email/i)).toHaveValue("");
      });
    });

    it("shows 'New Member' button after success", async () => {
      vi.stubGlobal("fetch", mockFetch(200, { message: "Member created successfully" }));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /new member/i })).toBeInTheDocument();
      });
    });

    it("clears success state when 'New Member' is clicked", async () => {
      vi.stubGlobal("fetch", mockFetch(200, { message: "Member created successfully" }));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));
      await waitFor(() => screen.getByRole("button", { name: /new member/i }));
      await user.click(screen.getByRole("button", { name: /new member/i }));

      await waitFor(() => {
        expect(screen.queryByText(/member created successfully/i)).not.toBeInTheDocument();
      });
    });

    it("calls onSubmit prop with form values on success", async () => {
      vi.stubGlobal("fetch", mockFetch(200, { message: "Member created successfully" }));
      const onSubmit = vi.fn();
      render(<MemberForm onSubmit={onSubmit} />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ name: "Alice", email: "alice@example.com" });
      });
    });
  });

  describe("failed submission", () => {
    it("shows error message when API returns non-ok response", async () => {
      vi.stubGlobal("fetch", mockFetch(500, { error: "Internal server error" }));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(screen.getByText(/internal server error/i)).toBeInTheDocument();
      });
    });

    it("shows error message when fetch throws a network error", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });

    it("shows fallback error when response body has no error key", async () => {
      vi.stubGlobal("fetch", mockFetch(400, {}));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(screen.getByText(/http error! status: 400/i)).toBeInTheDocument();
      });
    });

    it("does not show success alert when submission fails", async () => {
      vi.stubGlobal("fetch", mockFetch(500, { error: "Server error" }));
      render(<MemberForm />);
      await user.type(screen.getByLabelText(/name/i), "Alice");
      await user.type(screen.getByLabelText(/email/i), "alice@example.com");
      await user.click(screen.getByRole("button", { name: /create member/i }));

      await waitFor(() => {
        expect(screen.queryByText(/member created successfully/i)).not.toBeInTheDocument();
      });
    });
  });
});
