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
      <div className="relative h-96 w-72">
        <img
          src={Movie.Poster}
          alt={Movie.Poster}
          className="object-cover relative rounded-2xl h-96 w-72"
        />
        <div
          className={`absolute top-1 w-72 min-h-96 bg-black bg-opacity-70 rounded-2xl z-10 ${
            isHovered ? "block" : "hidden"
          }`}
        ></div>
        <div className="absolute bottom-1 left-0 w-72  z-20 font-poppins text-white text-center ">
          <h1
            className={`text-2xl ${
              isHovered
                ? "transform -translate-y-4 delay-900 duration-1000 ease-in-out block opacity-100"
                : "translate-y-1 opacity-0"
            }`}
          >
            {Movie.Title}
          </h1>
          <h3
            className={`${
              isHovered
                ? "transform -translate-y-3 delay-900 duration-1000 ease-in-out block opacity-100"
                : " translate-y-1 opacity-0"
            }`}
          >
            {Movie.Year}
          </h3>
        </div>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  Movie: PropTypes.shape({
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
