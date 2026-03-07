import { graphql, type PageProps } from "gatsby";
import * as React from "react";
import MemberForm from "../components/MemberForm";
import { GatsbyImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps<Queries.LandingPageQueryQuery>> = ({
  data,
}) => {
  const landingPage1 = data.landingPage1;
  const landingPage2 = data.landingPage2;
  const landingPage3 = data.landingPage3;
  const landingPage4 = data.landingPage4;

  return (
    <div>
      <div className="flex flex-col gap-10 items-center justify-center pt-10 pb-28">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center max-w-3xl">
          {landingPage1?.description?.description}
        </h1>
        <button
          type="submit"
          className="btn btn-primary rounded-full btn-sm font-light"
        >
          CONTACT US
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-base-200 pt-12 px-6">
        <div className="flex flex-col items-start">
          <p className="w-full text-sm text-white max-w-sm">
            {landingPage2?.description?.description}
          </p>
          <p className="w-full text-sm text-white max-w-sm">
            {landingPage2?.description2?.description2}
          </p>
        </div>
        {landingPage2?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={landingPage2.photo.gatsbyImageData}
            alt={landingPage2.title || "Landing Page Image"}
            className="w-72 justify-self-end"
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-base-200 py-12 px-6 items-end">
        {landingPage3?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={landingPage3.photo.gatsbyImageData}
            alt={landingPage3.title || "Landing Page Image"}
            className="max-w-lg"
          />
        )}
        <div className="flex flex-col items-start p-6">
          <p className="w-full text-sm text-white max-w-sm">
            {landingPage3?.description?.description}
          </p>
          <p className="w-full text-sm text-white max-w-sm">
            {landingPage3?.description2?.description2}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center pt-10 pb-28">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center max-w-xl">
          {landingPage4?.description?.description}
        </h1>
        <p className="text-sm max-w-sm text-center">
          {landingPage4?.description2?.description2}
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
      description2 {
        description2
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
      description2 {
        description2
      }
      photo {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
    landingPage4: contentfulContentCard(
      contentful_id: { eq: "2mqQqYSHMxg1ZSSiwY4x1V" }
    ) {
      id
      contentful_id
      title
      description {
        description
      }
      description2 {
        description2
      }
    }
  }
`;
