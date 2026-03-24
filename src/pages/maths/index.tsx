import * as React from "react";
import SubjectPage from "../../templates/SubjectPage";
import { mathsPageData } from "../../data/subjectPageData";

const MathsPage: React.FC = () => {
  return <SubjectPage data={mathsPageData} />;
};

export default MathsPage;
