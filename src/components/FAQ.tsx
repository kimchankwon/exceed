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
      <div data-header-theme="light" className="flex flex-col px-12 pb-12">
        <h1 className="text-h4 max-w-78 font-extrabold">FREQUENTLY ASKED QUESTIONS</h1>
      </div>
      <div data-header-theme="light" className="flex flex-col items-end px-12 pb-12">
        {allContentfulFrequentlyAskedQuestions.nodes.map((faq, index) => (
          <div key={faq.id} className="w-full max-w-178">
            <div className="h-px bg-gray-300" />
            <div className="collapse-arrow collapse">
              <input type="checkbox" />
              <div className="collapse-title text-h5 py-4 pl-0">{faq.question}</div>
              <div className="collapse-content text-body-lg px-0">{faq.answer?.answer}</div>
            </div>
            {index === allContentfulFrequentlyAskedQuestions.nodes.length - 1 && (
              <div className="h-px bg-gray-300" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
