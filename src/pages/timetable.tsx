import * as React from "react";
import { useState } from "react";
import SubjectTabSwitcher from "../components/SubjectTabSwitcher";
import Timetable from "../components/Timetable";
import type { Subject } from "../data/timetableData";

const SchedulePage: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<Subject>("maths");

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
        <p className="text-body max-w-md text-center">
          With expert guidance, we help students strengthen their skills, build confidence, and
          achieve lasting results.
        </p>
      </div>

      {/* Subject Tab Switcher */}
      <div data-header-theme="light" className="flex flex-col items-center">
        <SubjectTabSwitcher activeSubject={activeSubject} onSubjectChange={setActiveSubject} />
      </div>

      {/* Timetable */}
      <div data-header-theme="light" className="sm:p-12">
        <Timetable subject={activeSubject} />
      </div>
    </div>
  );
};

export default SchedulePage;
