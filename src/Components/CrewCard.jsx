import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrewCard = ({ crew, active }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="text-white w-72 flex flex-col justify-center items-center"
      onClick={() => navigate(`/person/${crew.id}`)}
    >
      <img
        src={
          crew.profile_path
            ? `https://image.tmdb.org/t/p/w500${crew.profile_path}`
            : "https://via.placeholder.com/150"
        }
        alt={crew.title}
        className={`object-cover relative rounded-2xl h-64 transform transition-transform duration-300 cursor-pointer ${
          isHovered ? "scale-100" : "scale-110"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div className="mt-5">
        <p className="text-xl">{crew.original_name}</p>
        {active ? (
          <p className="text-sm opacity-75">Character: {crew.character}</p>
        ) : (
          <p className="text-sm opacity-75">Job: {crew.job}</p>
        )}
      </div>
    </div>
  );
};
CrewCard.propTypes = {
  crew: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};

export default CrewCard;
