import * as React from "react";
import { graphql, type PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Header from "../components/Header";
import MemberForm from "../components/MemberForm";

// LandingSection Component
interface LandingSectionProps {
  content: {
    readonly id: string;
    readonly contentful_id: string;
    readonly title: string | null;
    readonly description: {
      readonly description: string | null;
    } | null;
    readonly richDescription: {
      readonly raw: string | null;
    } | null;
    readonly photo: {
      readonly gatsbyImageData: any;
    } | null;
  };
  imagePosition: "left" | "right";
  layout?: "centered" | "split";
}

const LandingSection: React.FC<LandingSectionProps> = ({
  content,
  imagePosition,
  layout = "split",
}) => {
  const image = content.photo?.gatsbyImageData
    ? getImage(content.photo.gatsbyImageData)
    : null;
  const richRaw = content.richDescription?.raw ?? null;

  const renderRichText = (textClass: string) => {
    if (!richRaw) return null;
    try {
      const parsed = JSON.parse(richRaw);
      return (
        <div className={textClass}>{documentToReactComponents(parsed)}</div>
      );
    } catch {
      return (
        <div
          className={textClass}
          dangerouslySetInnerHTML={{ __html: richRaw }}
        />
      );
    }
  };

  // ── Centered layout (landingPage1): white bg, black text, content centered ──
  if (layout === "centered") {
    return (
      <section
        className="py-20 lg:py-28 bg-white"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {content.title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug tracking-tight">
                {content.title}
              </h2>
            )}
            {content.description?.description && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.description.description}
              </p>
            )}
            {renderRichText(
              "text-gray-800 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_strong]:font-bold [&_a]:text-orange-500 [&_a]:underline"
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── Split layout (landingPage2 / landingPage3): orange bg, white text + image ──
  const flexDirection =
    imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section
      className="py-16 lg:py-24 bg-orange-500"
      style={{ backgroundColor: "#f97316" }}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${flexDirection} items-center gap-8 lg:gap-12`}
        >
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            {content.title && (
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug">
                {content.title}
              </h2>
            )}
            {content.description?.description && (
              <p className="text-white/90 text-lg leading-relaxed">
                {content.description.description}
              </p>
            )}
            {renderRichText(
              "text-white [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_strong]:font-bold [&_a]:text-white [&_a]:underline"
            )}
          </div>

          {/* Image Content */}
          {image && (
            <div className="w-full lg:w-1/2">
              <GatsbyImage
                image={image}
                alt={content.title ?? "Landing page image"}
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const LandingPage: React.FC<PageProps<Queries.LandingPageQueryQuery>> = ({ data }) => {
  const landingPage1 = data.landingPage1;
  const landingPage2 = data.landingPage2;
  const landingPage3 = data.landingPage3;

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

        {/* Landing Page 1 - White background, black text, centered */}
        {landingPage1 && (
          <LandingSection
            content={landingPage1}
            imagePosition="right"
            layout="centered"
          />
        )}

        {/* Landing Page 2 - Orange background, text left, image right */}
        {landingPage2 && (
          <LandingSection
            content={landingPage2}
            imagePosition="right"
          />
        )}

        {/* Landing Page 3 - Orange background, image left, text right */}
        {landingPage3 && (
          <LandingSection
            content={landingPage3}
            imagePosition="left"
          />
        )}

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

export default LandingPage;

export const landingPageQuery = graphql`
  query LandingPageQuery {
    landingPage1: contentfulContentCard(contentful_id: { eq: "4QyBkGkABsUBblJqxOZCov" }) {
      id
      contentful_id
      title
      description {
        description
      }
      richDescription {
        raw
      }
      photo {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
    landingPage2: contentfulContentCard(contentful_id: { eq: "1aPmoW0SJRJj06E75eJw3O" }) {
      id
      contentful_id
      title
      description {
        description
      }
      richDescription {
        raw
      }
      photo {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
    landingPage3: contentfulContentCard(contentful_id: { eq: "44mPl4HoInMshIdiIbsVLq" }) {
      id
      contentful_id
      title
      description {
        description
      }
      richDescription {
        raw
      }
      photo {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
  }
`;
