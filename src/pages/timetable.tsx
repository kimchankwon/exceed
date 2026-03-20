import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import SubjectTabSwitcher from "../components/SubjectTabSwitcher";

// --- Types ---
type Subject = "maths" | "english";

type MathsCourseId =
  | "standard-maths"
  | "maths-advanced"
  | "maths-extension-1"
  | "maths-extension-2";

type EnglishCourseId =
  | "standard-english"
  | "english-advanced"
  | "english-extension-1"
  | "english-extension-2";

type CourseId = MathsCourseId | EnglishCourseId;

type ClassTypeId = "school-specific" | "all-schools";

type CalendarView = "dayGridMonth" | "timeGridWeek" | "listWeek";

interface ClassEventExtended {
  year: number;
  classType: ClassTypeId;
  course: CourseId;
  subject: Subject;
  classCount?: number;
}

interface ClassEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: ClassEventExtended;
}

// --- Constants ---
const COURSE_COLORS: Record<CourseId, string> = {
  "standard-maths": "#f87171",
  "maths-advanced": "#4ade80",
  "maths-extension-1": "#a78bfa",
  "maths-extension-2": "#60a5fa",
  "standard-english": "#fb923c",
  "english-advanced": "#facc15",
  "english-extension-1": "#f472b6",
  "english-extension-2": "#34d399",
};

const COURSE_LABELS: Record<CourseId, string> = {
  "standard-maths": "Standard Maths",
  "maths-advanced": "Maths Advanced",
  "maths-extension-1": "Maths Extension 1",
  "maths-extension-2": "Maths Extension 2",
  "standard-english": "Standard English",
  "english-advanced": "English Advanced",
  "english-extension-1": "English Extension 1",
  "english-extension-2": "English Extension 2",
};

const YEARS = [7, 8, 9, 10, 11, 12];

const CLASS_TYPES: { id: ClassTypeId; label: string }[] = [
  { id: "school-specific", label: "School specific" },
  { id: "all-schools", label: "All schools" },
];

const MATHS_COURSES: MathsCourseId[] = [
  "standard-maths",
  "maths-advanced",
  "maths-extension-1",
  "maths-extension-2",
];

