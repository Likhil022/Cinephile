import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrewCard from "../Components/CrewCard";

const MovieDetails = () => {
  const [movie, setMovieDetaisl] = useState({});
  const [crew, setCrewData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://cinephile-backend.vercel.app/movies/${id}`
      );
      setMovieDetaisl(response.data);
    }
    async function fetchCrew() {
      const response = await axios.get(
        `https://cinephile-backend.vercel.app/movies/${id}/credits`
      );
      setCrewData(response.data.cast);
    }
    fetchData();
    fetchCrew();
  }, [id]);

  if (!movie) return <h2 className="text-white text-center">Loading...</h2>;

  return (
    <>
      <div className="text-white font-poppins flex gap-10 mt-20 mx-36">
        {/*movie poster*/}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie.title"
          className="h-[30rem] "
        />
        <div className="details mt-10 flex flex-col gap-4">
          <h3 className="text-3xl">{movie.title}</h3>
          <p className="text-lg pl-1 font-light opacity-75">
            - {movie.tagline}
          </p>
          <p>
            <span className="font-semibold ">Plot : </span>
            {movie.overview}
          </p>
          <p>
            <span className="font-semibold">Genres : </span>
            {movie.genres?.map((genre) => genre.name).join(" | ")}
          </p>
          <p>
            <span className="font-semibold">Release Date : </span>
            {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Run Time : </span>
            {movie.runtime}m
          </p>
          <p>
            <span className="font-semibold ">Official Website : </span>
            <a href={movie.homepage}>Click here</a>
          </p>
          <p className="text-lg pt-4">
            <span className="font-semibold ">Rating : </span>
            <span className="">{movie.vote_average}/10</span>
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-center text-white  mx-96 p-10">Cast & Crew</h3>
        <div className="">
          <div className="flex flex-wrap justify-center items-center gap-10">
            {crew.map((crewD) => (
              <CrewCard key={crewD.id} crew={crewD} className="w-56" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
