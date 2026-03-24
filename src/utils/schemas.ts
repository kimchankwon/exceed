import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

// Member form data schema
export const memberFormSchema = yup.object({
  name: yup
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
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

// Contact form schema
export const contactFormSchema = yup.object({
  firstName: yup.string().min(1, "Required").max(100, "Max 100 characters"),
  lastName: yup.string().min(1, "Required").max(100, "Max 100 characters"),
  phone: yup
    .string()
    .required("Required")
    .test("is-valid-phone", "Invalid phone number", (value) =>
      value ? isValidPhoneNumber(value) : false
    ),
  email: yup.string().email("Invalid email").required("Required"),
  message: yup.string().min(1, "Required").max(2000, "Max 2000 characters"),
});

// Enrollment form schemas
export const enrollmentGuardianSchema = yup.object({
  firstName: yup.string().required("Required").max(100, "Max 100 characters"),
  lastName: yup.string().required("Required").max(100, "Max 100 characters"),
  phone: yup
    .string()
    .required("Required")
    .test("is-valid-phone", "Invalid phone number", (value) =>
      value ? isValidPhoneNumber(value) : false
    ),
  email: yup.string().email("Invalid email").required("Required"),
});

export const enrollmentStudentSchema = yup.object({
  studentFirstName: yup.string().required("Required").max(100, "Max 100 characters"),
  studentLastName: yup.string().required("Required").max(100, "Max 100 characters"),
  yearGroup: yup.string().required("Required"),
  subject: yup.string().required("Required"),
  additionalNotes: yup.string().max(2000, "Max 2000 characters"),
});

export const enrollmentFormSchema = enrollmentGuardianSchema.concat(enrollmentStudentSchema);

// Export types
export type MemberFormData = yup.InferType<typeof memberFormSchema>;
export type CreateMemberRequest = yup.InferType<typeof createMemberRequestSchema>;
export type ContactFormData = yup.InferType<typeof contactFormSchema>;
export type ErrorResponse = yup.InferType<typeof errorResponseSchema>;
export type EnrollmentFormData = yup.InferType<typeof enrollmentFormSchema>;
