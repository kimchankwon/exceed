import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import * as yup from "yup";
import { contactFormSchema, type ContactFormData, type ErrorResponse } from "../utils/schemas";

export default async function API(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  if (req.method !== "POST") {
    const errorResponse: ErrorResponse = {
      error: "Method not allowed",
      details: "Only POST requests are supported",
    };
    return res.status(405).json(errorResponse);
  }

  try {
    if (req.body.website) {
      return res.status(200).json({ message: "Contact form submitted successfully" });
    }

    const validationResult = await contactFormSchema.validate(req.body, {
      abortEarly: false,
    });

    const { firstName, lastName, phone, email, message }: ContactFormData = validationResult;

    const fiberyBaseUrl = `https://${process.env.FIBERY_WORKSPACE}.fibery.io`;
    const fiberyHeaders = {
      Authorization: `Token ${process.env.FIBERY_TOKEN}`,
      "Content-Type": "application/json",
    };

    const fiberyResponse = await fetch(`${fiberyBaseUrl}/api/commands`, {
      method: "POST",
      headers: fiberyHeaders,
      body: JSON.stringify([
        {
          command: "fibery.entity/create",
          args: {
            type: "Contacts/Contacts",
            entity: {
              "Contacts/First Name": firstName,
              "Contacts/Last Name": lastName,
              "Contacts/Phone": phone,
              "Contacts/Email": email,
              "Contacts/Message": message,
            },
          },
        },
      ]),
    });

    const fiberyData = await fiberyResponse.json();
    console.log("Fibery API response:", JSON.stringify(fiberyData, null, 2));

    if (!fiberyResponse.ok || (Array.isArray(fiberyData) && fiberyData[0]?.success === false)) {
      console.error("Fibery API error:", fiberyData);
      const errorResponse: ErrorResponse = {
        error: "Failed to create contact in Fibery",
        details: JSON.stringify(fiberyData),
      };
      return res.status(500).json(errorResponse);
    }

    return res.status(200).json({
      message: "Contact form submitted successfully",
      contact: { firstName, lastName, email },
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);

    if (error instanceof yup.ValidationError) {
      const errorResponse: ErrorResponse = {
        error: "Validation failed",
        details: error.errors.join(", "),
      };
      return res.status(400).json(errorResponse);
    }

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };

    return res.status(500).json(errorResponse);
  }
}
