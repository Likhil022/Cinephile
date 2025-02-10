import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

import axios from "axios";

const Movies = ({ searchQuery }) => {
  console.log("in movies:" + searchQuery);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (!searchQuery) return;
    const fetchData = async () => {
      let response = await axios.get(
        `https://cinephile-backend.vercel.app/movies?query=${searchQuery}`
      );
      console.log(response.data.results);
      if (response.data.results) {
        setData(response.data.results);

        setShowPopup(false); // Hide popup if movies are found
      } else {
        setData([]);
        setShowPopup(true);
      }
    };
    fetchData();
  }, [searchQuery]);
  return (
    <div className="p-5">
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-500">
          No movies found for &quot;{searchQuery}&quot; 😞
        </div>
      )}
      {searchQuery && (
        <div className="flex items-center flex-col text-white text-poppins text-2xl mt-5">
          <span className="my-5">Movies</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-14 p-5 list-none ">
            {data.map((curEle) => (
              <li key={curEle.imdbID}>
                <MovieCard Movie={curEle} />
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
Movies.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default Movies;
