import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import FAQ from "../components/FAQ";
import NeedGuidance from "../components/NeedGuidance";
import OurTeam from "../components/OurTeam";
import Testimonials from "../components/Testimonials";

const AboutPage: React.FC<PageProps<Queries.AboutPageQueryQuery>> = ({ data }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const postToPlayer = (data: object) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(data), "https://player.vimeo.com");
  };

  const handleIframeLoad = () => {
    postToPlayer({ method: "addEventListener", value: "play" });
    postToPlayer({ method: "addEventListener", value: "pause" });
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;
      try {
        const data = JSON.parse(event.data as string) as { event?: string };
        if (data.event === "play") setIsPlaying(true);
        if (data.event === "pause") setIsPlaying(false);
      } catch (_e) {
        // ignore non-JSON messages
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleToggle = () => {
    postToPlayer({ method: isPlaying ? "pause" : "play" });
  };

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
    <div className="bg-cream">
      {/* Hero Headline */}
      <div data-header-theme="light" className="px-12 pt-55 pb-21">
        <h1 className="sm:text-display-lg max-w-6xl leading-none font-extrabold tracking-[-0.02em] uppercase">
          {aboutTitle?.description?.description}
        </h1>
      </div>

      {/* Video Section */}
      <div
        data-header-theme="dark"
        className="relative aspect-video w-full overflow-hidden bg-black"
      >
        <iframe
          ref={iframeRef}
          className="absolute h-full w-full"
          src="https://player.vimeo.com/video/449787858?autoplay=0&loop=1&muted=1&api=1&controls=0"
          title="Exceed Education"
          allow="autoplay; fullscreen"
          style={{ border: 0 }}
          onLoad={handleIframeLoad}
        />
        {/* Overlay sits above iframe to intercept clicks */}
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleToggle();
          }}
        >
          {!isPlaying && (
            <span className="btn btn-primary pointer-events-none h-11 rounded-full border-0 uppercase">
              play video
            </span>
          )}
        </div>
      </div>

      {/* Our Story */}
      <div data-header-theme="light" className="bg-grey px-12 pt-36 pb-40">
        <h1 className="sm:text-display text-h3 mb-16 w-xs font-extrabold uppercase">
          {about1?.title}
        </h1>
        {/* Row 1: text left, image right */}
        <div className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div />
          <p className="text-h5 max-w-2xl pb-12">{about1?.description?.description}</p>
          <div />
          {about1?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={about1.photo.gatsbyImageData}
              alt={about1.title || "Image"}
              className="max-h-184.75 max-w-173"
            />
          )}
        </div>
        {/* Row 2: image left, text right */}
        <div className="grid grid-cols-1 gap-8 pb-36 sm:grid-cols-2 sm:flex-row">
          {about2?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={about2.photo.gatsbyImageData}
              alt={about2.title || "Image"}
              className="max-h-184.75 max-w-127.75"
            />
          )}
          <div className="max-w-116.5">
            <p className="text-body-lg mb-4">{about2?.description?.description}</p>
            <p className="text-body-lg">{about2?.description2?.description2}</p>
          </div>
        </div>
        {/* Large centered quote */}
        <h1 className="sm:text-display text-h3 mx-auto max-w-7xl text-center font-extrabold uppercase">
          {about3?.description?.description}
        </h1>
        <div className="flex justify-center">
          {about3?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={about3.photo.gatsbyImageData}
              alt={about3.title || "Image"}
              className="mt-32 max-w-7xl rotate-3"
            />
          )}
        </div>
      </div>

      {/* Our Values */}
      <div data-header-theme="light" className="px-12 py-36">
        <h1 className="sm:text-display text-h3 mb-16 max-w-xs font-extrabold uppercase">
          {ourValues?.title}
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            {ourValues?.photo?.gatsbyImageData && (
              <GatsbyImage
                image={ourValues.photo.gatsbyImageData}
                alt={ourValues.title || "Image"}
                className="max-w-lg"
              />
            )}
          </div>
          <div className="flex flex-col gap-8">
            {values.map((value, i) =>
              value ? (
                <div className="collapse" key={value.id}>
                  <input
                    type="radio"
                    name="my-accordion-1"
                    defaultChecked={i === 0}
                    className="peer"
                  />
                  <div className="collapse-title text-ink/25 peer-checked:text-ink p-0 pb-4 transition-all duration-200">
                    <p className="text-h5 [.peer:checked~*_&]:text-h4 pb-6 font-extrabold uppercase transition-all duration-200 [.peer:checked~*_&]:pb-8">
                      0{i + 1}.
                    </p>
                    <p className="text-h5 [.peer:checked~*_&]:text-h4 max-w-42 pb-2 font-extrabold uppercase transition-all duration-200 [.peer:checked~*_&]:max-w-56">
                      {value?.title}
                    </p>
                  </div>
                  <div className="collapse-content max-w-md px-0">
                    <p className="text-body-lg pb-4">{value?.description?.description}</p>
                    <p className="text-body-lg">{value?.description2?.description2}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials heading="Our students' achievements are the true measure of our impact." />

      {/* Our Team */}
      <OurTeam variant="full" />

      {/* Schools Collaboration */}
      <div data-header-theme="light" className="px-12 pb-32">
        <h1 className="text-h4 max-w-lg pb-28 leading-none font-extrabold uppercase">
          {collaboration?.description?.description}
        </h1>
        <div className="grid grid-cols-2 gap-8 opacity-25 sm:grid-cols-5">
          {collaboration?.photos?.map((photo, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              {photo?.gatsbyImageData && (
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={`Collaboration ${index + 1}`}
                  className="h-26"
                  objectFit="contain"
                />
              )}
              <p className="text-body pb-10 text-center font-medium text-black">{photo?.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <FAQ />

      {/* Need Guidance CTA */}
      <NeedGuidance />
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
