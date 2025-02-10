import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Hero from "./Components/Hero";

import { useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="bg-gray-700 min-h-screen">
      <Navbar setSearchQuery={setSearchQuery} />
      {/* <Hero /> */}
      {!searchQuery ? (
        <h2 className="text-white font-poppins text-2xl text-center pt-64">
          Click on Search to know about movies
        </h2>
      ) : (
        ""
      )}
      <Movies searchQuery={searchQuery} />
    </div>
  );
};

export default App;
