const express = require("express"); // Importa el módulo 'express' para crear una aplicación web
const axios = require("axios"); // Importa el módulo 'axios' para realizar peticiones HTTP
const cors = require("cors"); // Importa el módulo 'cors' para permitir peticiones HTTP desde otros dominios
require("dotenv").config(); // Importa el módulo 'dotenv' para cargar variables de entorno desde un archivo '.env'

const app = express(); // Crea una aplicación web con express
const port = process.env.PORT || 3000; // Obtiene el puerto de la variable de entorno o usa el puerto 3000

// Define los dominios permitidos para realizar peticiones HTTP (CORS)
const allowedOrigins = [
  "http://dealhunterapp.com",
  "https://dealhunterapp.com",
  "http://www.dealhunterapp.com",
  "https://www.dealhunterapp.com",
];

// Configura las opciones de CORS
const corsOptions = {
  // Define una función para verificar si el origen de la solicitud está permitido
  origin: function (origin, callback) {
    // Si el origen está en la lista de permitidos o no hay origen (por ejemplo, en solicitudes desde el mismo dominio), permite la solicitud
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      // Sino
    } else {
      // Rechaza la solicitud con un error
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions)); // Aplica las opciones de CORS a la aplicación Express

const apiRAWGKey = process.env.API_RAWG_KEY; // Obtiene la clave de la API de RAWG desde las variables de entorno
const searchGames = "https://api.rawg.io/api/games"; // URL base de la API de RAWG para buscar juegos

// Define un endpoint para buscar juegos por nombre
app.get("/searchGame", async (req, res) => {
  const { name } = req.query; // Obtiene el parámetro 'name' de la solicitud
  try {
    const urlFetch = `${searchGames}?key=${apiRAWGKey}&search=${name}&page_size=1`; // URL de la API de RAWG para buscar juegos por nombre
    console.log(`Fetching data from: ${urlFetch}`); // Muestra la URL de la API en la consola
    const response = await axios.get(urlFetch); // Realiza una petición GET a la API de RAWG
    res.json(response.data); // Devuelve los datos de la respuesta en formato JSON
  } catch (error) {
    // Si hay un error al realizar la petición
    console.error("Error fetching data:", error.message); // Muestra un mensaje de error en la consola
    res.status(500).send("Error fetching data"); // Devuelve un código de estado 500 (error del servidor) en la respuesta
  }
});

// Define un endpoint para buscar información de un juego por ID
app.get("/searchGameInfo", async (req, res) => {
  const { id } = req.query; // Obtiene el parámetro 'id' de la solicitud
  try {
    const urlFetch = `${searchGames}/${id}?key=${apiRAWGKey}`; // URL de la API de RAWG para buscar información de un juego por ID
    console.log(`Fetching data from: ${urlFetch}`); // Muestra la URL de la API en la consola
    const response = await axios.get(urlFetch); // Realiza una petición GET a la API de RAWG
    res.json(response.data); // Devuelve los datos de la respuesta en formato JSON
  } catch (error) {
    // Si hay un error al realizar la petición
    console.error("Error fetching data:", error.message); // Muestra un mensaje de error en la consola
    res.status(500).send("Error fetching data"); // Devuelve un código de estado 500 (error del servidor) en la respuesta
  }
});

// Inicia el servidor en el puerto especificado y imprime un mensaje en la consola
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Muestra un mensaje en la consola
});
