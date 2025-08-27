import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <main className="text-center px-4">
        <div className="card bg-base-200 shadow-xl max-w-md mx-auto">
          <div className="card-body">
            <h1 className="text-4xl font-bold mb-6 text-error">
              Page not found
            </h1>
            <p className="text-lg mb-6">
              Sorry 😔, we couldn't find what you were looking for.
              <br />
              {process.env.NODE_ENV === "development" ? (
                <>
                  <br />
                  Try creating a page in{" "}
                  <code className="bg-base-100 px-2 py-1 rounded text-sm">
                    src/pages/
                  </code>
                  .
                  <br />
                </>
              ) : null}
              <br />
              <Link to="/" className="btn btn-primary">
                Go home
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
