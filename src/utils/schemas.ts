import * as yup from "yup";

// Member form data schema
export const memberFormSchema = yup.object({
  name: yup
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// API request schema
export const createMemberRequestSchema = memberFormSchema;

// API response schemas

export const errorResponseSchema = yup.object({
  error: yup.string().required(),
  details: yup.string().optional(),
  message: yup.string().optional(),
});

// Fibery entity response schema

// Export types
export type MemberFormData = yup.InferType<typeof memberFormSchema>;
export type CreateMemberRequest = yup.InferType<
  typeof createMemberRequestSchema
>;
export type ErrorResponse = yup.InferType<typeof errorResponseSchema>;
