import { Link, useStaticQuery, graphql } from "gatsby";
import logoFullWhite from "../images/logo-full-white.svg";

const Footer = () => {
  const data = useStaticQuery<Queries.FooterQueryQuery>(graphql`
    query FooterQuery {
      allContentfulFooter(sort: [{ order: ASC }]) {
        nodes {
          id
          title
          links {
            id
            title
            url
          }
          hrefs {
            id
            title
            url
            type
          }
        }
      }
    }
  `);
  const footerItems = data.allContentfulFooter.nodes;
  return (
    <footer data-header-theme="dark" className="bg-base-300 text-white/70">
      {/* Top Row: Logo + Newsletter */}
      <div className="grid grid-cols-1 items-center gap-8 px-12 pt-10 pb-20 sm:grid-cols-2">
        <img
          src={logoFullWhite}
          alt="Exceed"
          className="w-48 justify-self-center sm:justify-self-start"
        />
        <div className="flex flex-wrap items-center justify-center gap-8">
          <input
            type="email"
            placeholder="Email address"
            className="text-body flex-1 rounded-md bg-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none"
          />
          <button className="btn h-11 rounded-full border-0 bg-white px-7">SUBSCRIBE</button>
        </div>
      </div>
      {/* Link Columns */}
      <div className="grid grid-cols-2 gap-8 px-12 pb-32 sm:grid-cols-4">
        {footerItems.map((f) => (
          <nav key={f.id} className="flex flex-col items-start gap-1">
            <p className="text-white/80">{f.title}</p>
            {f.links?.map((link, i) =>
              link ? (
                <Link
                  key={link.id}
                  to={link.url ?? ""}
                  className={"link link-hover" + (i % 3 === 0 ? " pt-3" : "")}
                >
                  {link.title}
                </Link>
              ) : null
            )}
            {f.hrefs?.map((href, i) =>
              href ? (
                <a
                  key={href.id}
                  href={href.url ?? ""}
                  target={href.type === "map" ? "_blank" : undefined}
                  rel={href.type === "map" ? "noopener noreferrer" : undefined}
                  className={"link link-hover" + (i % 3 === 0 ? " pt-3" : "")}
                >
                  {href.title}
                </a>
              ) : null
            )}
          </nav>
        ))}
        {/* TODO Socials in footer */}
        <nav className="flex flex-col items-start gap-1">
          <p className="pb-4 text-white/80">Socials</p>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.04525 5.865V8.613H7.03125V11.973H9.04525V21.959H13.1792V11.974H15.9543C15.9543 11.974 16.2142 10.363 16.3403 8.601H13.1962V6.303C13.1962 5.96 13.6462 5.498 14.0922 5.498H16.3463V2H13.2822C8.94225 2 9.04525 5.363 9.04525 5.865Z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.017 2H7.947C6.37015 2.00185 4.85844 2.62914 3.74353 3.74424C2.62862 4.85933 2.00159 6.37115 2 7.948L2 16.018C2.00185 17.5948 2.62914 19.1066 3.74424 20.2215C4.85933 21.3364 6.37115 21.9634 7.948 21.965H16.018C17.5948 21.9631 19.1066 21.3359 20.2215 20.2208C21.3364 19.1057 21.9634 17.5938 21.965 16.017V7.947C21.9631 6.37015 21.3359 4.85844 20.2208 3.74353C19.1057 2.62862 17.5938 2.00159 16.017 2V2ZM19.957 16.017C19.957 16.5344 19.8551 17.0468 19.6571 17.5248C19.4591 18.0028 19.1689 18.4371 18.803 18.803C18.4371 19.1689 18.0028 19.4591 17.5248 19.6571C17.0468 19.8551 16.5344 19.957 16.017 19.957H7.947C6.90222 19.9567 5.90032 19.5415 5.16165 18.8026C4.42297 18.0638 4.008 17.0618 4.008 16.017V7.947C4.00827 6.90222 4.42349 5.90032 5.16235 5.16165C5.90122 4.42297 6.90322 4.008 7.948 4.008H16.018C17.0628 4.00827 18.0647 4.42349 18.8034 5.16235C19.542 5.90122 19.957 6.90322 19.957 7.948V16.018V16.017Z" fill="currentColor" />
                <path d="M11.9823 6.81885C10.6137 6.82096 9.30184 7.36563 8.33421 8.33345C7.36658 9.30127 6.82216 10.6133 6.82031 11.9818C6.8219 13.3508 7.36634 14.6632 8.33421 15.6312C9.30209 16.5993 10.6144 17.144 11.9833 17.1458C13.3524 17.1443 14.665 16.5997 15.6331 15.6316C16.6012 14.6635 17.1457 13.3509 17.1473 11.9818C17.1452 10.6129 16.6003 9.30073 15.632 8.33304C14.6637 7.36535 13.3512 6.82117 11.9823 6.81985V6.81885ZM11.9823 15.1378C11.1456 15.1378 10.3431 14.8054 9.75139 14.2138C9.15971 13.6221 8.82731 12.8196 8.82731 11.9828C8.82731 11.1461 9.15971 10.3436 9.75139 9.75193C10.3431 9.16025 11.1456 8.82785 11.9823 8.82785C12.8191 8.82785 13.6216 9.16025 14.2132 9.75193C14.8049 10.3436 15.1373 11.1461 15.1373 11.9828C15.1373 12.8196 14.8049 13.6221 14.2132 14.2138C13.6216 14.8054 12.8191 15.1378 11.9823 15.1378Z" fill="currentColor" />
                <path d="M17.1569 8.09509C17.8401 8.09509 18.3939 7.54127 18.3939 6.85809C18.3939 6.17492 17.8401 5.62109 17.1569 5.62109C16.4737 5.62109 15.9199 6.17492 15.9199 6.85809C15.9199 7.54127 16.4737 8.09509 17.1569 8.09509Z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.959 13.7189V21.0979H17.681V14.2129C17.681 12.4829 17.062 11.3029 15.514 11.3029C14.332 11.3029 13.628 12.0989 13.319 12.8679C13.206 13.1429 13.177 13.5259 13.177 13.9109V21.0979H8.897C8.897 21.0979 8.955 9.43788 8.897 8.22888H13.177V10.0529L13.149 10.0949H13.177V10.0529C13.745 9.17788 14.76 7.92688 17.033 7.92688C19.848 7.92688 21.959 9.76688 21.959 13.7189ZM4.421 2.02588C2.958 2.02588 2 2.98588 2 4.24888C2 5.48388 2.93 6.47288 4.365 6.47288H4.393C5.886 6.47288 6.813 5.48388 6.813 4.24888C6.787 2.98588 5.887 2.02588 4.422 2.02588H4.421ZM2.254 21.0979H6.532V8.22888H2.254V21.0979Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="mx-12 border-t border-white/20" />
      <div className="flex items-center justify-between px-12 pt-6 pb-8">
        <span>EXCEED Education&copy; 2026. All rights reserved.</span>
        <Link to="/terms-and-conditions" className="link link-hover">
          Terms &amp; Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
