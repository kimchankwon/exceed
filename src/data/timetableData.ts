// --- Types ---
export type Subject = "maths" | "english";

export type MathsCourseId =
  | "standard-maths"
  | "maths-advanced"
  | "maths-extension-1"
  | "maths-extension-2";

export type EnglishCourseId =
  | "standard-english"
  | "english-advanced"
  | "english-extension-1"
  | "english-extension-2";

export type CourseId = MathsCourseId | EnglishCourseId;

export type ClassTypeId = "school-specific" | "all-schools";

export type CalendarView = "dayGridMonth" | "timeGridWeek" | "listWeek";

export interface ClassEventExtended {
  year: number;
  classType: ClassTypeId;
  course: CourseId;
  subject: Subject;
  classCount?: number;
}

export interface ClassEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: ClassEventExtended;
}

// --- Constants ---
export const COURSE_COLORS: Record<CourseId, string> = {
  "standard-maths": "#f87171",
  "maths-advanced": "#4ade80",
  "maths-extension-1": "#a78bfa",
  "maths-extension-2": "#60a5fa",
  "standard-english": "#fb923c",
  "english-advanced": "#facc15",
  "english-extension-1": "#f472b6",
  "english-extension-2": "#34d399",
};

export const COURSE_LABELS: Record<CourseId, string> = {
  "standard-maths": "Standard Maths",
  "maths-advanced": "Maths Advanced",
  "maths-extension-1": "Maths Extension 1",
  "maths-extension-2": "Maths Extension 2",
  "standard-english": "Standard English",
  "english-advanced": "English Advanced",
  "english-extension-1": "English Extension 1",
  "english-extension-2": "English Extension 2",
};

export const YEARS = [7, 8, 9, 10, 11, 12];

export const CLASS_TYPES: { id: ClassTypeId; label: string }[] = [
  { id: "school-specific", label: "School specific" },
  { id: "all-schools", label: "All schools" },
];

export const MATHS_COURSES: MathsCourseId[] = [
  "standard-maths",
  "maths-advanced",
  "maths-extension-1",
  "maths-extension-2",
];

export const ENGLISH_COURSES: EnglishCourseId[] = [
  "standard-english",
  "english-advanced",
  "english-extension-1",
  "english-extension-2",
];

// Returns an ISO datetime string for a given day-of-week (0=Sun, 1=Mon…) and time
// anchored to the current week so events always appear in the default view.
function weekDate(dayOfWeek: number, time: string): string {
  const today = new Date();
  const diff = dayOfWeek - today.getDay();
  const target = new Date(today);
  target.setDate(today.getDate() + diff);
  const dateStr = target.toISOString().split("T")[0];
  return `${dateStr}T${time}`;
}

