import { graphql, type PageProps } from "gatsby";
import * as React from "react";
import FAQ from "../../components/FAQ";
import NeedGuidance from "../../components/NeedGuidance";

const IndexPage: React.FC<PageProps<Queries.LandingPageQueryQuery>> = () => {
  return (
    <div className="bg-cream">
      {/* FAQ Section */}
      <FAQ />

      {/* Need Guidance CTA */}
      <NeedGuidance />
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
    landingPageTestimonials: contentfulContentCard(
      title: { eq: "Landing Page Testimonials Section" }
    ) {
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
  }
`;
