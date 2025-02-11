import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

import axios from "axios";
import { Link } from "react-router-dom";

const Movies = ({ searchQuery }) => {
  console.log("in movies:" + searchQuery);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchMovies = async () => {
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

  const fetchTrending = async () => {
    let response = await axios.get(
      `https://cinephile-backend.vercel.app/trending`
    );
    console.log(response.data.results);
    if (response.data.results) {
      setData(response.data.results);
      setShowPopup(false);
    } else {
      setData([]);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchTrending();
      return;
    }
    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="p-5">
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-500">
          No movies found for &quot;{searchQuery}&quot; 😞
        </div>
      )}
      <div className="flex items-center flex-col text-white text-poppins text-2xl mt-5">
        <span className="my-5">{searchQuery ? "Movies" : "Trending"}</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-14 p-5 list-none ">
          {data.map((curEle) => (
            <Link key={curEle.id} to={`/movies/${curEle.id}`}>
              <MovieCard Movie={curEle} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

Movies.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default Movies;
