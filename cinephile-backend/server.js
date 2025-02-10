import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const TMDB_API_KEY = "8066c4c735567d64268f1ad976a0bcef";
const BASE_URL = "https://api.themoviedb.org/3/";

app.use(cors());

app.get("/", (req, res) => {
  res.send("Cinephile Backend is Running!");
});

app.get("/", (req, res) => {
  res.send("Cinephile Backend is Running!");
});

app.get("/movies", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query)
      return res.status(400).json({ error: "Query parameter is required" });

    const response = await axios.get(`${BASE_URL}search/movie`, {
      params: { api_key: TMDB_API_KEY, query },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
