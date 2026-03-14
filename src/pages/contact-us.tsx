import { graphql, type PageProps } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-number-input";
import * as React from "react";
import { useState } from "react";
import { contactFormSchema, type ContactFormData } from "../utils/schemas";
import "react-phone-number-input/style.css";

const ContactUsPage: React.FC<PageProps<Queries.ContactUsPageQueryQuery>> = ({ data }) => {
  const { contactUs } = data;
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (
    values: ContactFormData,
    { setSubmitting, resetForm }: { setSubmitting: (v: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setSubmitSuccess(true);
      resetForm();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center gap-5 px-8 pt-40 pb-28"
      >
        <h1 className="text-center text-3xl font-extrabold sm:text-5xl">{contactUs?.title}</h1>
        <p className="max-w-sm text-center text-[12px]">{contactUs?.description?.description}</p>
      </div>
      <div data-header-theme="light" className="bg-secondary px-6 py-8 sm:mx-8">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
          <div>
            <p className="max-w-xs text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et ante volutpat eros
              lobortis mollis nec vel nisi.
            </p>
          </div>
          <div>
            <Formik
              initialValues={{ firstName: "", lastName: "", phone: "", email: "", message: "", website: "" }}
              validationSchema={contactFormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, setFieldTouched, values }) => (
                <Form>
                  <div aria-hidden="true" className="absolute -left-[9999px]">
                    <Field type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <p className="text-[12px]">First Name</p>
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className="text-error text-[10px]"
                        />
                      </div>
                      <Field
                        name="firstName"
                        placeholder="John"
                        className="w-full rounded-md bg-white px-2.5 py-2 text-[12px] focus:outline-none"
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <p className="text-[12px]">Last Name</p>
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className="text-error text-[10px]"
                        />
                      </div>
                      <Field
                        name="lastName"
                        placeholder="Smith"
                        className="w-full rounded-md bg-white px-2.5 py-2 text-[12px] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="mb-1.5 flex items-center gap-2">
                      <p className="text-[12px]">Phone</p>
                      <ErrorMessage
                        name="phone"
                        component="span"
                        className="text-error text-[10px]"
                      />
                    </div>
                    <PhoneInput
                      international
                      defaultCountry="AU"
                      countrySelectProps={{ tabIndex: -1 }}
                      value={values.phone}
                      onChange={(value) => setFieldValue("phone", value || "")}
                      onBlur={() => setFieldTouched("phone", true)}
                      onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        const len = e.target.value.length;
                        e.target.setSelectionRange(len, len);
                      }}
                      className="phone-input w-full rounded-md bg-white px-2.5 py-2 text-[12px] focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="mb-1.5 flex items-center gap-2">
                      <p className="text-[12px]">Email *</p>
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-error text-[10px]"
                      />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="john.smith@email.com"
                      className="w-full rounded-md bg-white px-2.5 py-2 text-[12px] focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="mb-1.5 flex items-center gap-2">
                      <p className="text-[12px]">Message</p>
                      <ErrorMessage
                        name="message"
                        component="span"
                        className="text-error text-[10px]"
                      />
                    </div>
                    <Field
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Your message..."
                      className="w-full resize-none rounded-md bg-white px-2.5 py-2 text-[12px] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-secondary btn-sm rounded-full font-light text-white ${isSubmitting ? "bg-gray-400" : "bg-black"}`}
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </button>
                    {submitError && <p className="text-error text-[12px]">{submitError}</p>}
                    {submitSuccess && (
                      <p className="text-success text-[12px]">
                        Submitted. We will contact you soon.
                      </p>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

export const contactUsPageQuery = graphql`
  query ContactUsPageQuery {
    contactUs: contentfulContentCard(title: { eq: "CONTACT US" }) {
      title
      description {
        description
      }
    }
  }
`;