const ENGLISH_COURSES: EnglishCourseId[] = [
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
function getMockEvents(): ClassEvent[] {
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
    make(
      "m1",
      "12 MTH X2",
      2,
      "16:30:00",
      "18:30:00",
      "maths-extension-2",
      "maths",
      12,
      "all-schools"
    ),
    make(
      "m2",
      "12 MTH X1",
      4,
      "17:00:00",
      "19:00:00",
      "maths-extension-1",
      "maths",
      12,
      "all-schools",
      2
    ),
    make(
      "m3",
      "12 MTH X2",
      5,
      "16:30:00",
      "18:30:00",
      "maths-extension-2",
      "maths",
      12,
      "all-schools"
    ),
    make(
      "m4",
      "12 MTH ADV",
      1,
      "16:00:00",
      "18:00:00",
      "maths-advanced",
      "maths",
      12,
      "all-schools"
    ),
    make(
      "m5",
      "12 MTH STD",
      3,
      "15:00:00",
      "17:00:00",
      "standard-maths",
      "maths",
      12,
      "school-specific"
    ),
    // Year 11
    make(
      "m6",
      "11 MTH X1",
      2,
      "18:00:00",
      "20:00:00",
      "maths-extension-1",
      "maths",
      11,
      "all-schools"
    ),
    make(
      "m7",
      "11 MTH X2",
      3,
      "17:00:00",
      "19:00:00",
      "maths-extension-2",
      "maths",
      11,
      "school-specific"
    ),
    make(
      "m8",
      "11 MTH ADV",
      5,
      "16:00:00",
      "18:00:00",
      "maths-advanced",
      "maths",
      11,
      "all-schools"
    ),
    make(
      "m9",
      "11 MTH STD",
      1,
      "15:00:00",
      "17:00:00",
      "standard-maths",
      "maths",
      11,
      "school-specific"
    ),
    // Year 10
    make(
      "m10",
      "10 MTH ADV",
      1,
      "16:00:00",
      "18:00:00",
      "maths-advanced",
      "maths",
      10,
      "all-schools"
    ),
    make(
      "m11",
      "10 MTH STD",
      3,
      "15:00:00",
      "17:00:00",
      "standard-maths",
      "maths",
      10,
      "school-specific"
    ),
    make(
      "m12",
      "10 MTH X1",
      4,
      "16:00:00",
      "18:00:00",
      "maths-extension-1",
      "maths",
      10,
      "all-schools"
    ),
    // Year 9
    make(
      "m13",
      "9 MTH ADV",
      4,
      "16:00:00",
      "18:00:00",
      "maths-advanced",
      "maths",
      9,
      "all-schools"
    ),
    make(
      "m14",
      "9 MTH STD",
      5,
      "15:00:00",
      "17:00:00",
      "standard-maths",
      "maths",
      9,
      "school-specific"
    ),
    make(
      "m15",
      "9 MTH STD",
      2,
      "14:00:00",
      "16:00:00",
      "standard-maths",
      "maths",
      9,
      "all-schools"
    ),
    // Year 8
    make(
      "m16",
      "8 MTH STD",
      1,
      "17:00:00",
      "18:30:00",
      "standard-maths",
      "maths",
      8,
      "all-schools"
    ),
    make(
      "m17",
      "8 MTH STD",
      4,
      "15:00:00",
      "16:30:00",
      "standard-maths",
      "maths",
      8,
      "school-specific"
    ),
    // Year 7
    make(
      "m18",
      "7 MTH STD",
      2,
      "16:00:00",
      "17:30:00",
      "standard-maths",
      "maths",
      7,
      "school-specific"
    ),
    make(
      "m19",
      "7 MTH STD",
      6,
      "10:00:00",
      "11:30:00",
      "standard-maths",
      "maths",
      7,
      "all-schools"
    ),

    // === ENGLISH ===
    // Year 12
    make(
      "e1",
      "12 ENG X2",
      1,
      "16:30:00",
      "18:30:00",
      "english-extension-2",
      "english",
      12,
      "all-schools"
    ),
    make(
      "e2",
      "12 ENG X1",
      3,
      "17:00:00",
      "19:00:00",
      "english-extension-1",
      "english",
      12,
      "all-schools"
    ),
    make(
      "e3",
      "12 ENG ADV",
      5,
      "16:00:00",
      "18:00:00",
      "english-advanced",
      "english",
      12,
      "all-schools"
    ),
    make(
      "e4",
      "12 ENG STD",
      2,
      "15:00:00",
      "17:00:00",
      "standard-english",
      "english",
      12,
      "school-specific"
    ),
    // Year 11
    make(
      "e5",
      "11 ENG X1",
      1,
      "18:00:00",
      "20:00:00",
      "english-extension-1",
      "english",
      11,
      "all-schools"
    ),
    make(
      "e6",
      "11 ENG ADV",
      4,
      "16:00:00",
      "18:00:00",
      "english-advanced",
      "english",
      11,
      "all-schools"
    ),
    make(
      "e7",
      "11 ENG STD",
      2,
      "17:00:00",
      "19:00:00",
      "standard-english",
      "english",
      11,
      "school-specific"
    ),
    // Year 10
    make(
      "e8",
      "10 ENG ADV",
      2,
      "16:00:00",
      "18:00:00",
      "english-advanced",
      "english",
      10,
      "all-schools"
    ),
    make(
      "e9",
      "10 ENG STD",
      4,
      "15:00:00",
      "17:00:00",
      "standard-english",
      "english",
      10,
      "school-specific"
    ),
    // Year 9
    make(
      "e10",
      "9 ENG ADV",
      3,
      "16:00:00",
      "18:00:00",
      "english-advanced",
      "english",
      9,
      "all-schools"
    ),
    make(
      "e11",
      "9 ENG STD",
      5,
      "14:00:00",
      "16:00:00",
      "standard-english",
      "english",
      9,
      "school-specific"
    ),
    // Year 8
    make(
      "e12",
      "8 ENG STD",
      3,
      "17:00:00",
      "18:30:00",
      "standard-english",
      "english",
      8,
      "all-schools"
    ),
    // Year 7
    make(
      "e13",
      "7 ENG STD",
      1,
      "15:00:00",
      "16:30:00",
      "standard-english",
      "english",
      7,
      "school-specific"
    ),
    make(
      "e14",
      "7 ENG STD",
      6,
      "11:30:00",
      "13:00:00",
      "standard-english",
      "english",
      7,
      "all-schools"
    ),
  ];
}

// --- Event Content Renderer ---
function renderEventContent(eventInfo: {
  timeText: string;
  view: { type: string };
  event: { title: string; extendedProps: ClassEventExtended };
}) {
  if (eventInfo.view.type === "dayGridMonth") {
    return true;
  }
  const { classCount } = eventInfo.event.extendedProps;
  return (
    <div className="overflow-hidden px-2 py-1 text-xs leading-tight text-black">
      <p className="font-medium">{eventInfo.timeText}</p>
      <p className={`font-bold ${eventInfo.timeText ? "py-2" : ""}`}>{eventInfo.event.title}</p>
      {classCount && <p className="font-medium">{classCount} CLASSES</p>}
    </div>
  );
}

// --- Collapsible Filter Section ---
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-1 text-sm font-semibold"
      >
        {title}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}

