import { memberFormSchema, type MemberFormData } from "./schemas";

// Client-side validation helper
export const validateMemberForm = async (
  data: unknown
): Promise<
  { success: true; data: MemberFormData } | { success: false; errors: string[] }
> => {
  try {
    const result = await memberFormSchema.validate(data, { abortEarly: false });
    return { success: true, data: result };
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = error.errors;
      return { success: false, errors };
    }
    return { success: false, errors: ["Unknown validation error"] };
  }
};

// Generic validation helper
export const validateWithSchema = async <T>(
  schema: any,
  data: unknown
): Promise<
  { success: true; data: T } | { success: false; errors: string[] }
> => {
  try {
    const result = await schema.validate(data, { abortEarly: false });
    return { success: true, data: result };
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = error.errors;
      return { success: false, errors };
    }
    return { success: false, errors: ["Unknown validation error"] };
  }
};
