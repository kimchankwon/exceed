import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { memberFormSchema, type MemberFormData } from "../utils/schemas";

interface MemberFormProps {
  onSubmit?: (data: MemberFormData) => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    values: MemberFormData,
    { setSubmitting, resetForm }: any
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create member in Fibery Members database
      const response = await fetch("/api/create-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccess(true);

      // Reset form
      resetForm();

      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(values);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the member"
      );
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">
          Create New Member
        </h2>

        {success && (
          <div className="alert alert-success mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Member created successfully!</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <Formik
          initialValues={{ name: "", email: "" }}
          validationSchema={memberFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-4">
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text">Name *</span>
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="input input-bordered w-full"
                  placeholder="Enter member's full name"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email *</span>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="Enter member's email address"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              <div className="card-actions justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="btn btn-primary flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Member"
                  )}
                </button>

                {success && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-outline"
                  >
                    New Member
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MemberForm;
