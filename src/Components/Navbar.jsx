import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import favicon from "../../public/favicon.ico";
import menu from "../../public/menu.svg";
import PropTypes from "prop-types";
import Search from "./Search";

const Navbar = ({ setSearchQuery }) => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [delaySearch, setDelaySearch] = useState(false);
  const [menuActive, setMenuActive] = useState(true);

  useEffect(() => {
    let timeout;
    if (searchToggle) {
      timeout = setTimeout(() => setDelaySearch(true), 300); // 300ms delay
    } else {
      setDelaySearch(false);
    }
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [searchToggle]);
  return (
    <div>
      {
        <div
          className={`flex justify-between px-32 pr-24 py-5 bg-gray-800 text-white font-poppins text-lg border-b-[2px] border-white animate-borderColorChange transition-transform duration-900 ease-in-out ${
            searchToggle ? "-translate-y-32 ease-in-out" : "translate-y-0"
          }}`}
        >
          <Link to="/" className="flex gap-[3px]">
            <img src={favicon} className="h-6 w-6" alt="logo" />
            <h1 className="animate-bounceCustom">inephile</h1>
          </Link>

          <div className="flex gap-8">
            {menuActive && (
              <ul className="md:flex gap-12 w-[50%] hidden ">
                <Link
                  to="/"
                  className="animate-bounceCustom cursor-pointer"
                  style={{ animationDelay: "200ms" }}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="animate-bounceCustom cursor-pointer"
                  style={{ animationDelay: "400ms" }}
                >
                  About
                </Link>
                <Link
                  to="/Search"
                  className="animate-bounceCustom  cursor-pointer"
                  style={{ animationDelay: "600ms" }}
                  onClick={() => {
                    setSearchToggle(!searchToggle);
                  }}
                >
                  Search
                </Link>
              </ul>
            )}
            <div className="md:flex hidden h-8 w-8 justify-between">
              <img
                src={menu}
                alt="hamburger menu"
                className={`fill-white w-full h-full invert translate-x-24 -mt-[2px] ${
                  menuActive
                    ? "-translate-x-22"
                    : "-translate-x-24 transition-all ease-in-out"
                }`}
                onClick={() => setMenuActive(!menuActive)}
              />
            </div>
          </div>
        </div>
      }
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-all duration-700 ${
          delaySearch
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full"
        }`}
      >
        {delaySearch && (
          <Search
            setSearchToggle={setSearchToggle}
            searchToggle={searchToggle}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
    </div>
  );
};
Navbar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default Navbar;
