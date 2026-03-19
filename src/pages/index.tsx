import { graphql, Link, type PageProps } from "gatsby";
import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import FAQ from "../components/FAQ";

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

const MOCK_TUTORS = [
  { id: "1", name: "Sarah Chen" },
  { id: "2", name: "James Park" },
  { id: "3", name: "Emily Wang" },
  { id: "4", name: "Michael Liu" },
];

const MOCK_TESTIMONIAL = {
  quote:
    '"The tutoring was clear, supportive, and tailored to my needs. I gained confidence in the subject and saw real improvement in my results. Highly recommend!"',
  name: "– John Smith",
  school: "Carlingford Boys High School",
  year: "Graduated 2023",
};

const IndexPage: React.FC<PageProps<Queries.LandingPageQueryQuery>> = ({ data }) => {
  const {
    landingPage1,
    landingPage2,
    landingPage3,
    landingPage4,
    landingPageTutors,
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
        className="flex flex-col items-center justify-center gap-10 px-12 pt-14 pb-28"
      >
        <h1 className="font-display sm:text-display text-h3 text-center font-extrabold uppercase">
          {landingPage1?.description?.description}
        </h1>
        <Link
          to="/contact-us/"
          className="btn btn-sm btn-primary font-display rounded-full border-0 font-light uppercase"
        >
          CONTACT US
        </Link>
      </div>

      {/* Orange Section - Why Exceed + Our Approach */}
      <div data-header-theme="dark" className="bg-base-200 relative overflow-hidden px-12 py-20">
        {/* Why Exceed - Top */}
        <div className="flex flex-col gap-12 sm:flex-row">
          <div className="flex max-w-[513px] flex-col gap-4 text-white">
            <p className="text-body-lg font-medium">{landingPage2?.description?.description}</p>
            <p className="font-display text-h5 leading-normal font-medium">
              {landingPage2?.description2?.description2}
            </p>
          </div>
          <div className="flex-1">
            {landingPage2?.photo?.gatsbyImageData && (
              <GatsbyImage
                image={landingPage2.photo.gatsbyImageData}
                alt={landingPage2.title || "Landing Page Image"}
                className="ml-auto max-h-[635px] max-w-[511px]"
              />
            )}
          </div>
        </div>
        {/* Our Approach - Bottom */}
        <div className="mt-20 flex flex-col-reverse items-end gap-12 sm:flex-row">
          <div className="flex-1">
            {landingPage3?.photo?.gatsbyImageData && (
              <GatsbyImage
                image={landingPage3.photo.gatsbyImageData}
                alt={landingPage3.title || "Landing Page Image"}
                className="max-h-[716px] max-w-[692px]"
              />
            )}
          </div>
          <div className="flex max-w-[510px] flex-col gap-4 text-white">
            <p className="text-body-lg font-medium">{landingPage3?.description?.description}</p>
            <p className="font-display text-h5 leading-normal font-medium">
              {landingPage3?.description2?.description2}
            </p>
          </div>
        </div>
      </div>

      {/* Fostering the Right Approach */}
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center gap-5 px-8 py-28"
      >
        <h1 className="font-display sm:text-display max-w-4xl text-center text-4xl font-extrabold uppercase">
          {landingPage4?.description?.description}
        </h1>
        <p className="text-body max-w-md text-center">{landingPage4?.description2?.description2}</p>
      </div>

      {/* Subject Tab Switcher + Cards */}
      <div data-header-theme="light" className="flex flex-col items-center px-12">
        {/* Tab Pills */}
        <div className="relative flex pr-10">
          <button
            className={`font-display text-body relative z-10 rounded-full px-5 py-4 font-medium uppercase transition-colors ${
              activeSubject === "maths" ? "bg-ink text-white" : "bg-grey text-ink"
            }`}
            onClick={() => setActiveSubject("maths")}
          >
            math
          </button>
          <button
            className={`font-display text-body -ml-10 rounded-full px-5 py-4 font-medium uppercase transition-colors ${
              activeSubject === "english" ? "bg-ink text-white" : "bg-grey text-ink"
            }`}
            onClick={() => setActiveSubject("english")}
          >
            english
          </button>
        </div>

        {/* Subject Card */}
        <div className="bg-ink mt-5 flex w-full items-end overflow-hidden">
          {/* Image placeholder */}
          <div className="hidden h-[527px] w-[759px] shrink-0 items-center justify-center bg-gray-700 sm:flex">
            <span className="text-lg text-white/30">Subject Image</span>
          </div>
          {/* Content */}
          <div className="flex flex-1 flex-col gap-10 p-12 sm:pr-12 sm:pb-12 sm:pl-10">
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-h5 font-extrabold text-white uppercase">
                {MOCK_SUBJECTS[activeSubject].title}
              </h3>
              <p className="text-body text-white">{MOCK_SUBJECTS[activeSubject].description}</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/"
                className="btn btn-sm btn-ghost font-display text-ink rounded-full bg-white/50 font-light uppercase"
              >
                Learn more
              </Link>
              <Link
                to="/contact-us/"
                className="btn btn-sm font-display text-ink rounded-full bg-white/80 font-light uppercase"
              >
                Enquire now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tutors Section */}
      <div data-header-theme="light" className="flex flex-col items-center gap-20 px-12 py-28">
        <p className="font-display text-h3 max-w-4xl self-start font-medium">
          {landingPageTutors?.description?.description}
        </p>
        <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
          {MOCK_TUTORS.map((tutor) => (
            <div key={tutor.id} className="flex h-[440px] items-end overflow-hidden bg-gray-300">
              <span className="p-4 text-sm font-medium text-black/40">{tutor.name}</span>
            </div>
          ))}
        </div>
        <Link
          to="/about/"
          className="btn btn-sm font-display bg-navy/10 text-navy rounded-full font-light uppercase"
        >
          meet our team
        </Link>
      </div>

      {/* Testimonials Section */}
      <div data-header-theme="dark" className="bg-ink flex flex-col items-center px-12 py-32">
        <h1 className="font-display sm:text-display max-w-5xl pb-20 text-center text-4xl font-extrabold text-white uppercase">
          {landingPageTestimonials?.description?.description}
        </h1>
        {/* Bento Grid */}
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Row 1: Text card + Image card */}
          <div className="bg-peach flex h-[440px] flex-col justify-between p-6">
            <p className="font-display text-h4 overflow-hidden font-extrabold text-white uppercase">
              {MOCK_TESTIMONIAL.quote}
            </p>
            <div>
              <p className="font-display text-h4 font-extrabold text-white uppercase">
                {MOCK_TESTIMONIAL.name}
              </p>
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
          className="btn btn-sm btn-outline font-display mt-20 rounded-full border-white font-light text-white uppercase"
        >
          load more
        </Link>
      </div>

      {/* "Our Strategy Works" */}
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center gap-8 px-8 py-28"
      >
        <h1 className="font-display sm:text-display max-w-4xl text-center text-4xl font-extrabold uppercase">
          {landingPage6?.description?.description}
        </h1>
        <div className="flex gap-4">
          <Link
            to="/about/"
            className="btn btn-sm font-display border-ink rounded-full border-2 bg-white font-light uppercase"
          >
            about us
          </Link>
          <Link
            to="/contact-us/"
            className="btn btn-sm btn-primary font-display rounded-full border-0 font-light text-white uppercase"
          >
            Enquire now
          </Link>
        </div>
      </div>

      {/* Stats Counter */}
      <div data-header-theme="light" className="flex flex-col items-end gap-10 px-12">
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
        <div className="flex w-full items-end justify-between">
          <span className="font-display text-primary sm:text-stat text-display leading-none font-extrabold uppercase">
            12231
          </span>
          <span className="font-display text-primary sm:text-h3 text-h4 max-w-[508px] text-right leading-none font-extrabold uppercase">
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
      <div data-header-theme="light" className="sm:px-12">
        <div className="bg-sky-soft px-8 py-12">
          <h1 className="font-display text-h4 max-w-[511px] font-extrabold uppercase">
            NEED GUIDANCE? LET&apos;S CHAT.
          </h1>
        </div>
      </div>
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
    landingPageTutors: contentfulContentCard(title: { eq: "Landing Page Tutors Section" }) {
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
