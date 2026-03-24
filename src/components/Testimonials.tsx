import * as React from "react";
import { Link } from "gatsby";

const MOCK_TESTIMONIAL = {
  quote:
    '"The tutoring was clear, supportive, and tailored to my needs. I gained confidence in the subject and saw real improvement in my results. Highly recommend!"',
  name: "– John Smith",
  school: "Carlingford Boys High School",
  year: "Graduated 2023",
};

interface TestimonialsProps {
  heading?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ heading }) => (
  <div data-header-theme="dark" className="bg-ink flex flex-col items-center px-12 pt-44 pb-48">
    {/* TODO */}
    <p className="sm:text-display max-w-262 pb-42 text-center leading-[105%] font-extrabold tracking-normal text-white uppercase">
      {heading}
    </p>
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
