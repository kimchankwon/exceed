import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

type OurTeamProps = {
  variant?: "full" | "preview";
};

const PAGE_SIZE = 12;

const OurTeam = ({ variant = "preview" }: OurTeamProps) => {
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const data = useStaticQuery<Queries.OurTeamQueryQuery>(graphql`
    query OurTeamQuery {
      contentfulContentCard(title: { eq: "Our Team" }) {
        title
        description {
          description
        }
        photos {
          id
          title
          description
          gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { contentfulContentCard } = data;
  const isFull = variant === "full";

  // TODO: waiting for copy

  return (
    <div data-header-theme="light" id="our-team" className="flex flex-col gap-16 px-12 py-38">
      {isFull ? (
        <>
          <h1 className="sm:text-display text-h3 w-full max-w-xs font-extrabold uppercase">
            {contentfulContentCard?.title}
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div />
            <p className="text-h5 max-w-lg leading-7">
              {contentfulContentCard?.description?.description}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-h3 max-w-4xl font-medium">
            {contentfulContentCard?.description?.description}
          </p>
        </>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contentfulContentCard?.photos?.map((photo) =>
          Array.from({ length: 24 }, () =>
            photo?.gatsbyImageData ? (
              <div key={photo.id} className="flex flex-col items-start gap-8">
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={photo.id}
                  className="w-full"
                  objectFit="fill"
                />
                {isFull && (
                  <div className="flex flex-col">
                    <span className="text-body font-semibold uppercase">{photo?.title}</span>
                    <span className="text-body font-medium text-black/40">
                      {photo?.description}
                    </span>
                  </div>
                )}
              </div>
            ) : null
          ).slice(0, isFull ? visibleCount : 4)
        )}
      </div>
      <div className="flex justify-center">
        {isFull ? (
          visibleCount < PAGE_SIZE * 2 && (
            <button
              className="btn btn-secondary text-navy rounded-full uppercase"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              load more
            </button>
          )
        ) : (
          <Link
            to="/about/#our-team"
            className="btn btn-secondary bg-secondary text-navy rounded-full uppercase"
          >
            meet our team
          </Link>
        )}
      </div>
    </div>
  );
};

export default OurTeam;
