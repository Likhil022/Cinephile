import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";

import MovieDetails from "./Pages/MovieDetails";

import { useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Router>
      <div className="bg-gray-700 min-h-screen">
        <Navbar setSearchQuery={setSearchQuery} />
        <Routes>
          {/* <Hero /> */}
          <Route path="/" element={<Movies searchQuery={searchQuery} />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

{
  /* {!searchQuery ? (
  <h2 className="text-white font-poppins text-2xl text-center pt-64">
    Click on Search to know about movies
  </h2>
) : (
  ""
)} */
}
