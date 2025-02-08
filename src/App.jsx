import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";

import { useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="bg-gray-700 min-h-screen">
      <Navbar setSearchQuery={setSearchQuery} />
      <Movies searchQuery={searchQuery} />
    </div>
  );
};

export default App;
