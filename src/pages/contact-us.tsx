import * as React from "react";
import { HeadFC, PageProps } from "gatsby";

const ContactUsPage: React.FC<PageProps> = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <div className="pt-20">
        {/* Hero Section */}
        <section data-header-theme="dark" className="hero bg-base-200 min-h-[60vh]">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-base-content mb-6 text-5xl font-bold">Contact Us</h1>
              <p className="text-base-content/70 text-xl">
                Get in touch with our team to start your learning journey today
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section data-header-theme="light" className="bg-base-100 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="text-base-content mb-8 text-3xl font-bold">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="form-control">
                      <label htmlFor="first-name" className="label">
                        <span className="label-text">First Name *</span>
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="last-name" className="label">
                        <span className="label-text">Last Name *</span>
                      </label>
                      <input id="last-name" type="text" className="input input-bordered" required />
                    </div>
                  </div>

                  <div className="form-control">
                    <label htmlFor="contact-email" className="label">
                      <span className="label-text">Email *</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label htmlFor="phone" className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input id="phone" type="tel" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                    <label htmlFor="subject" className="label">
                      <span className="label-text">Subject *</span>
                    </label>
                    <select id="subject" className="select select-bordered" required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="mathematics">Mathematics Tutoring</option>
                      <option value="english">English Tutoring</option>
                      <option value="scheduling">Scheduling</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label htmlFor="message" className="label">
                      <span className="label-text">Message *</span>
                    </label>
                    <textarea
                      id="message"
                      className="textarea textarea-bordered h-32"
                      placeholder="Tell us about your learning goals and how we can help..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-control">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Details */}
              <div>
                <h2 className="text-base-content mb-8 text-3xl font-bold">Get in Touch</h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                      <svg
                        className="text-primary h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base-content mb-2 text-xl font-semibold">Visit Us</h3>
                      <p className="text-base-content/70">
                        123 Education Street
                        <br />
                        Learning District
                        <br />
                        City, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                      <svg
                        className="text-primary h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base-content mb-2 text-xl font-semibold">Call Us</h3>
                      <p className="text-base-content/70">
                        <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                          (123) 456-7890
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                      <svg
                        className="text-primary h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base-content mb-2 text-xl font-semibold">Email Us</h3>
                      <p className="text-base-content/70">
                        <a
                          href="mailto:info@exceededucation.com"
                          className="hover:text-primary transition-colors"
                        >
                          info@exceededucation.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                      <svg
                        className="text-primary h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base-content mb-2 text-xl font-semibold">
                        Business Hours
                      </h3>
                      <p className="text-base-content/70">
                        Monday - Friday: 8:00 AM - 8:00 PM
                        <br />
                        Saturday: 9:00 AM - 6:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section data-header-theme="dark" className="bg-base-200 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-base-content mb-4 text-3xl font-bold">
                Frequently Asked Questions
              </h2>
              <p className="text-base-content/70 mx-auto max-w-2xl text-lg">
                Find answers to common questions about our services
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-4">
              <div className="collapse-arrow bg-base-100 collapse shadow-xl">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  What subjects do you offer tutoring in?
                </div>
                <div className="collapse-content">
                  <p>
                    We offer tutoring in Mathematics, English (with specialized programs for
                    different age groups), Science, and other subjects. Contact us to discuss
                    specific subject requirements.
                  </p>
                </div>
              </div>

              <div className="collapse-arrow bg-base-100 collapse shadow-xl">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  Do you offer online tutoring?
                </div>
                <div className="collapse-content">
                  <p>
                    Yes, we offer both in-person and online tutoring options to accommodate
                    different preferences and schedules.
                  </p>
                </div>
              </div>

              <div className="collapse-arrow bg-base-100 collapse shadow-xl">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  How do I schedule a session?
                </div>
                <div className="collapse-content">
                  <p>
                    You can schedule a session by contacting us through phone, email, or by filling
                    out the contact form above. We&apos;ll work with you to find the best time and
                    format for your needs.
                  </p>
                </div>
              </div>

              <div className="collapse-arrow bg-base-100 collapse shadow-xl">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">What are your rates?</div>
                <div className="collapse-content">
                  <p>
                    Our rates vary depending on the subject, session length, and whether it&apos;s
                    one-on-one or group tutoring. Contact us for detailed pricing information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUsPage;

export const Head: HeadFC = () => <title>Contact Us - Exceed Education</title>;
