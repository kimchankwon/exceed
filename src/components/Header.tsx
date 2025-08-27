import React, { useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const Header: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 w-full z-50 min-w-full">
      <div className="navbar-start flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              className="w-5 h-5"
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
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                to="/about-us"
                className={isActive("/about-us") ? "active" : ""}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/timetable"
                className={isActive("/timetable") ? "active" : ""}
              >
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
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-content font-bold text-lg">X</span>
          </div>
          Exceed Education
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/about-us"
              className={isActive("/about-us") ? "active" : ""}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/timetable"
              className={isActive("/timetable") ? "active" : ""}
            >
              Timetable
            </Link>
          </li>
          <li>
            <details>
              <summary>Services</summary>
              <ul className="p-2 w-52">
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