// --- Page ---
const SchedulePage: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<Subject>("maths");
  const [selectedYears, setSelectedYears] = useState<number[]>([12]);
  const [selectedClassTypes, setSelectedClassTypes] = useState<ClassTypeId[]>(["all-schools"]);
  const [selectedCourses, setSelectedCourses] = useState<CourseId[]>([
    "maths-extension-1",
    "maths-extension-2",
  ]);
  const [currentView, setCurrentView] = useState<CalendarView>("timeGridWeek");
  const [isMounted, setIsMounted] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);

  const mockEvents = useMemo(() => getMockEvents(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset course selection when switching subjects
  const prevSubjectRef = useRef(activeSubject);
  useEffect(() => {
    if (prevSubjectRef.current !== activeSubject) {
      prevSubjectRef.current = activeSubject;
      if (activeSubject === "maths") {
        setSelectedCourses(["maths-extension-1", "maths-extension-2"]);
      } else {
        setSelectedCourses(["english-extension-1", "english-extension-2"]);
      }
    }
  }, [activeSubject]);

  const activeCourses: CourseId[] = activeSubject === "maths" ? MATHS_COURSES : ENGLISH_COURSES;

  const filteredEvents = useMemo(
    () =>
      mockEvents.filter(
        (e) =>
          e.extendedProps.subject === activeSubject &&
          selectedYears.includes(e.extendedProps.year) &&
          selectedClassTypes.includes(e.extendedProps.classType) &&
          selectedCourses.includes(e.extendedProps.course)
      ),
    [mockEvents, activeSubject, selectedYears, selectedClassTypes, selectedCourses]
  );

  function toggleItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  function switchView(view: CalendarView) {
    setCurrentView(view);
    calendarRef.current?.getApi().changeView(view);
  }

  return (
    <div>
      {/* Header */}
      <div
        data-header-theme="light"
        className="flex flex-col items-center justify-center gap-7 px-12 pt-54 pb-20"
      >
        <h1 className="sm:text-display max-w-3xl text-center text-4xl font-extrabold uppercase">
          CLASS TIMETABLE
        </h1>
        <p className="text-body max-w-md text-center tracking-wide">
          With expert guidance, we help students strengthen their skills, build confidence, and
          achieve lasting results.
        </p>
      </div>

      {/* Subject Tab Switcher */}
      <div data-header-theme="light" className="flex flex-col items-center">
        <SubjectTabSwitcher activeSubject={activeSubject} onSubjectChange={setActiveSubject} />
      </div>
      <div data-header-theme="light" className="sm:p-12">
        {/* Sidebar + Calendar */}
        <div className="flex flex-col sm:flex-row">
          {/* Sidebar */}
          <aside className="shrink-0 bg-gray-100 pr-0 sm:w-56 sm:rounded-l-2xl sm:p-8">
            <FilterSection title="Year">
              {YEARS.map((year) => (
                <label key={year} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    checked={selectedYears.includes(year)}
                    onChange={() => setSelectedYears((prev) => toggleItem(prev, year))}
                  />
                  Year {year}
                </label>
              ))}
            </FilterSection>

            <div className="my-4 border-t border-gray-200" />

            <FilterSection title="Class Type">
              {CLASS_TYPES.map((ct) => (
                <label key={ct.id} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    checked={selectedClassTypes.includes(ct.id)}
                    onChange={() => setSelectedClassTypes((prev) => toggleItem(prev, ct.id))}
                  />
                  {ct.label}
                </label>
              ))}
            </FilterSection>

            <div className="my-4 border-t border-gray-200" />

            <FilterSection title="Course">
              {activeCourses.map((course) => (
                <label key={course} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    style={{ accentColor: COURSE_COLORS[course] }}
                    checked={selectedCourses.includes(course)}
                    onChange={() => setSelectedCourses((prev) => toggleItem(prev, course))}
                  />
                  {COURSE_LABELS[course]}
                </label>
              ))}
            </FilterSection>
          </aside>

          {/* Calendar */}
          <main className="flex-1 bg-gray-100 sm:rounded-r-2xl sm:p-8">
            {/* View toggle + navigation */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                {(
                  [
                    { view: "dayGridMonth" as CalendarView, label: "Month" },
                    { view: "timeGridWeek" as CalendarView, label: "Week" },
                    { view: "listWeek" as CalendarView, label: "List" },
                  ] as const
                ).map(({ view, label }) => (
                  <button
                    key={view}
                    onClick={() => switchView(view)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:cursor-pointer ${
                      currentView === view
                        ? "bg-black text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => calendarRef.current?.getApi().prev()}
                  className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-50"
                >
                  ←
                </button>
                <button
                  onClick={() => calendarRef.current?.getApi().today()}
                  className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-50"
                >
                  Today
                </button>
                <button
                  onClick={() => calendarRef.current?.getApi().next()}
                  className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-50"
                >
                  →
                </button>
              </div>
            </div>

            <div className="bg-white">
              {isMounted && (
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                  initialView="timeGridWeek"
                  firstDay={1}
                  headerToolbar={false}
                  slotMinTime="09:00:00"
                  slotMaxTime="22:00:00"
                  allDaySlot={false}
                  editable={false}
                  selectable={false}
                  events={filteredEvents}
                  eventContent={renderEventContent}
                  eventDisplay="auto"
                  height="auto"
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
