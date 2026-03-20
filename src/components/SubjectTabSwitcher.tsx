import * as React from "react";

type Subject = "maths" | "english";

interface SubjectTabSwitcherProps {
  activeSubject: Subject;
  onSubjectChange: (subject: Subject) => void;
}

const SubjectTabSwitcher: React.FC<SubjectTabSwitcherProps> = ({ activeSubject, onSubjectChange }) => {
  return (
    <div className="relative flex pb-5">
      <button
        className={`text-body relative z-10 rounded-full py-3 pl-5 font-medium uppercase transition-colors hover:cursor-pointer ${
          activeSubject === "maths" ? "bg-ink pr-5 text-white" : "bg-grey text-ink z-10 pr-11"
        }`}
        onClick={() => onSubjectChange("maths")}
      >
        math
      </button>
      <button
        className={`text-body -ml-8 rounded-full py-3 pr-5 font-medium uppercase transition-colors hover:cursor-pointer ${
          activeSubject === "english" ? "bg-ink z-10 pl-5 text-white" : "bg-grey text-ink pl-11"
        }`}
        onClick={() => onSubjectChange("english")}
      >
        english
      </button>
    </div>
  );
};

export default SubjectTabSwitcher;
