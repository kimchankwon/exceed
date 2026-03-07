import { graphql, type PageProps } from "gatsby";
import * as React from "react";
import MemberForm from "../components/MemberForm";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps<Queries.LandingPageQueryQuery>> = ({
  data,
}) => {
  const landingPage1 = data.landingPage1;
  const landingPage2 = data.landingPage2;
  const landingPage3 = data.landingPage3;

  return (
    <div>
      <div className="flex flex-col gap-10 items-center justify-center pt-10 pb-20">
        <h1 className="text-4xl font-extrabold text-center w-xl">
          {landingPage1?.description?.description}
        </h1>
        <button
          type="submit"
          className="btn btn-primary rounded-full btn-sm font-light"
        >
          CONTACT US
        </button>
      </div>
      <div className="flex bg-base-200 py-10 px-6 justify-between">
        <p className="w-xs text-sm text-white">
          {landingPage2?.richDescription &&
            renderRichText(landingPage2.richDescription)}
        </p>
        {landingPage2?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={landingPage2.photo.gatsbyImageData}
            alt={landingPage2.title || "Landing Page Image"}
            className="w-60"
          />
        )}
      </div>
      <div className="flex bg-base-200 py-10 px-6 justify-between">
        {landingPage3?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={landingPage3.photo.gatsbyImageData}
            alt={landingPage3.title || "Landing Page Image"}
            className="w-60"
          />
        )}
        <p className="w-xs text-sm text-white">
          {landingPage3?.richDescription &&
            renderRichText(landingPage3.richDescription)}
        </p>
      </div>

      {/* Member Form Section */}
      <section className="bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Get Started Today
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Ready to unlock your potential? Contact us to learn more about our
              personalized tutoring services.
            </p>
          </div>
          <MemberForm
            onSubmit={(memberData) => {
              console.log("Member created:", memberData);
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default IndexPage;

export const landingPageQuery = graphql`
  query LandingPageQuery {
    landingPage1: contentfulContentCard(
      contentful_id: { eq: "4QyBkGkABsUBblJqxOZCov" }
    ) {
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
    landingPage2: contentfulContentCard(
      contentful_id: { eq: "1aPmoW0SJRJj06E75eJw3O" }
    ) {
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
    landingPage3: contentfulContentCard(
      contentful_id: { eq: "44mPl4HoInMshIdiIbsVLq" }
    ) {
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
