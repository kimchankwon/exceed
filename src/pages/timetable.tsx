import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

// --- Types ---
type CourseId =
  | "standard-maths"
  | "maths-advanced"
  | "maths-extension-1"
  | "maths-extension-2";
type ClassTypeId = "school-specific" | "all-schools";

interface ClassEventExtended {
  year: number;
  classType: ClassTypeId;
  course: CourseId;
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
};

const COURSE_LABELS: Record<CourseId, string> = {
  "standard-maths": "Standard Maths",
  "maths-advanced": "Maths Advanced",
  "maths-extension-1": "Maths Extension 1",
  "maths-extension-2": "Maths Extension 2",
};

const YEARS = [7, 8, 9, 10, 11, 12];

const CLASS_TYPES: { id: ClassTypeId; label: string }[] = [
  { id: "school-specific", label: "School specific" },
  { id: "all-schools", label: "All schools" },
];

const COURSES: CourseId[] = [
  "standard-maths",
  "maths-advanced",
  "maths-extension-1",
  "maths-extension-2",
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
    extendedProps: { year, classType, course, classCount },
  });

  return [
    // Year 12
    make("1", "12 MTH X2", 2, "16:30:00", "18:30:00", "maths-extension-2", 12, "all-schools"),
    make("2", "12 MTH X1", 4, "17:00:00", "19:00:00", "maths-extension-1", 12, "all-schools", 2),
    make("3", "12 MTH X2", 5, "16:30:00", "18:30:00", "maths-extension-2", 12, "all-schools"),
    // Year 11
    make("4", "11 MTH X1", 2, "18:00:00", "20:00:00", "maths-extension-1", 11, "all-schools"),
    make("5", "11 MTH X2", 3, "17:00:00", "19:00:00", "maths-extension-2", 11, "school-specific"),
    // Year 10
    make("6", "10 MTH ADV", 1, "16:00:00", "18:00:00", "maths-advanced", 10, "all-schools"),
    make("7", "10 MTH STD", 3, "15:00:00", "17:00:00", "standard-maths", 10, "school-specific"),
    // Year 9
    make("8", "9 MTH ADV", 4, "16:00:00", "18:00:00", "maths-advanced", 9, "all-schools"),
    make("9", "9 MTH STD", 5, "15:00:00", "17:00:00", "standard-maths", 9, "school-specific"),
    // Year 8
    make("10", "8 MTH STD", 1, "17:00:00", "18:30:00", "standard-maths", 8, "all-schools"),
    // Year 7
    make("11", "7 MTH STD", 2, "16:00:00", "17:30:00", "standard-maths", 7, "school-specific"),
  ];
}

// --- Event Content Renderer ---
function renderEventContent(eventInfo: {
  timeText: string;
  event: { title: string; extendedProps: ClassEventExtended };
}) {
  const { classCount } = eventInfo.event.extendedProps;
  return (
    <div className="overflow-hidden p-1 text-xs font-bold leading-tight text-white">
      <div>{eventInfo.timeText}</div>
      <div>{eventInfo.event.title}</div>
      {classCount && <div>{classCount} CLASSES</div>}
    </div>
  );
}

// --- Collapsible Filter Section ---
function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
  const [selectedYears, setSelectedYears] = useState<number[]>([12]);
  const [selectedClassTypes, setSelectedClassTypes] = useState<ClassTypeId[]>(["all-schools"]);
  const [selectedCourses, setSelectedCourses] = useState<CourseId[]>([
    "maths-extension-1",
    "maths-extension-2",
  ]);
  const [currentView, setCurrentView] = useState<"timeGridWeek" | "listWeek">("timeGridWeek");
  const [isMounted, setIsMounted] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);

  const mockEvents = useMemo(() => getMockEvents(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredEvents = useMemo(
    () =>
      mockEvents.filter(
        (e) =>
          selectedYears.includes(e.extendedProps.year) &&
          selectedClassTypes.includes(e.extendedProps.classType) &&
          selectedCourses.includes(e.extendedProps.course)
      ),
    [mockEvents, selectedYears, selectedClassTypes, selectedCourses]
  );

  function toggleItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  function switchView(view: "timeGridWeek" | "listWeek") {
    setCurrentView(view);
    calendarRef.current?.getApi().changeView(view);
  }

  return (
    <div data-header-theme="light" className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 overflow-y-auto bg-gray-100 px-6 pb-8 pt-40">
        <FilterSection title="Year">
          {YEARS.map((year) => (
            <label key={year} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
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
                className="h-4 w-4"
                checked={selectedClassTypes.includes(ct.id)}
                onChange={() => setSelectedClassTypes((prev) => toggleItem(prev, ct.id))}
              />
              {ct.label}
            </label>
          ))}
        </FilterSection>

        <div className="my-4 border-t border-gray-200" />

        <FilterSection title="Course">
          {COURSES.map((course) => (
            <label key={course} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
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
      <main className="flex-1 px-8 pb-8 pt-36">
        {/* View toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => switchView("timeGridWeek")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              currentView === "timeGridWeek"
                ? "bg-black text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => switchView("listWeek")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              currentView === "listWeek"
                ? "bg-black text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            List
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {isMounted && (
            <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, listPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{ left: "prev,next", center: "title", right: "" }}
              slotMinTime="09:00:00"
              slotMaxTime="22:00:00"
              allDaySlot={false}
              editable={false}
              selectable={false}
              events={filteredEvents}
              eventContent={renderEventContent}
              height="auto"
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SchedulePage;
