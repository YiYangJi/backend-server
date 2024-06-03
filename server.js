const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://dealhunterapp.com",
  "https://dealhunterapp.com",
  "http://www.dealhunterapp.com",
  "https://www.dealhunterapp.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const apiRAWGKey = process.env.API_RAWG_KEY;
const searchGames = "https://api.rawg.io/api/games";

// Endpoint para buscar juegos por nombre
app.get("/searchGame", async (req, res) => {
  const { name } = req.query;
  try {
    const urlFetch = `${searchGames}?key=${apiRAWGKey}&search=${name}&page_size=1`;
    console.log(`Fetching data from: ${urlFetch}`);
    const response = await axios.get(urlFetch);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

// Endpoint para buscar información de un juego por ID
app.get("/searchGameInfo", async (req, res) => {
  const { id } = req.query;
  try {
    const urlFetch = `${searchGames}/${id}?key=${apiRAWGKey}`;
    console.log(`Fetching data from: ${urlFetch}`);
    const response = await axios.get(urlFetch);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
