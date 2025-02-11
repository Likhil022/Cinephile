import { useState, useEffect } from "react";
import favicon from "../../public/favicon.ico";
import PropTypes from "prop-types";
import Search from "./Search";
const Navbar = ({ setSearchQuery }) => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [delaySearch, setDelaySearch] = useState(false);

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
          className={`flex justify-between px-32 py-5 bg-gray-800 text-white font-poppins text-lg border-b-[2px] border-white animate-borderColorChange transition-transform duration-900 ease-in-out ${
            searchToggle ? "-translate-y-32 ease-in-out" : "translate-y-0"
          }}`}
        >
          <div className="flex gap-[3px]">
            <img src={favicon} className="h-6 w-6" alt="logo" />
            <h1 className="animate-bounceCustom">inephile</h1>
          </div>
          <ul className="flex gap-12 justify-end w-[50%] ">
            <li
              className="animate-bounceCustom cursor-pointer"
              style={{ animationDelay: "200ms" }}
            >
              Home
            </li>
            <li
              className="animate-bounceCustom cursor-pointer"
              style={{ animationDelay: "400ms" }}
            >
              About
            </li>
            <li
              className="animate-bounceCustom  cursor-pointer"
              style={{ animationDelay: "600ms" }}
              onClick={() => {
                setSearchToggle(!searchToggle);
              }}
            >
              Search
            </li>
          </ul>
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
