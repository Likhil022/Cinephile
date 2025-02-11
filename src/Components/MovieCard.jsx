import PropTypes from "prop-types";
import { useState } from "react";

const MovieCard = ({ Movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-96 w-72 overflow-hidden rounded-2xl transform transition-transform duration-300 hover:scale-105">
        <img
          src={
            Movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${Movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={Movie.title}
          className={`object-cover relative rounded-2xl h-96 w-72 transform transition-transform duration-300 ${
            isHovered ? "scale-100" : "scale-105"
          }`}
        />
        <div
          className={`absolute top-0  border-white w-72 min-h-96 bg-black bg-opacity-70 rounded-2xl z-10 ${
            isHovered ? "block transform duration-200 ease-in-out" : "hidden"
          }`}
        ></div>
        <div className="absolute bottom-1 left-0 w-72 z-20 font-poppins text-white text-center">
          <h1
            className={`text-2xl ${
              isHovered
                ? "transform -translate-y-4 delay-900 duration-1000 ease-in-out block opacity-100"
                : "translate-y-1 opacity-0"
            }`}
          >
            {Movie.title}
          </h1>
          <h3
            className={`${
              isHovered
                ? "transform -translate-y-3 delay-900 duration-1000 ease-in-out block opacity-100"
                : "translate-y-1 opacity-0"
            }`}
          >
            {Movie.release_date ? Movie.release_date.split("-")[0] : "N/A"}
          </h3>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  Movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
