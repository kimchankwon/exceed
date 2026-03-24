import * as React from "react";
import { Link } from "gatsby";
import Timetable from "../components/Timetable";
import EnrollmentForm from "../components/EnrollmentForm";
import type { SubjectPageData } from "../data/subjectPageData";

interface SubjectPageProps {
  data: SubjectPageData;
}

const SubjectPage: React.FC<SubjectPageProps> = ({ data }) => {
  return (
    <div className="bg-cream">
      {/* Hero Headline */}
      <div data-header-theme="light" className="px-12 pt-55 pb-10">
        <h1 className="sm:text-display-lg max-w-6xl leading-none font-extrabold uppercase">
          {data.hero.headline}
        </h1>
      </div>

      {/* Year Group Pills */}
      <div data-header-theme="light" className="flex flex-wrap gap-3 px-12 pb-12">
        {data.yearGroupPills.map((pill) => (
          <Link
            key={pill.href}
            to={pill.href}
            className="btn btn-secondary text-ink border-ink inline-flex h-11 items-center gap-2 border-0 font-medium uppercase transition-colors"
          >
            {pill.label}
            <span>&rarr;</span>
          </Link>
        ))}
      </div>

      {/* Full-width Image */}
      <div data-header-theme="dark" className="w-full">
        <div className="flex h-[500px] w-full items-center justify-center overflow-hidden bg-gray-300 sm:h-[650px]">
          <span className="text-lg text-black/30">{data.heroImage.alt}</span>
        </div>
      </div>

      {/* Our Approach */}
      <div data-header-theme="light" className="px-12 pt-28 pb-28">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_2fr]">
          <h2 className="text-h3 max-w-xs font-extrabold uppercase">{data.approach.heading}</h2>
          <div className="flex max-w-2xl flex-col gap-8">
            {data.approach.paragraphs.map((p, i) => (
              <p key={i} className="text-body-lg">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Centered Heading */}
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center px-12 pt-16 pb-20"
      >
        <h2 className="sm:text-display text-h3 mx-auto max-w-5xl text-center font-extrabold uppercase">
          {data.centeredHeading}
        </h2>
      </div>

      {/* Fast-Track Service Card */}
      <div data-header-theme="light" className="px-12 pb-20">
        <div className="bg-ink flex flex-col overflow-hidden sm:flex-row">
          {/* Image placeholder */}
          <div className="hidden h-120 w-137.5 shrink-0 items-center justify-center bg-gray-700 sm:flex">
            <span className="text-lg text-white/30">{data.fastTrack.image.alt}</span>
          </div>
          {/* Content */}
          <div className="flex flex-1 flex-col justify-center gap-6 p-12 sm:py-16 sm:pr-16 sm:pl-12">
            <h3 className="text-h5 font-extrabold text-white uppercase">
              {data.fastTrack.heading}
            </h3>
            <p className="text-body text-white/80">{data.fastTrack.description}</p>
            <Link
              to={data.fastTrack.buttonHref}
              className="btn bg-primary w-fit rounded-full border-0 text-white uppercase"
            >
              {data.fastTrack.buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Timetable Section */}
      <div data-header-theme="dark" className="bg-navy/85 mb-40 px-12 pt-24 pb-20">
        <div className="flex flex-col items-center gap-3 pb-14">
          <h2 className="text-h3 text-center font-extrabold text-white uppercase">
            {data.timetable.heading}
          </h2>
          <p className="text-center text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
            {data.timetable.subtitle}
          </p>
        </div>
        <Timetable subject={data.subject} />
      </div>

      {/* Enrollment Form */}
      <EnrollmentForm collapsedText={data.enrollment.collapsedText} />
    </div>
  );
};

export default SubjectPage;
