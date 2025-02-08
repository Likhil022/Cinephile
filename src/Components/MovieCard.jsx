import PropTypes from "prop-types";

const MovieCard = ({ Movie }) => {
  return (
    <div className="cursor-pointer">
      <div className="relative h-96 w-72">
        <img
          src={Movie.Poster}
          alt={Movie.Poster}
          className="object-cover relative rounded-2xl h-96 w-72"
        />
        <div className="absolute top-1 left-0 w-72  z-1 font-poppins">
          <h1>{Movie.Title}</h1>
          <h3>{Movie.Year}</h3>
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