// --- Mock Data ---
export function getMockEvents(): ClassEvent[] {
  const make = (
    id: string,
    title: string,
    day: number,
    startTime: string,
    endTime: string,
    course: CourseId,
    subject: Subject,
    year: number,
    classType: ClassTypeId,
    classCount?: number
  ): ClassEvent => ({
    id,
    title,
    start: weekDate(day, startTime),
    end: weekDate(day, endTime),
    backgroundColor: COURSE_COLORS[course],
    borderColor: COURSE_COLORS[course],
    extendedProps: { year, classType, course, subject, classCount },
  });

  return [
    // === MATHS ===
    // Year 12
    make("m1", "12 MTH X2", 2, "16:30:00", "18:30:00", "maths-extension-2", "maths", 12, "all-schools"),
    make("m2", "12 MTH X1", 4, "17:00:00", "19:00:00", "maths-extension-1", "maths", 12, "all-schools", 2),
    make("m3", "12 MTH X2", 5, "16:30:00", "18:30:00", "maths-extension-2", "maths", 12, "all-schools"),
    make("m4", "12 MTH ADV", 1, "16:00:00", "18:00:00", "maths-advanced", "maths", 12, "all-schools"),
    make("m5", "12 MTH STD", 3, "15:00:00", "17:00:00", "standard-maths", "maths", 12, "school-specific"),
    // Year 11
    make("m6", "11 MTH X1", 2, "18:00:00", "20:00:00", "maths-extension-1", "maths", 11, "all-schools"),
    make("m7", "11 MTH X2", 3, "17:00:00", "19:00:00", "maths-extension-2", "maths", 11, "school-specific"),
    make("m8", "11 MTH ADV", 5, "16:00:00", "18:00:00", "maths-advanced", "maths", 11, "all-schools"),
    make("m9", "11 MTH STD", 1, "15:00:00", "17:00:00", "standard-maths", "maths", 11, "school-specific"),
    // Year 10
    make("m10", "10 MTH ADV", 1, "16:00:00", "18:00:00", "maths-advanced", "maths", 10, "all-schools"),
    make("m11", "10 MTH STD", 3, "15:00:00", "17:00:00", "standard-maths", "maths", 10, "school-specific"),
    make("m12", "10 MTH X1", 4, "16:00:00", "18:00:00", "maths-extension-1", "maths", 10, "all-schools"),
    // Year 9
    make("m13", "9 MTH ADV", 4, "16:00:00", "18:00:00", "maths-advanced", "maths", 9, "all-schools"),
    make("m14", "9 MTH STD", 5, "15:00:00", "17:00:00", "standard-maths", "maths", 9, "school-specific"),
    make("m15", "9 MTH STD", 2, "14:00:00", "16:00:00", "standard-maths", "maths", 9, "all-schools"),
    // Year 8
    make("m16", "8 MTH STD", 1, "17:00:00", "18:30:00", "standard-maths", "maths", 8, "all-schools"),
    make("m17", "8 MTH STD", 4, "15:00:00", "16:30:00", "standard-maths", "maths", 8, "school-specific"),
    // Year 7
    make("m18", "7 MTH STD", 2, "16:00:00", "17:30:00", "standard-maths", "maths", 7, "school-specific"),
    make("m19", "7 MTH STD", 6, "10:00:00", "11:30:00", "standard-maths", "maths", 7, "all-schools"),

    // === ENGLISH ===
    // Year 12
    make("e1", "12 ENG X2", 1, "16:30:00", "18:30:00", "english-extension-2", "english", 12, "all-schools"),
    make("e2", "12 ENG X1", 3, "17:00:00", "19:00:00", "english-extension-1", "english", 12, "all-schools"),
    make("e3", "12 ENG ADV", 5, "16:00:00", "18:00:00", "english-advanced", "english", 12, "all-schools"),
    make("e4", "12 ENG STD", 2, "15:00:00", "17:00:00", "standard-english", "english", 12, "school-specific"),
    // Year 11
    make("e5", "11 ENG X1", 1, "18:00:00", "20:00:00", "english-extension-1", "english", 11, "all-schools"),
    make("e6", "11 ENG ADV", 4, "16:00:00", "18:00:00", "english-advanced", "english", 11, "all-schools"),
    make("e7", "11 ENG STD", 2, "17:00:00", "19:00:00", "standard-english", "english", 11, "school-specific"),
    // Year 10
    make("e8", "10 ENG ADV", 2, "16:00:00", "18:00:00", "english-advanced", "english", 10, "all-schools"),
    make("e9", "10 ENG STD", 4, "15:00:00", "17:00:00", "standard-english", "english", 10, "school-specific"),
    // Year 9
    make("e10", "9 ENG ADV", 3, "16:00:00", "18:00:00", "english-advanced", "english", 9, "all-schools"),
    make("e11", "9 ENG STD", 5, "14:00:00", "16:00:00", "standard-english", "english", 9, "school-specific"),
    // Year 8
    make("e12", "8 ENG STD", 3, "17:00:00", "18:30:00", "standard-english", "english", 8, "all-schools"),
    // Year 7
    make("e13", "7 ENG STD", 1, "15:00:00", "16:30:00", "standard-english", "english", 7, "school-specific"),
    make("e14", "7 ENG STD", 6, "11:30:00", "13:00:00", "standard-english", "english", 7, "all-schools"),
  ];
}
