import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [movieDetails, setMovieDetaisl] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    const response = await axios.get(
      `https://cinephile-backend.vercel.app/movies/${id}`
    );
    setMovieDetaisl(response.data);
  }
  return (
    <div>
      <h3 className="bg-red">movie id: {id}</h3>
      <h3>{movieDetails.overview}</h3>
    </div>
  );
};

export default MovieDetails;
