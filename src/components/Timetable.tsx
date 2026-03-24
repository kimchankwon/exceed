import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {
  type Subject,
  type CourseId,
  type ClassTypeId,
  type CalendarView,
  type ClassEventExtended,
  COURSE_COLORS,
  COURSE_LABELS,
  YEARS,
  CLASS_TYPES,
  MATHS_COURSES,
  ENGLISH_COURSES,
  getMockEvents,
} from "../data/timetableData";

interface TimetableProps {
  subject: Subject;
}

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

const Timetable: React.FC<TimetableProps> = ({ subject }) => {
  const [selectedYears, setSelectedYears] = useState<number[]>([12]);
  const [selectedClassTypes, setSelectedClassTypes] = useState<ClassTypeId[]>(["all-schools"]);
  const [selectedCourses, setSelectedCourses] = useState<CourseId[]>(
    subject === "maths"
      ? ["maths-extension-1", "maths-extension-2"]
      : ["english-extension-1", "english-extension-2"]
  );
  const [currentView, setCurrentView] = useState<CalendarView>("timeGridWeek");
  const [isMounted, setIsMounted] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);

  const mockEvents = useMemo(() => getMockEvents(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset course selection when subject changes
  const prevSubjectRef = useRef(subject);
  useEffect(() => {
    if (prevSubjectRef.current !== subject) {
      prevSubjectRef.current = subject;
      if (subject === "maths") {
        setSelectedCourses(["maths-extension-1", "maths-extension-2"]);
      } else {
        setSelectedCourses(["english-extension-1", "english-extension-2"]);
      }
    }
  }, [subject]);

  const activeCourses: CourseId[] = subject === "maths" ? MATHS_COURSES : ENGLISH_COURSES;

  const filteredEvents = useMemo(
    () =>
      mockEvents.filter(
        (e) =>
          e.extendedProps.subject === subject &&
          selectedYears.includes(e.extendedProps.year) &&
          selectedClassTypes.includes(e.extendedProps.classType) &&
          selectedCourses.includes(e.extendedProps.course)
      ),
    [mockEvents, subject, selectedYears, selectedClassTypes, selectedCourses]
  );

  function toggleItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  function switchView(view: CalendarView) {
    setCurrentView(view);
    calendarRef.current?.getApi().changeView(view);
  }

  return (
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
              &larr;
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
              &rarr;
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
  );
};

export default Timetable;
