import { graphql, useStaticQuery } from "gatsby";

const FAQ = () => {
  const data = useStaticQuery<Queries.FAQQueryQuery>(graphql`
    query FAQQuery {
      allContentfulFrequentlyAskedQuestions(sort: [{ order: ASC }]) {
        nodes {
          id
          order
          question
          answer {
            answer
          }
        }
      }
    }
  `);

  const { allContentfulFrequentlyAskedQuestions } = data;

  return (
    <>
      <div data-header-theme="light" className="flex flex-col px-8 pb-12">
        <h1 className="max-w-[230px] text-2xl leading-6 font-extrabold">
          FREQUENTLY ASKED QUESTIONS
        </h1>
      </div>
      <div data-header-theme="light" className="flex flex-col items-end px-8 pb-12">
        {allContentfulFrequentlyAskedQuestions.nodes.map((faq, index) => (
          <div key={faq.id} className="w-full max-w-md">
            <div className="collapse-arrow collapse">
              <input type="checkbox" />
              <div className="collapse-title text-md py-3 pl-0">{faq.question}</div>
              <div className="collapse-content px-0 text-sm">{faq.answer?.answer}</div>
            </div>
            {index < allContentfulFrequentlyAskedQuestions.nodes.length - 1 && (
              <div className="h-px bg-gray-300" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
