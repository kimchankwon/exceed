import * as React from "react";
import SubjectPage from "../../templates/SubjectPage";
import { englishPageData } from "../../data/subjectPageData";

const EnglishPage: React.FC = () => {
  return <SubjectPage data={englishPageData} />;
};

export default EnglishPage;
