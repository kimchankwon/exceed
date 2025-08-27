import * as React from "react";
import { graphql, type PageProps } from "gatsby";
import Header from "../components/Header";
import TutorsSection from "../components/TutorsSection";
import MemberForm from "../components/MemberForm";

const IndexPage: React.FC<PageProps<Queries.TQuery>> = ({ data }) => {
  const tutors = data.allContentfulTutor?.nodes || [];

  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      <main className="pt-20">
        {/* Our Difference Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-2">OUR DIFFERENCE</p>
              <h2 className="text-4xl font-bold text-base-content">
                Why EXCEED Education?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <svg
                    width="16"
                    height="16"
                    className="w-4 h-4 text-primary flex-shrink-0 max-w-full max-h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <p className="text-base-content/70">
                  Egestas elit dui scelerisque ut eu purus aliquam vitae
                  habitasse.
                </p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <svg
                    width="16"
                    height="16"
                    className="w-4 h-4 text-primary flex-shrink-0 max-w-full max-h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <p className="text-base-content/70">
                  Id eros pellentesque facilisi id mollis faucibus commodo enim.
                </p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <svg
                    width="16"
                    height="16"
                    className="w-4 h-4 text-primary flex-shrink-0 max-w-full max-h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <p className="text-base-content/70">
                  Nunc, pellentesque velit malesuada non massa arcu.
                </p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <svg
                    width="16"
                    height="16"
                    className="w-4 h-4 text-primary flex-shrink-0 max-w-full max-h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    ></path>
                  </svg>
                </div>
                <p className="text-base-content/70">
                  Imperdiet purus pellentesque sit mi nibh sit integer faucibus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tutors Section */}
        <TutorsSection tutors={tutors} />

        {/* Member Form Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-base-content mb-4">
                Get Started Today
              </h2>
              <p className="text-base-content/70 max-w-2xl mx-auto">
                Ready to unlock your potential? Contact us to learn more about
                our personalized tutoring services.
              </p>
            </div>
            <MemberForm
              onSubmit={(memberData) => {
                console.log("Member created:", memberData);
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default IndexPage;

export const tutorsQuery = graphql`
  query T {
    allContentfulTutor {
      nodes {
        id
        name
        bio {
          raw
        }
        avatar {
          gatsbyImageData(width: 96, height: 96, placeholder: BLURRED)
        }
      }
    }
  }
`;
