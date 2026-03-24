import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <div
      data-header-theme="light"
      className="bg-base-100 flex min-h-screen items-center justify-center"
    >
      <main className="px-4 text-center">
        <div className="card bg-base-200 mx-auto max-w-md shadow-xl">
          <div className="card-body">
            <h1 className="text-error mb-6 text-4xl font-bold">Page not found</h1>
            <p className="mb-6 text-lg">
              Sorry 😔, we couldn&apos;t find what you were looking for.
              <br />
              {process.env.NODE_ENV === "development" ? (
                <>
                  <br />
                  Try creating a page in
                  <code className="bg-base-100 rounded px-2 py-1 text-sm">src/pages/</code>
                  .
                  <br />
                </>
              ) : null}
              <br />
              <Link to="/" className="btn btn-primary h-11">
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
