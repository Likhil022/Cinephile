import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const CrewDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null); // Avoid empty object issue
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(
          `https://cinephile-backend.vercel.app/person/${id}`
        );
        setPerson(response.data);
      } catch (err) {
        setError("Failed to fetch person details." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://cinephile-backend.vercel.app/person/${id}/movies`
        );
        console.log(response.data.cast);
        setMovies(response.data.cast);
      } catch (err) {
        setError("Failed to fetch person details." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!person) return null;

  return (
    <div>
      <div className="flex gap-10 mt-10 mx-[10%] justify-center items-center w-screen ">
        <div>
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : "https://via.placeholder.com/150"
            }
            alt={person.name}
            className="w-80 rounded-2xl"
          />
        </div>
        <div className="text-white font-poppins flex flex-col h-auto gap-8 w-full">
          <h1 className="text-5xl font-bold break-words w-full">
            {person.name}
          </h1>

          <div className="flex flex-row gap-10 flex-wrap w-full">
            <div className="w-64 min-w-0">
              <h3 className="text-3xl font-medium">Gender</h3>
              <p className="text-xl">
                {person.gender === 2 ? "Male" : "Female"}
              </p>
            </div>

            <div className="w-64 min-w-0">
              <h3 className="text-3xl font-medium">Age</h3>
              <p className="text-xl">
                {person.birthday
                  ? new Date().getFullYear() -
                    new Date(person.birthday).getFullYear()
                  : "N/A"}
              </p>
            </div>

            <div className="w-64 min-w-0">
              <h3 className="text-3xl font-medium">Birthday</h3>
              <p className="text-xl">{person.birthday || "N/A"}</p>
            </div>

            <div className="w-64 min-w-0">
              <h3 className="text-3xl font-medium">Place of Birth</h3>
              <p className="text-xl">{person.place_of_birth || "N/A"}</p>
            </div>

            <div className="w-64 min-w-0">
              <h3 className="text-3xl font-medium">Known for</h3>
              <p className="text-xl">{person.known_for_department || "N/A"}</p>
            </div>

            {person.deathday && (
              <div className="w-64 min-w-0">
                <h3 className="text-3xl font-medium">Death Day</h3>
                <p className="text-xl">{person.deathday}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center">
        <div className="text-center text-white my-16 w-fit flex pr-2 gap-2 text-3xl  bg-white text-black rounded-lg">
          <h3
            className={`h-16 w-32 m-1 text-center text-black pt-[0.85rem] rounded-lg transition delay-150 duration-300 ease-in-out cursor-pointer font-poppins font-medium translate-x-1 opacity-100`}
          >
            Movies
          </h3>
        </div>
        <div className="flex items-center flex-col text-white text-poppins text-2xl mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-14 p-5 list-none ">
            {movies?.length > 0 ? (
              movies.map((curEle) => (
                <Link key={curEle.id} to={`/movies/${curEle.id}`}>
                  <MovieCard Movie={curEle} />
                </Link>
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewDetails;
