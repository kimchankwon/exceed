import type { Subject } from "./timetableData";

export interface YearGroupPill {
  label: string;
  href: string;
}

export interface SubjectPageData {
  subject: Subject;
  hero: {
    headline: string;
  };
  yearGroupPills: YearGroupPill[];
  heroImage: {
    alt: string;
  };
  approach: {
    heading: string;
    paragraphs: string[];
  };
  centeredHeading: string;
  fastTrack: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    image: { alt: string };
  };
  timetable: {
    heading: string;
    subtitle: string;
  };
  enrollment: {
    collapsedText: string;
  };
}

export const mathsPageData: SubjectPageData = {
  subject: "maths",
  hero: {
    headline: "MASTER MATHS WITH CONFIDENCE AND PRECISION",
  },
  yearGroupPills: [
    { label: "MATHS YEAR 7-8", href: "/maths/7-8" },
    { label: "MATHS YEAR 9-10", href: "/maths/9-10" },
    { label: "MATHS YEAR 11-12", href: "/maths/11-12" },
  ],
  heroImage: {
    alt: "Maths classroom",
  },
  approach: {
    heading: "OUR APPROACH",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales.",
      "Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
    ],
  },
  centeredHeading: "PERSONALISED AND TARGETED APPROACH TO TUTORING",
  fastTrack: {
    heading: "FAST-TRACK SERVICE",
    description:
      "Our Fast-Track Maths service provides focused one-on-one support to help students strengthen core skills and build confidence quickly. With personalised lessons and clear benchmarks, it makes it easier for students to stay on top of their studies and feel prepared for every challenge in Year 11 and 12 Maths.",
    buttonText: "ASK ABOUT FAST-TRACK",
    buttonHref: "/contact-us",
    image: { alt: "Fast-track tutoring" },
  },
  timetable: {
    heading: "MATHS CLASS TIMETABLE",
    subtitle: "CLASSES CONTINUE INTO THE HOLIDAYS",
  },
  enrollment: {
    collapsedText: "READY TO BEGIN? ENROL NOW.",
  },
};

export const englishPageData: SubjectPageData = {
  subject: "english",
  hero: {
    headline: "MASTER ENGLISH WITH CONFIDENCE AND CLARITY",
  },
  yearGroupPills: [
    { label: "ENGLISH YEAR 7-8", href: "/english/7-8" },
    { label: "ENGLISH YEAR 9-10", href: "/english/9-10" },
    { label: "ENGLISH YEAR 11-12", href: "/english/11-12" },
  ],
  heroImage: {
    alt: "English classroom",
  },
  approach: {
    heading: "OUR APPROACH",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales.",
      "Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
    ],
  },
  centeredHeading: "PERSONALISED AND TARGETED APPROACH TO TUTORING",
  fastTrack: {
    heading: "FAST-TRACK SERVICE",
    description:
      "Our Fast-Track English service provides focused one-on-one support to help students strengthen core skills and build confidence quickly. With personalised lessons and clear benchmarks, it makes it easier for students to stay on top of their studies and feel prepared for every challenge in Year 11 and 12 English.",
    buttonText: "ASK ABOUT FAST-TRACK",
    buttonHref: "/contact-us",
    image: { alt: "Fast-track tutoring" },
  },
  timetable: {
    heading: "ENGLISH CLASS TIMETABLE",
    subtitle: "CLASSES CONTINUE INTO THE HOLIDAYS",
  },
  enrollment: {
    collapsedText: "READY TO BEGIN? ENROL NOW.",
  },
};
