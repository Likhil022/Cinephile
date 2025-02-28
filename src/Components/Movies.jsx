import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      fetchMovies();
    } else {
      fetchTrending();
    }
  }, [query]);

  const fetchMovies = async () => {
    let response = await axios.get(
      `https://cinephile-backend.vercel.app/movies?query=${query}`
    );
    // console.log(response.data.results);
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
    // console.log(response.data.results);
    if (response.data.results) {
      setData(response.data.results);
      setShowPopup(false);
    } else {
      setData([]);
      setShowPopup(true);
    }
  };

  return (
    <div className="p-5">
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-500">
          No movies found for &quot;{query}&quot; 😞
        </div>
      )}
      <div className="flex items-center flex-col text-white text-poppins text-2xl mt-5">
        <div className="text-center text-white my-16 w-fit flex pr-2 gap-2 text-3xl  bg-white text-black rounded-lg">
          <h3
            className={`h-16 w-32 m-1 text-center text-black pt-[0.85rem] rounded-lg transition delay-150 duration-300 ease-in-out cursor-pointer font-poppins font-medium translate-x-1 opacity-100`}
          >
            {query ? "Movies" : "Trending"}
          </h3>
        </div>
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

export default Movies;
