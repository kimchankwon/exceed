import { graphql, type PageProps } from "gatsby";
import * as React from "react";
import MemberForm from "../components/MemberForm";
import { GatsbyImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps<Queries.LandingPageQueryQuery>> = ({ data }) => {
  const {
    landingPage1,
    landingPage2,
    landingPage3,
    landingPage4,
    landingPage5,
    landingPage6,
    allContentfulFrequentlyAskedQuestions,
  } = data;

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-10 px-8 pt-10 pb-28">
        <h1 className="max-w-3xl text-center text-3xl font-extrabold sm:text-5xl">
          {landingPage1?.description?.description}
        </h1>
        <button className="btn btn-primary btn-sm rounded-full font-light">CONTACT US</button>
      </div>
      <div className="bg-base-200 grid grid-cols-1 px-8 pt-12 sm:grid-cols-2">
        <div className="flex flex-col items-start">
          <p className="w-full max-w-sm text-sm text-white">
            {landingPage2?.description?.description}
          </p>
          <p className="w-full max-w-sm text-white">{landingPage2?.description2?.description2}</p>
        </div>
        {landingPage2?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={landingPage2.photo.gatsbyImageData}
            alt={landingPage2.title || "Landing Page Image"}
            className="w-72 justify-self-end"
          />
        )}
      </div>
      <div className="bg-base-200 grid grid-cols-1 items-end px-8 py-12 sm:grid-cols-2">
        {landingPage3?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={landingPage3.photo.gatsbyImageData}
            alt={landingPage3.title || "Landing Page Image"}
            className="max-w-lg justify-self-end"
          />
        )}
        <div className="flex flex-col items-start p-6">
          <p className="w-full max-w-sm text-sm text-white">
            {landingPage3?.description?.description}
          </p>
          <p className="w-full max-w-sm text-white">{landingPage3?.description2?.description2}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 px-8 py-28">
        <h1 className="max-w-xl text-center text-3xl font-extrabold sm:text-5xl">
          {landingPage4?.description?.description}
        </h1>
        <p className="max-w-sm text-center text-xs">{landingPage4?.description2?.description2}</p>
      </div>
      <div className="flex flex-col px-8 py-28">
        <p className="max-w-xl pb-12 text-3xl">{landingPage5?.description?.description}</p>
        {landingPage5?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={landingPage5.photo.gatsbyImageData}
            alt={landingPage5.title || "Landing Page Image"}
            className="w-68"
          />
        )}
      </div>
      <div className="flex justify-center px-8 pb-24">
        <button className="btn btn-secondary btn-sm rounded-full font-medium">MEET OUR TEAM</button>
      </div>
      {/* Testimonials Section */}
      {/* TODO */}
      <div className="flex flex-col items-center justify-center gap-10 px-8 pt-10 pb-28">
        <h1 className="max-w-3xl text-center text-3xl font-extrabold sm:text-5xl">
          {landingPage6?.description?.description}
        </h1>
        <div className="flex gap-4">
          <button className="btn btn-sm rounded-full border-2 border-black bg-white px-5">
            ABOUT US
          </button>
          <button className="btn btn-primary btn-sm rounded-full font-light">ENQUIRE NOW</button>
        </div>
      </div>
      {/* Carousel thing */}
      {/* TODO */}
      {/* FAQ Section */}
      <div className="flex flex-col px-8 pb-12">
        <h1 className="max-w-60 text-2xl leading-6 font-extrabold">FREQUENTLY</h1>
        <h1 className="max-w-60 text-2xl leading-6 font-extrabold">ASKED QUESTIONS</h1>
      </div>
      <div className="flex flex-col items-end px-8 pb-12">
        {allContentfulFrequentlyAskedQuestions.nodes.map((faq, index) => (
          <div key={faq.id} className="w-full max-w-md">
            <div className="collapse-arrow collapse">
              <input type="checkbox" />
              <div className="collapse-title text-md py-3 pl-0">{faq.title}</div>
              <div className="collapse-content px-0 text-sm">{faq.description?.description}</div>
            </div>
            {index < allContentfulFrequentlyAskedQuestions.nodes.length - 1 && (
              <div className="h-px bg-gray-300" />
            )}
          </div>
        ))}
      </div>
      {/* Member Form Section */}
      <section className="bg-base-100">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-base-content mb-4 text-3xl font-bold">Get Started Today</h2>
            <p className="text-base-content/70 mx-auto max-w-2xl">
              Ready to unlock your potential? Contact us to learn more about our personalized
              tutoring services.
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
    landingPage1: contentfulContentCard(title: { eq: "Landing Page 1" }) {
      title
      description {
        description
      }
    }
    landingPage2: contentfulContentCard(title: { eq: "Landing Page 2" }) {
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
    landingPage3: contentfulContentCard(title: { eq: "Landing Page 3" }) {
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
    landingPage4: contentfulContentCard(title: { eq: "Landing Page 4" }) {
      title
      description {
        description
      }
      description2 {
        description2
      }
    }
    landingPage5: contentfulContentCard(title: { eq: "Landing Page 5" }) {
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
    landingPage6: contentfulContentCard(title: { eq: "Landing Page 6" }) {
      title
      description {
        description
      }
    }
    allContentfulFrequentlyAskedQuestions(sort: [{ order: ASC }]) {
      nodes {
        id
        title
        order
        description {
          description
        }
      }
    }
  }
`;
