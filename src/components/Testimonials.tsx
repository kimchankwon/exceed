import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

const MOCK_TESTIMONIAL = {
  quote:
    '"The tutoring was clear, supportive, and tailored to my needs. I gained confidence in the subject and saw real improvement in my results. Highly recommend!"',
  name: "– John Smith",
  school: "Carlingford Boys High School",
  year: "Graduated 2023",
};

type TestimonialsProps = {
  variant?: "original" | "updated";
}
const TESTIMONIALS_IN_VIEW = 5;

const TestimonialLanding = ({ variant = "updated" }: TestimonialsProps) => {
  const heading = useStaticQuery<Queries.LandingPageTestimonialSectionQueryQuery>(graphql `
    query LandingPageTestimonialSectionQuery {
      contentfulContentCard(title: { eq: "Landing Page Testimonials Section" }){
      title
      description {
        description
      }
      }
    }
  `
  );
}

const Testimonies = () => {
  const [visibleCount, setVisibleCount] = React.useState(TESTIMONIALS_IN_VIEW);
  const data = useStaticQuery<Queries.AllTestimonialsQueryQuery>(graphql `
    query AllTestimonialsQuery {
      allTestimonials{
        nodes {
          studentName
          entryTitle
          year
          studentImage {
            gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
            title
          }
          hideLongTestimonial
          testimonial
          testimonialExtended {
            raw
          }
        }
      }
    }
    `);

}

const { contentfulContentCard } = heading;
const { testimonials } = data;

const Testimonials: React.FC<TestimonialsProps> = ({ heading }) => (
  <div data-header-theme="dark" id="testimonials" className="bg-ink flex flex-col items-center px-12 pt-44 pb-48">
    {/* TODO */}
    <h1 className="sm:text-display max-w-5xl pb-42 text-center text-4xl font-extrabold text-white uppercase">
      {contentfulContentCard?.description?.description}
    </h1>
    <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
      {/* Row 1: Text card + Image card */}
      <div className="bg-peach flex h-[440px] flex-col justify-between p-6">
        <p className="text-h4 overflow-hidden font-extrabold text-white uppercase">
          {MOCK_TESTIMONIAL.quote}
        </p>
        <div>
          <p className="text-h4 font-extrabold text-white uppercase">{MOCK_TESTIMONIAL.name}</p>
          <p className="text-body mt-2 font-medium text-white">{MOCK_TESTIMONIAL.school}</p>
          <p className="text-body text-white">{MOCK_TESTIMONIAL.year}</p>
        </div>
      </div>
      <div className="flex h-[440px] items-center justify-center bg-gray-600">
        <span className="text-white/30">Testimonial Image</span>
      </div>
      {/* Row 2: Two image cards */}
      <div className="flex h-[605px] items-center justify-center bg-gray-500">
        <span className="text-white/30">Testimonial Image</span>
      </div>
      <div className="flex h-[606px] items-center justify-center bg-gray-400">
        <span className="text-white/30">Testimonial Image</span>
      </div>
    </div>
    <Link
      to="/"
      className="btn btn-outline mt-20 rounded-full border-white text-white uppercase hover:bg-black"
    >
      load more
    </Link>
  </div>
);

export default Testimonials;
