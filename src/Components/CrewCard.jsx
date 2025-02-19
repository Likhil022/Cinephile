import PropTypes from "prop-types";
import { useState } from "react";

const CrewCard = ({ crew }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="crew-card text-white w-72">
      <img
        src={
          crew.profile_path
            ? `https://image.tmdb.org/t/p/w500${crew.profile_path}`
            : "https://via.placeholder.com/150"
        }
        alt={crew.title}
        className={`object-cover relative rounded-2xl h-64 transform transition-transform duration-300 ${
          isHovered ? "scale-100" : "scale-110"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div className=" mt-5">
        <h3 className="text-xl">{crew.character}</h3>
        <p>{crew.original_name}</p>
      </div>
    </div>
  );
};
CrewCard.propTypes = {
  crew: PropTypes.object.isRequired,
};

export default CrewCard;
