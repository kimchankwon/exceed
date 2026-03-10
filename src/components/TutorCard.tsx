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

const TutorCard = ({ tutor }: TutorCardProps) => {
  const image = tutor.avatar?.gatsbyImageData ? getImage(tutor.avatar.gatsbyImageData) : null;
  const tutorName = tutor.name || "Unknown Tutor";
  const tutorBio = tutor.bio?.raw || null;

  return (
    <div className="card bg-base-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
      <figure className="px-6 pt-6">
        {image ? (
          <GatsbyImage
            image={image}
            alt={`${tutorName}'s avatar`}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content h-24 w-24 rounded-full">
              <span className="text-3xl">{tutorName.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-primary text-xl font-bold">{tutorName}</h2>
        <div className="text-base-content/70 text-sm leading-relaxed">
          {tutorBio
            ? (() => {
                try {
                  // Try to parse the raw content as JSON for Rich Text rendering
                  const parsedBio = JSON.parse(tutorBio);
                  return documentToReactComponents(parsedBio);
                } catch (error) {
                  // If parsing fails, fall back to HTML rendering
                  return <span dangerouslySetInnerHTML={{ __html: tutorBio }} />;
                }
              })()
            : "Experienced tutor dedicated to helping students achieve their academic goals."}
        </div>
        <div className="card-actions mt-4 justify-end">
          <button className="btn btn-primary btn-sm">View Profile</button>
          <button className="btn btn-outline btn-sm">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
