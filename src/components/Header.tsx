import { graphql, Link, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  const data = useStaticQuery<Queries.HeaderQueryQuery>(graphql`
    query HeaderQuery {
      header: contentfulHeader(title: { eq: "Header" }) {
        id
        title
        links {
          ... on ContentfulLink {
            id
            title
            url
          }
          ... on ContentfulFooter {
            id
            title
            links {
              id
              title
              url
            }
          }
        }
        buttons {
          id
          title
          url
        }
      }
    }
  `);
  const { header } = data;
  return (
    <header className="navbar fixed top-0 right-0 left-0 z-10 w-full min-w-full opacity-100">
      <div className="navbar-start flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              className="h-5 w-5"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              ></path>
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {header?.links?.map((link) => {
              if (link && "links" in link && link.links) {
                return (
                  <li key={link.id}>
                    <details>
                      <summary>{link.title}</summary>
                      <ul className="p-2">
                        {link.links?.map((l, i) =>
                          l ? (
                            <li key={l.id}>
                              <Link
                                to={l.url ?? ""}
                                className={"link link-hover" + (i % 3 === 0 ? " pt-3" : "")}
                              >
                                {l.title}
                              </Link>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </details>
                  </li>
                );
              }
              if (link && "url" in link) {
                return (
                  <li key={link.id}>
                    <Link to={link.url ?? ""}>{link.title}</Link>
                  </li>
                );
              }
            })}
            <li>
              <Link to="/contact-us" className="btn btn-primary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost flex items-center gap-2 text-xl">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded">
            <span className="text-primary-content text-lg font-bold">X</span>
          </div>
          Exceed Education
        </Link>
      </div>

      <div className="navbar-center hidden flex-1 justify-center lg:flex">
        <ul className="menu menu-horizontal px-1">
          {header?.links?.map((link) => {
            if (link && "links" in link && link.links) {
              return (
                <li key={link.id}>
                  <details>
                    <summary>{link.title}</summary>
                    <ul className="w-52 p-2">
                      {link.links?.map((l, i) =>
                        l ? (
                          <li key={l.id}>
                            <Link
                              to={l.url ?? ""}
                              className={"link link-hover" + (i % 3 === 0 ? " pt-3" : "")}
                            >
                              {l.title}
                            </Link>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </details>
                </li>
              );
            }
            if (link && "url" in link) {
              return (
                <li key={link.id}>
                  <Link to={link.url ?? ""}>{link.title}</Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="navbar-end flex-1 justify-end">
        {header.buttons.map((button) => (
          <Link
            key={button.id}
            to={button.url ?? ""}
            className="btn btn-primary btn-sm rounded-full"
          >
            {button.title}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
