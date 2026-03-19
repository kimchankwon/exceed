import { graphql, type PageProps } from "gatsby";
import * as React from "react";

const TermsAndConditionsPage: React.FC<PageProps<Queries.TermsAndConditionsPageQueryQuery>> = ({
  data,
}) => {
  const { termsAndConditions } = data;

  return (
    <div>
      <div data-header-theme="light" className="flex flex-col gap-12 px-12 pt-36 pb-28">
        <h1 className="items-self-start text-2xl font-extrabold text-black">
          {termsAndConditions?.title}
        </h1>
        <div className="flex flex-col items-end">
          {termsAndConditions?.list?.map((tnc, index) =>
            tnc ? (
              <div key={tnc.id} className="w-full max-w-lg">
                <div className="my-4 h-px bg-gray-300" />
                <div className="mb-2 text-[15px] font-semibold">{tnc.title}</div>
                <p className="max-w-sm text-[12px]">{tnc.description?.description}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;

export const termsAndConditionsPageQuery = graphql`
  query TermsAndConditionsPageQuery {
    termsAndConditions: contentfulTermsAndConditionsList(title: { eq: "TERMS & CONDITIONS" }) {
      title
      list {
        id
        title
        description {
          description
        }
      }
    }
  }
`;
