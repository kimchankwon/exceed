import { graphql, Link, type PageProps } from "gatsby";
import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import FAQ from "../../components/FAQ";
import NeedGuidance from "../../components/NeedGuidance";
import OurTeam from "../../components/OurTeam";
import Testimonials from "../../components/Testimonials";
import SubjectTabSwitcher from "../../components/SubjectTabSwitcher";

const MOCK_SUBJECTS = {
  english: {
    title: "Master English with clarity, confidence and purpose.",
    description:
      "Our tailored lessons focus on building strong foundations, improving communication skills, and boosting academic performance—empowering high school students to excel in exams and beyond.",
  },
  maths: {
    title: "Master Maths with clarity, confidence and purpose.",
    description:
      "Our tailored lessons focus on building strong foundations, improving problem-solving skills, and boosting academic performance—empowering high school students to excel in exams and beyond.",
  },
};

const IndexPage: React.FC<PageProps<Queries.LandingPageQueryQuery>> = ({ data }) => {
  const {
    landingPage1,
    landingPage2,
    landingPage3,
    landingPage4,
    landingPageTestimonials,
    landingPage6,
  } = data;

  const [activeSubject, setActiveSubject] = React.useState<"english" | "maths">("english");

  return (
    <div className="bg-cream">
      {/* Hero Video */}
      <div
        data-header-theme="dark"
        className="relative aspect-video w-full overflow-hidden bg-black"
      >
        <iframe
          className="absolute h-full w-full"
          src="https://player.vimeo.com/video/449787858?background=1&autoplay=1&loop=1&muted=1"
          title="Exceed Education"
          allow="autoplay; fullscreen"
          style={{ border: 0 }}
        />
      </div>

      {/* Hero Headline + CTA */}
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center gap-10 px-12 pt-20 pb-42"
      >
        <h1 className="sm:text-display text-h3 max-w-6xl pb-10 text-center font-extrabold uppercase">
          {landingPage1?.description?.description}
        </h1>
        <Link to="/contact-us/" className="btn btn-primary rounded-full border-0 uppercase">
          contact us
        </Link>
      </div>

      {/* Orange Section - Why Exceed + Our Approach */}
      <div data-header-theme="dark" className="bg-base-200 relative overflow-hidden px-12 py-20">
        {/* Why Exceed - Top */}
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <div className="flex max-w-124 flex-col gap-1 text-white">
            <p className="text-body-lg font-medium">{landingPage2?.description?.description}</p>
            <p className="text-h5 leading-7">{landingPage2?.description2?.description2}</p>
          </div>
          {landingPage2?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={landingPage2.photo.gatsbyImageData}
              alt={landingPage2.title || "Landing Page Image"}
              className="max-h-[635px] max-w-[511px]"
            />
          )}
        </div>
        {/* Our Approach - Bottom */}
        <div className="mt-20 flex flex-col-reverse items-end justify-center gap-8 sm:flex-row">
          {landingPage3?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={landingPage3.photo.gatsbyImageData}
              alt={landingPage3.title || "Landing Page Image"}
              className="max-h-[716px] max-w-143"
            />
          )}
          <div className="flex max-w-124 flex-col gap-1 text-white">
            <p className="text-body-lg font-medium">{landingPage3?.description?.description}</p>
            <p className="text-h5 leading-7">{landingPage3?.description2?.description2}</p>
          </div>
        </div>
      </div>

      {/* Fostering the Right Approach */}
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center gap-7 px-12 pt-42 pb-12"
      >
        <h1 className="sm:text-display max-w-3xl text-center text-4xl font-extrabold uppercase">
          {landingPage4?.description?.description}
        </h1>
        <p className="text-body max-w-md text-center tracking-wide">
          {landingPage4?.description2?.description2}
        </p>
      </div>

      {/* Subject Tab Switcher + Cards */}
      <div data-header-theme="light" className="flex flex-col items-center px-12">
        {/* Tab Pills */}
        <SubjectTabSwitcher activeSubject={activeSubject} onSubjectChange={setActiveSubject} />

        {/* Subject Card */}
        {/* TODO */}
        <div className="bg-ink mt-5 flex w-full items-end overflow-hidden">
          {/* Image placeholder */}
          <div className="hidden h-[527px] w-[759px] shrink-0 items-center justify-center bg-gray-700 sm:flex">
            <span className="text-lg text-white/30">Subject Image</span>
          </div>
          {/* Content */}
          <div className="flex flex-1 flex-col gap-10 p-12 sm:pr-12 sm:pb-12 sm:pl-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-h5 font-extrabold text-white uppercase">
                {MOCK_SUBJECTS[activeSubject].title}
              </h3>
              <p className="text-body text-white">{MOCK_SUBJECTS[activeSubject].description}</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/"
                className="btn btn-sm btn-ghost text-ink rounded-full bg-white/50 font-light uppercase"
              >
                Learn more
              </Link>
              <Link
                to="/contact-us/"
                className="btn btn-sm text-ink rounded-full bg-white/80 font-light uppercase"
              >
                Enquire now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tutors Section */}
      <OurTeam />

      {/* Testimonials Section */}
      <Testimonials heading={landingPageTestimonials?.description?.description ?? ""} />

      {/* "Our Strategy Works" */}
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center gap-10 px-12 pt-38 pb-28"
      >
        <h1 className="sm:text-display max-w-5xl text-center text-4xl font-extrabold uppercase">
          {landingPage6?.description?.description}
        </h1>
        <div className="flex gap-4">
          <Link
            to="/about/"
            className="btn border-ink w-38 flex-1 rounded-full border-2 bg-white uppercase"
          >
            about us
          </Link>
          <Link
            to="/contact-us/"
            className="btn btn-primary w-38 rounded-full border-0 text-white uppercase"
          >
            enquire now
          </Link>
        </div>
      </div>

      {/* Stats Counter */}
      <div data-header-theme="light" className="flex flex-col items-end gap-6 px-12">
        {/* Arrow Navigation */}
        <div className="flex gap-6">
          <button className="flex h-12 w-12 items-center justify-center opacity-50">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path
                d="M17 7H1M1 7L7 1M1 7L7 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="flex h-12 w-12 items-center justify-center">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path
                d="M1 7H17M17 7L11 1M17 7L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* Counter */}
        <div className="flex w-full flex-wrap items-end justify-between">
          <span className="text-primary sm:text-stat text-display leading-none font-extrabold uppercase">
            12231
          </span>
          <span className="text-primary sm:text-h3 text-h4 max-w-[508px] text-right leading-none font-extrabold uppercase">
            students joined and graduated with us
          </span>
        </div>
      </div>

      {/* Large Image */}
      <div data-header-theme="light" className="px-12 pt-10 pb-20">
        <div className="flex h-[652px] w-full items-center justify-center overflow-hidden bg-gray-300">
          <span className="text-lg text-black/30">Featured Image</span>
        </div>
      </div>

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
