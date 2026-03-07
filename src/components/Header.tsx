import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="navbar bg-base-100 fixed top-0 right-0 left-0 z-50 w-full min-w-full shadow-lg">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/about-us" className={isActive("/about-us") ? "active" : ""}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/timetable" className={isActive("/timetable") ? "active" : ""}>
                Timetable
              </Link>
            </li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2">
                  <li>
                    <Link to="/services/maths">Maths</Link>
                  </li>
                  <li>
                    <details>
                      <summary>English</summary>
                      <ul className="p-2">
                        <li>
                          <Link to="/services/english/7-8">7-8</Link>
                        </li>
                        <li>
                          <Link to="/services/english/9-10">9-10</Link>
                        </li>
                        <li>
                          <Link to="/services/english/11-12">11-12</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
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
          <li>
            <Link to="/about-us" className={isActive("/about-us") ? "active" : ""}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/timetable" className={isActive("/timetable") ? "active" : ""}>
              Timetable
            </Link>
          </li>
          <li>
            <details>
              <summary>Services</summary>
              <ul className="w-52 p-2">
                <li>
                  <Link to="/services/maths">Maths</Link>
                </li>
                <li>
                  <details>
                    <summary>English</summary>
                    <ul className="p-2">
                      <li>
                        <Link to="/services/english/7-8">7-8</Link>
                      </li>
                      <li>
                        <Link to="/services/english/9-10">9-10</Link>
                      </li>
                      <li>
                        <Link to="/services/english/11-12">11-12</Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex-1 justify-end">
        <Link to="/contact-us" className="btn btn-primary">
          Contact Us
        </Link>
      </div>
    </header>
  );
};

export default Header;
