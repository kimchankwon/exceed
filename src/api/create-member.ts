import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import * as yup from "yup";
import {
  createMemberRequestSchema,
  type CreateMemberRequest,
  type ErrorResponse,
} from "../utils/schemas";

export default async function API(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    const errorResponse: ErrorResponse = {
      error: "Method not allowed",
      details: "Only POST requests are supported",
    };
    return res.status(405).json(errorResponse);
  }

  try {
    // Parse and validate the request body using Yup
    const validationResult = await createMemberRequestSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    const { name, email }: CreateMemberRequest = validationResult;

    // Make a fetch call to Fibery's /api/commands endpoint to create a new entity
    const fiberyResponse = await fetch(
      `https://${process.env.FIBERY_WORKSPACE}.fibery.io/api/commands`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.FIBERY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            command: "fibery.entity/create",
            args: {
              type: "Space/Members",
              entity: {
                "Space/Name": name,
                "Space/Email": email,
              },
            },
          },
        ]),
      }
    );

    if (!fiberyResponse.ok) {
      const errorData = await fiberyResponse.text();
      console.error("Fibery API error:", errorData);

      const errorResponse: ErrorResponse = {
        error: "Failed to create member in Fibery",
        details: errorData,
      };
      return res.status(fiberyResponse.status).json(errorResponse);
    }

    const successResponse = {
      message: "Member created successfully",
      member: { name, email },
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.error("Error creating member:", error);

    // Handle Yup validation errors
    if (error instanceof yup.ValidationError) {
      const errorResponse: ErrorResponse = {
        error: "Validation failed",
        details: error.errors.join(", "),
      };
      return res.status(400).json(errorResponse);
    }

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };

    return res.status(500).json(errorResponse);
  }
}
