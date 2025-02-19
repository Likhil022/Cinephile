import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrewCard from "../Components/CrewCard";

const MovieDetails = () => {
  const [movie, setMovieDetaisl] = useState({});
  const [crew, setCrewData] = useState([]);
  const [active, setActive] = useState(true);
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
      const data = active ? response.data.cast : response.data.crew;

      // Filter out duplicates based on 'id' (assuming 'id' is unique per person)
      const uniqueData = Array.from(
        new Map(data.map((item) => [item.id, item])).values()
      );

      setCrewData(uniqueData);
    }
    fetchData();
    fetchCrew();
  }, [id, active]);

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
      <div className=" flex justify-center flex-col items-center font-poppins">
        <div className="text-center text-white my-16 w-72 flex px-2 gap-2 text-3xl  bg-white text-black rounded-lg">
          <h3
            onClick={() => setActive(!active)}
            className={`h-16 w-32 m-1 text-center text-black pt-[0.85rem] rounded-lg transition delay-150 duration-300 ease-in-out cursor-pointer ${
              active ? "bg-black text-white translate-x-1 opacity-100" : ""
            }`}
          >
            Cast
          </h3>
          <h3
            onClick={() => setActive(!active)}
            className={`h-16 w-32 m-1 text-center text-black pt-[0.85rem] rounded-lg transition delay-150 duration-300 ease-in-out cursor-pointer ${
              !active ? "bg-black text-white -translate-x-1 opacity-100" : ""
            }`}
          >
            Crew
          </h3>
        </div>
        <div
          className={`grid grid-cols-4 gap-10 transition delay-150 duration-300 ease-in-out ${
            active ? "translate-x-4 opacity-100" : "-translate-x-4 opacity-100"
          }`}
        >
          {crew.map((crewD) => (
            <CrewCard key={crewD.id} crew={crewD} active={active} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
