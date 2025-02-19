import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CrewDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null); // Avoid empty object issue
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
        setError("Failed to fetch person details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!person) return null;

  return (
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
        <h1 className="text-5xl font-bold break-words w-full">{person.name}</h1>

        <div className="flex flex-row gap-10 flex-wrap w-full">
          <div className="w-64 min-w-0">
            <h3 className="text-3xl font-medium">Gender</h3>
            <p className="text-xl">{person.gender === 2 ? "Male" : "Female"}</p>
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
  );
};

export default CrewDetails;
