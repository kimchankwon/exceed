import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import FAQ from "../components/FAQ";

const AboutPage: React.FC<PageProps<Queries.AboutPageQueryQuery>> = ({ data }) => {
  const {
    aboutTitle,
    about1,
    about2,
    about3,
    ourValues,
    value1,
    value2,
    value3,
    value4,
    collaboration,
  } = data;

  const values = [value1, value2, value3, value4];
  return (
    <div>
      <div data-header-theme="light" className="px-8 pt-40 pb-16">
        <p className="max-w-3xl text-6xl font-extrabold">{aboutTitle?.description?.description}</p>
      </div>
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
      <div data-header-theme="light" className="bg-secondary flex flex-col px-8 pt-24 pb-12">
        <h1 className="max-w-60 text-5xl font-extrabold">{about1?.title}</h1>
      </div>
      <div
        data-header-theme="light"
        className="bg-secondary grid grid-cols-1 gap-8 px-8 pb-12 sm:grid-cols-2"
      >
        <div></div>
        <div>
          <p className="pb-12 text-lg font-semibold">{about1?.description?.description}</p>
          {about1?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={about1.photo.gatsbyImageData}
              alt={about1.title || "Image"}
              className="w-full justify-self-end"
            />
          )}
        </div>
      </div>
      <div
        data-header-theme="light"
        className="bg-secondary grid grid-cols-1 gap-8 px-8 pb-28 sm:grid-cols-2"
      >
        <div className="max-w-72 text-sm sm:order-2">
          <p className="pb-4">{about2?.description?.description}</p>
          <p className="pb-8">{about2?.description2?.description2}</p>
        </div>
        <div className="flex justify-start">
          {about2?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={about2.photo.gatsbyImageData}
              alt={about2.title || "Image"}
              className="max-w-md sm:order-1"
            />
          )}
        </div>
      </div>
      <div data-header-theme="light" className="bg-secondary flex flex-col items-center pb-12">
        <h1 className="max-w-4xl pb-8 text-center text-3xl font-extrabold sm:text-5xl">
          {about3?.description?.description}
        </h1>
        {about3?.photo?.gatsbyImageData && (
          <GatsbyImage
            image={about3.photo.gatsbyImageData}
            alt={about3.title || "Image"}
            className="mx-6 my-16 max-w-5xl rotate-3"
          />
        )}
      </div>
      <div data-header-theme="light" className="flex flex-col px-8 pt-24 pb-12">
        <h1 className="max-w-60 text-5xl font-extrabold">{ourValues?.title}</h1>
      </div>
      <div data-header-theme="light" className="grid grid-cols-1 gap-8 px-8 pb-20 sm:grid-cols-2">
        <div>
          {ourValues?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={ourValues.photo.gatsbyImageData}
              alt={ourValues.title || "Image"}
              className="max-w-sm"
            />
          )}
        </div>
        <div className="h-225 max-w-xs">
          {values.map((value, i) =>
            value ? (
              <div className="collapse" key={value.id}>
                <input
                  type="radio"
                  name="my-accordion-1"
                  defaultChecked={i === 0}
                  className="peer"
                />
                <div className="collapse-title text-secondary text-xl transition-all duration-200 peer-checked:text-2xl peer-checked:text-current">
                  <p className="pb-4 font-extrabold">0{i + 1}.</p>
                  <p className="max-w-36 pb-4 leading-6 font-extrabold transition-all duration-200 [.peer:checked~*_&]:max-w-44">
                    {value?.title}
                  </p>
                </div>
                <div className="collapse-content">
                  <p className="pb-4 text-base">{value?.description?.description}</p>
                  <p className="text-base">{value?.description2?.description2}</p>
                </div>
              </div>
            ) : null
          )}
        </div>
        {/* TODO: animation and other 3 values */}
      </div>
      {/* TODO: OUR TEAM */}
      {/* TOP SCHOOLS */}
      <div data-header-theme="light" className="px-8">
        <h1 className="max-w-sm pb-16 text-2xl leading-6 font-extrabold">
          {collaboration?.description?.description}
        </h1>
        <div className="xs:grid-cols-2 grid gap-8 pb-28 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {collaboration?.photos?.map((photo, index) => (
            <div key={index} className="flex flex-col items-center gap-3 pb-4">
              {photo?.gatsbyImageData && (
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={`Collaboration ${index + 1}`}
                  className="h-20"
                  objectFit="contain"
                />
              )}
              <p className="text-[12px] text-gray-400">{photo?.title}</p>
            </div>
          ))}
        </div>
      </div>
      <FAQ />
      <div data-header-theme="light" className="bg-sky-soft mx-8 py-8">
        <h1 className="px-6 text-2xl font-extrabold">NEED GUIDANCE? LET'S CHAT.</h1>
      </div>
    </div>
  );
};

export default AboutPage;

export const AboutPageQuery = graphql`
  query AboutPageQuery {
    aboutTitle: contentfulContentCard(title: { eq: "About Title" }) {
      title
      description {
        description
      }
    }
    about1: contentfulContentCard(title: { eq: "OUR STORY" }) {
      title
      description {
        description
      }
      photo {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
    about2: contentfulContentCard(title: { eq: "OUR STORY 2" }) {
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
    about3: contentfulContentCard(title: { eq: "About 3" }) {
      title
      description {
        description
      }
      photo {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
    ourValues: contentfulContentCard(title: { eq: "OUR VALUES" }) {
      title
      photo {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
    value1: contentfulContentCard(title: { eq: "PLATFORM FOR GROWTH" }) {
      id
      title
      description {
        description
      }
      description2 {
        description2
      }
    }
    value2: contentfulContentCard(title: { eq: "HOLISTIC APPROACH" }) {
      id
      title
      description {
        description
      }
      description2 {
        description2
      }
    }
    value3: contentfulContentCard(title: { eq: "PERSONALISED TRAINING" }) {
      id
      title
      description {
        description
      }
      description2 {
        description2
      }
    }
    value4: contentfulContentCard(title: { eq: "OPTIMISED LEARNING" }) {
      id
      title
      description {
        description
      }
      description2 {
        description2
      }
    }
    collaboration: contentfulContentCard(title: { eq: "COLLABORATION" }) {
      title
      description {
        description
      }
      photos {
        id
        title
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
  }
`;
