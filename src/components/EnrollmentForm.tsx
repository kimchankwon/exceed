import * as React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-number-input";
import { enrollmentFormSchema, type EnrollmentFormData } from "../utils/schemas";
import "react-phone-number-input/style.css";

const STEPS = [
  { label: "STEP 1: GUARDIAN DETAILS" },
  { label: "STEP 2: STUDENT DETAILS" },
  { label: "STEP 3: CONFIRMATION" },
];

const GUARDIAN_FIELDS = ["firstName", "lastName", "phone", "email"] as const;
const STUDENT_FIELDS = ["studentFirstName", "studentLastName", "yearGroup", "subject"] as const;

interface EnrollmentFormProps {
  collapsedText?: string;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  collapsedText = "READY TO BEGIN? ENROL NOW.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const initialValues: EnrollmentFormData & { website: string } = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    studentFirstName: "",
    studentLastName: "",
    yearGroup: "",
    subject: "",
    additionalNotes: "",
    website: "",
  };

  const handleNext = async (
    validateForm: () => Promise<Record<string, string>>,
    setTouched: (touched: Record<string, boolean>, shouldValidate?: boolean) => void,
    touched: Record<string, boolean>
  ) => {
    const fieldsForStep = currentStep === 0 ? GUARDIAN_FIELDS : STUDENT_FIELDS;
    const touchMap = Object.fromEntries(fieldsForStep.map((f) => [f, true]));
    setTouched({ ...touched, ...touchMap });

    const errors = await validateForm();
    const hasStepErrors = fieldsForStep.some((f) => f in errors);
    if (!hasStepErrors) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (
    values: EnrollmentFormData & { website: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    // Honeypot check
    if (values.website) return;

    const { website: _, ...formData } = values;
    console.log("Enrollment form submitted:", formData);
    setSubmitSuccess(true);
    resetForm();
    setCurrentStep(0);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div data-header-theme="dark" className="mx-12">
      {/* Collapsed Title Bar */}
      <div
        className="bg-ink flex cursor-pointer items-center justify-between px-12 py-8"
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
      >
        <h2 className="text-h5 font-extrabold text-white uppercase">{collapsedText}</h2>
        <svg
          className={`h-6 w-6 text-white transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </div>

      {/* Expanded Form Content */}
      {isOpen && (
        <div className="bg-secondary px-8 py-12 sm:mx-12">
          {/* Step Tabs */}
          <div className="mb-10 flex gap-8 border-b border-gray-300">
            {STEPS.map((step, i) => (
              <button
                key={i}
                className={`pb-4 text-sm font-extrabold uppercase transition-colors ${
                  currentStep === i
                    ? "border-primary border-b-2 text-black"
                    : "text-black/40 hover:text-black/60"
                }`}
                onClick={() => {
                  if (i < currentStep) setCurrentStep(i);
                }}
                type="button"
              >
                {step.label}
              </button>
            ))}
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={enrollmentFormSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              setFieldValue,
              setFieldTouched,
              validateForm,
              setTouched,
              touched,
              isSubmitting,
            }) => (
              <Form>
                {/* Honeypot */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <Field type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  {/* Left Column - Description */}
                  <div>
                    {currentStep === 0 && (
                      <>
                        <p className="text-body-lg max-w-md font-light">
                          Moretus morbi et augue res, in Ut ullamcorper at. Condimentum at nunc in
                          eros ullamcorper sed. Moretus morbi et augue res, in Ut ullamcorper at.
                          Condimentum at nunc in eros ullamcorper sed.
                        </p>
                        <p className="text-body mt-6 font-medium">
                          Disclaimer about fast track pricing.
                        </p>
                      </>
                    )}
                    {currentStep === 1 && (
                      <p className="text-body-lg max-w-md font-light">
                        Please provide the student&apos;s details below so we can match them with
                        the right class and tutor.
                      </p>
                    )}
                    {currentStep === 2 && (
                      <p className="text-body-lg max-w-md font-light">
                        Please review the details below before submitting your enrollment request.
                      </p>
                    )}
                  </div>

                  {/* Right Column - Form Fields */}
                  <div>
                    {/* Step 0: Guardian Details */}
                    {currentStep === 0 && (
                      <>
                        <div className="mb-10 grid grid-cols-2 gap-4">
                          <div>
                            <div className="mb-2 flex items-center gap-3">
                              <p>First Name</p>
                              <ErrorMessage
                                name="firstName"
                                component="span"
                                className="text-error"
                              />
                            </div>
                            <Field
                              name="firstName"
                              placeholder="Placeholder"
                              className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                            />
                          </div>
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <p>Last Name</p>
                              <ErrorMessage
                                name="lastName"
                                component="span"
                                className="text-error"
                              />
                            </div>
                            <Field
                              name="lastName"
                              placeholder="Placeholder"
                              className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="mb-10">
                          <div className="mb-2 flex items-center gap-2">
                            <p>Phone Number</p>
                            <ErrorMessage name="phone" component="span" className="text-error" />
                          </div>
                          <PhoneInput
                            international
                            defaultCountry="AU"
                            countrySelectProps={{ tabIndex: -1 }}
                            value={values.phone}
                            onChange={(value) => {
                              void setFieldValue("phone", value || "");
                            }}
                            onBlur={() => {
                              void setFieldTouched("phone", true);
                            }}
                            onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                              const len = e.target.value.length;
                              e.target.setSelectionRange(len, len);
                            }}
                            className="phone-input w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                          />
                        </div>
                        <div className="mb-10">
                          <div className="mb-2 flex items-center gap-2">
                            <p>Email</p>
                            <ErrorMessage name="email" component="span" className="text-error" />
                          </div>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Placeholder"
                            className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* Step 1: Student Details */}
                    {currentStep === 1 && (
                      <>
                        <div className="mb-10 grid grid-cols-2 gap-4">
                          <div>
                            <div className="mb-2 flex items-center gap-3">
                              <p>Student First Name</p>
                              <ErrorMessage
                                name="studentFirstName"
                                component="span"
                                className="text-error"
                              />
                            </div>
                            <Field
                              name="studentFirstName"
                              placeholder="First name"
                              className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                            />
                          </div>
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <p>Student Last Name</p>
                              <ErrorMessage
                                name="studentLastName"
                                component="span"
                                className="text-error"
                              />
                            </div>
                            <Field
                              name="studentLastName"
                              placeholder="Last name"
                              className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="mb-10">
                          <div className="mb-2 flex items-center gap-2">
                            <p>Year Group</p>
                            <ErrorMessage
                              name="yearGroup"
                              component="span"
                              className="text-error"
                            />
                          </div>
                          <Field
                            as="select"
                            name="yearGroup"
                            className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                          >
                            <option value="">Select year group</option>
                            {[7, 8, 9, 10, 11, 12].map((y) => (
                              <option key={y} value={String(y)}>
                                Year {y}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="mb-10">
                          <div className="mb-2 flex items-center gap-2">
                            <p>Subject</p>
                            <ErrorMessage name="subject" component="span" className="text-error" />
                          </div>
                          <Field
                            as="select"
                            name="subject"
                            className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                          >
                            <option value="">Select subject</option>
                            <option value="english">English</option>
                            <option value="maths">Maths</option>
                          </Field>
                        </div>
                        <div className="mb-10">
                          <div className="mb-2 flex items-center gap-2">
                            <p>Additional Notes</p>
                            <ErrorMessage
                              name="additionalNotes"
                              component="span"
                              className="text-error"
                            />
                          </div>
                          <Field
                            as="textarea"
                            name="additionalNotes"
                            rows={4}
                            placeholder="Any additional information..."
                            className="w-full resize-none rounded-md bg-gray-100 p-3 focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* Step 2: Confirmation */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-body mb-4 font-extrabold uppercase">
                            Guardian Details
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">First Name</p>
                              <p className="font-medium">{values.firstName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Name</p>
                              <p className="font-medium">{values.lastName}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{values.phone}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{values.email}</p>
                          </div>
                        </div>
                        <div className="border-t border-gray-300 pt-6">
                          <h4 className="text-body mb-4 font-extrabold uppercase">
                            Student Details
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Student First Name</p>
                              <p className="font-medium">{values.studentFirstName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Student Last Name</p>
                              <p className="font-medium">{values.studentLastName}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Year Group</p>
                            <p className="font-medium">
                              {values.yearGroup ? `Year ${values.yearGroup}` : "—"}
                            </p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Subject</p>
                            <p className="font-medium capitalize">{values.subject || "—"}</p>
                          </div>
                          {values.additionalNotes && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-500">Additional Notes</p>
                              <p className="font-medium">{values.additionalNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4">
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep((prev) => prev - 1)}
                          className="btn rounded-full border border-gray-300 bg-white font-light uppercase"
                        >
                          Back
                        </button>
                      )}
                      {currentStep < 2 && (
                        <button
                          type="button"
                          onClick={() => handleNext(validateForm, setTouched, touched)}
                          className="btn btn-secondary rounded-full font-light text-white"
                        >
                          NEXT
                        </button>
                      )}
                      {currentStep === 2 && (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`btn btn-secondary rounded-full font-light text-white ${isSubmitting ? "bg-gray-400" : ""}`}
                        >
                          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                        </button>
                      )}
                      {submitSuccess && (
                        <p className="text-success">Enrollment submitted successfully!</p>
                      )}
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default EnrollmentForm;
