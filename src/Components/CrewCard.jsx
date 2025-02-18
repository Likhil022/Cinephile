import PropTypes from "prop-types";

const CrewCard = ({ crew }) => {
  console.log(crew);
  return (
    <div className="crew-card">
      {/* <strong>{crew.name}</strong> - {crew.job} */}
    </div>
  );
};
CrewCard.propTypes = {
  crew: PropTypes.object.isRequired,
};

export default CrewCard;
