import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearchToggle, searchToggle, setSearchQuery }) => {
  const [search, setSearch] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when searchToggle is true
  useEffect(() => {
    if (searchToggle && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [searchToggle]);

  const handleLabelClick = () => {
    setSearch(!search);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle Enter key to toggle search state
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(!search);
      setSearchToggle(!searchToggle);
      console.log(e.target.value);
      setSearchQuery(e.target.value);
      navigate(`/movies?query=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <div className="text-white bg-gray-800 mx-14 px-44 bg-opacity-90 w-screen h-screen rounded-md z-10 flex justify-between items-center">
      <div
        className={`flex flex-col justify-center w-full h-full transition-all duration-500 ${
          search ? "scale-100 opacity-100" : "scale-90 opacity-80"
        }`}
      >
        <label
          htmlFor="input"
          className="text-xl m-2 cursor-pointer"
          onClick={() => handleLabelClick()}
        >
          Search
        </label>

        <input
          ref={inputRef}
          type="text"
          onChange={(e) => console.log(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`h-10 w-[50rem] p-3 text-lg text-white bg-transparent border-b-2 border-white focus:outline-none transition-all duration-500 ease-in-out 
            ${
              search
                ? "opacity-100 scale-100 fo"
                : "opacity-0 scale-90 pointer-events-none"
            }
          `}
        />
      </div>

      <button
        className="text-5xl bg-gray-800 bg-opacity-50 text-white"
        onClick={() => setSearchToggle(!searchToggle)}
      >
        X
      </button>
    </div>
  );
};

Search.propTypes = {
  setSearchToggle: PropTypes.func.isRequired,
  searchToggle: PropTypes.bool.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default Search;
