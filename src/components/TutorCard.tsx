import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import type { IGatsbyImageData } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface TutorCardProps {
  tutor: {
    id: string;
    name: string | null;
    bio: {
      raw: string | null;
    } | null;
    avatar?: {
      gatsbyImageData: IGatsbyImageData;
    } | null;
  };
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const image = tutor.avatar?.gatsbyImageData
    ? getImage(tutor.avatar.gatsbyImageData)
    : null;
  const tutorName = tutor.name || "Unknown Tutor";
  const tutorBio = tutor.bio?.raw || null;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="px-6 pt-6">
        {image ? (
          <GatsbyImage
            image={image}
            alt={`${tutorName}'s avatar`}
            className="rounded-full w-24 h-24 object-cover"
          />
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-24 h-24">
              <span className="text-3xl">
                {tutorName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-xl font-bold text-primary">
          {tutorName}
        </h2>
        <div className="text-base-content/70 text-sm leading-relaxed">
          {tutorBio
            ? (() => {
                try {
                  // Try to parse the raw content as JSON for Rich Text rendering
                  const parsedBio = JSON.parse(tutorBio);
                  return documentToReactComponents(parsedBio);
                } catch (error) {
                  // If parsing fails, fall back to HTML rendering
                  return (
                    <span dangerouslySetInnerHTML={{ __html: tutorBio }} />
                  );
                }
              })()
            : "Experienced tutor dedicated to helping students achieve their academic goals."}
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View Profile</button>
          <button className="btn btn-outline btn-sm">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
