import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import FAQ from "../components/FAQ";

const MOCK_TESTIMONIAL = {
  quote:
    '"The tutoring was clear, supportive, and tailored to my needs. I gained confidence in the subject and saw real improvement in my results. Highly recommend!"',
  name: "– John Smith",
  school: "Carlingford Boys High School",
  year: "Graduated 2023",
};

const MOCK_TUTORS = [
  { id: "1", name: "Sarah Chen", role: "Founder" },
  { id: "2", name: "James Park", role: "Co-founder" },
  { id: "3", name: "Emily Wang", role: "English Tutor" },
  { id: "4", name: "Michael Liu", role: "Maths Tutor" },
];

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
      <div data-header-theme="light" className="px-12 pt-54 pb-24">
        <h1 className="sm:text-display-lg max-w-5xl leading-none font-extrabold uppercase">
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
            <span className="btn btn-primary pointer-events-none rounded-full border-0 uppercase">
              play video
            </span>
          )}
        </div>
      </div>

      {/* Our Story */}
      <div data-header-theme="light" className="bg-grey px-12 pt-36 pb-40">
        <h1 className="sm:text-display text-h3 mb-20 w-xs leading-none font-extrabold uppercase">
          {about1?.title}
        </h1>
        {/* Row 1: text left, image right */}
        <div className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <p className="text-h5 max-w-173 font-medium">{about1?.description?.description}</p>
          {about1?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={about1.photo.gatsbyImageData}
              alt={about1.title || "Image"}
              className="max-h-184.75 max-w-173"
            />
          )}
        </div>
        {/* Row 2: image left, text right */}
        <div className="mb-40 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:flex-row">
          {about2?.photo?.gatsbyImageData && (
            <GatsbyImage
              image={about2.photo.gatsbyImageData}
              alt={about2.title || "Image"}
              className="max-h-184.75 max-w-127.75"
            />
          )}
          <div className="text-body-lg max-w-116.5">
            <p className="mb-4">{about2?.description?.description}</p>
            <p>{about2?.description2?.description2}</p>
          </div>
        </div>
        {/* Large centered quote */}
        <h1 className="sm:text-display text-h3 leading-tighter mx-auto max-w-7xl text-center font-extrabold uppercase">
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
      <div data-header-theme="light" className="px-12 pt-38 pb-28">
        <h1 className="sm:text-display text-h3 mb-12 max-w-xs font-extrabold uppercase">
          {ourValues?.title}
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            {ourValues?.photo?.gatsbyImageData && (
              <GatsbyImage
                image={ourValues.photo.gatsbyImageData}
                alt={ourValues.title || "Image"}
                className="max-w-sm"
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
                    <p className="text-h5 [.peer:checked~*_&]:text-h4 pb-6 leading-none font-extrabold uppercase transition-all duration-200 [.peer:checked~*_&]:pb-8">
                      0{i + 1}.
                    </p>
                    <p className="text-h5 [.peer:checked~*_&]:text-h4 max-w-42 pb-6 leading-none font-extrabold uppercase transition-all duration-200 [.peer:checked~*_&]:max-w-55">
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
      <div data-header-theme="dark" className="bg-ink flex flex-col items-center px-12 py-44">
        <h1 className="sm:text-display max-w-5xl pb-40 text-center text-4xl font-extrabold text-white uppercase">
          Our students&apos; achievements are the true measure of our impact.
        </h1>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="bg-peach flex h-110 flex-col justify-between p-6">
            <p className="text-h4 overflow-hidden font-extrabold text-white uppercase">
              {MOCK_TESTIMONIAL.quote}
            </p>
            <div>
              <p className="text-h4 font-extrabold text-white uppercase">{MOCK_TESTIMONIAL.name}</p>
              <p className="text-body mt-2 font-medium text-white">{MOCK_TESTIMONIAL.school}</p>
              <p className="text-body text-white">{MOCK_TESTIMONIAL.year}</p>
            </div>
          </div>
          <div className="flex h-110 items-center justify-center bg-gray-600">
            <span className="text-white/30">Testimonial Image</span>
          </div>
          <div className="flex h-151.25 items-center justify-center bg-gray-500">
            <span className="text-white/30">Testimonial Image</span>
          </div>
          <div className="flex h-151.5 items-center justify-center bg-gray-400">
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

      {/* Our Team */}
      <div data-header-theme="light" className="px-12 py-20">
        <h1 className="sm:text-display text-h3 mb-10 leading-none font-extrabold uppercase">
          Our
          <br />
          Team
        </h1>
        <div className="mb-10 flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div />
          <p className="text-h5 max-w-136 font-medium">
            Meet our dedicated teachers guiding every student with clarity and confidence.
          </p>
        </div>
        <div className="mb-10 grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
          {MOCK_TUTORS.map((tutor) => (
            <div key={tutor.id} className="flex flex-col gap-8">
              <div className="h-110 bg-gray-300" />
              <div>
                <p className="text-body font-extrabold uppercase">{tutor.name}</p>
                <p className="text-body text-ink/50">{tutor.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="btn btn-secondary text-navy rounded-full uppercase">load more</button>
        </div>
      </div>

      {/* Schools Collaboration */}
      <div data-header-theme="light" className="px-12 pb-28">
        <h1 className="text-h4 max-w-lg pb-16 leading-none font-extrabold uppercase">
          {collaboration?.description?.description}
        </h1>
        <div className="grid grid-cols-2 gap-8 opacity-25 sm:grid-cols-5">
          {collaboration?.photos?.map((photo, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              {photo?.gatsbyImageData && (
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={`Collaboration ${index + 1}`}
                  className="h-28"
                  objectFit="contain"
                />
              )}
              <p className="text-body text-center font-medium text-black">{photo?.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <FAQ />

      {/* Need Guidance CTA */}
      <div data-header-theme="light" className="sm:px-12">
        <div className="bg-sky-soft px-12 py-12">
          <h1 className="text-h4 max-w-127.75 font-extrabold uppercase">
            NEED GUIDANCE? LET&apos;S CHAT.
          </h1>
        </div>
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
