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
        className="flex flex-col items-center justify-center gap-8 px-12 pt-52 pb-28"
      >
        <h1 className="sm:text-display text-h3 leading-none font-extrabold uppercase">
          {contactUs?.title}
        </h1>
        <p className="text-body max-w-md text-center tracking-wide">
          {contactUs?.description?.description}
        </p>
      </div>
      <div data-header-theme="light" className="bg-secondary px-8 py-12 sm:mx-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <p className="text-body-lg max-w-md font-light tracking-widest">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et ante volutpat eros
              lobortis mollis nec vel nisi.
            </p>
          </div>
          <div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                message: "",
                website: "",
              }}
              validationSchema={contactFormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, setFieldTouched, values }) => (
                <Form>
                  <div aria-hidden="true" className="absolute -left-[9999px]">
                    <Field type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="mb-10 grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <p>First Name</p>
                        <ErrorMessage name="firstName" component="span" className="text-error" />
                      </div>
                      <Field
                        name="firstName"
                        placeholder="John"
                        className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                      />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <p>Last Name</p>
                        <ErrorMessage name="lastName" component="span" className="text-error" />
                      </div>
                      <Field
                        name="lastName"
                        placeholder="Smith"
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
                      className="phone-input w-full rounded-md bg-gray-100 p-3 text-base focus:outline-none"
                    />
                  </div>
                  <div className="mb-10">
                    <div className="mb-2 flex items-center gap-2">
                      <p>Email *</p>
                      <ErrorMessage name="email" component="span" className="text-error" />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="john.smith@email.com"
                      className="w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                    />
                  </div>
                  <div className="mb-10">
                    <div className="mb-2 flex items-center gap-2">
                      <p>Message</p>
                      <ErrorMessage name="message" component="span" className="text-error" />
                    </div>
                    <Field
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Your message..."
                      className="w-full resize-none rounded-md bg-gray-100 p-3 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-secondary rounded-full font-light text-white ${isSubmitting ? "bg-gray-400" : "bg-black"}`}
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </button>
                    {submitError && <p className="text-error">{submitError}</p>}
                    {submitSuccess && (
                      <p className="text-success">Submitted. We will contact you soon.</p>
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
