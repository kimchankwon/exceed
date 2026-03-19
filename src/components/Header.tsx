import { graphql, Link, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";
import { useHeaderThemeContext } from "./HeaderThemeContext";
import logoWhite from "../images/logo-white.svg";
import logoBlack from "../images/logo-black.svg";

const Header = () => {
  const location = useLocation();

  // TODO show active
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
  const headerTheme = useHeaderThemeContext();
  const isDark = headerTheme === "dark";

  return (
    <header
      className={`navbar text-nav fixed top-0 right-0 left-0 z-10 grid w-full min-w-full grid-cols-[1fr_auto_1fr] py-0 pr-4 pl-0 transition-colors duration-0 sm:h-18 sm:px-8 ${isDark ? "text-white" : "text-black"}`}
    >
      {/* Gradient backdrop blur overlay */}
      <div
        className="pointer-events-none absolute inset-0 -bottom-4 backdrop-blur-lg"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
      <div className="navbar-start relative z-1 justify-self-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="cursor-pointer p-4 sm:hidden">
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
                strokeWidth="1"
                d="M4 6h16M4 12h8m-8 6h16"
              ></path>
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box w-42 p-2 text-black shadow"
          >
            {header?.links?.map((link) => {
              if (link && "links" in link && link.links) {
                return (
                  <li key={link.id}>
                    <details>
                      <summary className="text-xs">{link.title}</summary>
                      <ul className="p-2">
                        {link.links?.map((l, i) =>
                          l ? (
                            <li key={l.id}>
                              <Link
                                to={l.url ?? ""}
                                className={"link link-hover text-xs" + (i % 3 === 0 ? " pt-3" : "")}
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
                    <Link className="link link-hover text-xs" to={link.url ?? ""}>
                      {link.title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <Link to="/" className="link shrink-0">
          <img src={isDark ? logoWhite : logoBlack} alt="Exceed" className="h-7" />
        </Link>
      </div>
      <div className="navbar-center relative z-1 hidden justify-center gap-8 sm:block">
        <ul className="menu menu-horizontal gap-4 px-1">
          {header?.links?.map((link) => {
            if (link && "links" in link && link.links) {
              return (
                <li key={link.id}>
                  <details>
                    <summary className="text-xs">{link.title?.toUpperCase()}</summary>
                    <ul className="w-36 p-2 text-black">
                      {link.links?.map((l, i) =>
                        l ? (
                          <li key={l.id}>
                            <Link
                              to={l.url ?? ""}
                              className={"link link-hover text-xs" + (i % 3 === 2 ? " pb-3" : "")}
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
                  <Link className="link link-hover text-xs" to={link.url ?? ""}>
                    {link.title?.toUpperCase()}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="relative z-1 flex sm:hidden"></div>
      <div className="navbar-end relative z-1 justify-self-end">
        {header?.buttons?.map((button) =>
          button ? (
            <Link
              key={button.id}
              to={button.url ?? ""}
              className={
                "btn btn-sm rounded-full border font-light" +
                (isDark
                  ? " border-white bg-transparent text-white"
                  : " border-base-200 btn-primary")
              }
            >
              {button.title?.toUpperCase()}
            </Link>
          ) : null
        )}
      </div>
    </header>
  );
};

export default Header;
