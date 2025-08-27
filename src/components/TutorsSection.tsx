import React from "react";
import TutorCard from "./TutorCard";

interface TutorsSectionProps {
  tutors: ReadonlyArray<{
    readonly id: string;
    readonly name: string | null;
    readonly bio: {
      readonly raw: string | null;
    } | null;
    readonly avatar?: {
      readonly gatsbyImageData: any;
    } | null;
  }>;
}

const TutorsSection: React.FC<TutorsSectionProps> = ({ tutors }) => {
  if (!tutors || tutors.length === 0) {
    return (
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Our Expert Tutors
            </h2>
            <p className="text-base-content/70 mb-8">
              Meet our dedicated team of experienced educators
            </p>
            <div className="alert alert-info max-w-md mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No tutors available at the moment. Check back soon!</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content mb-4">
            Our Expert Tutors
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Meet our dedicated team of experienced educators who are passionate
            about helping students succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorsSection;
