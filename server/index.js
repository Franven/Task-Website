import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/task.routes.js";

// Importa el framework Express para construir la aplicación web.
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

// Configura el middleware 'cors' para permitir solicitudes desde http://localhost:5173 (frontend).
app.use(cors({ origin: "http://localhost:5173" }));
// Configura el middleware para parsear las solicitudes en formato JSON.
app.use(express.json());
// Establece las rutas para las funciones relacionadas con el índice y las tareas.
app.use(indexRoutes);
app.use(taskRoutes);

app.use(express.static(join(__dirname,'../client/dist')))

// Inicia el servidor escuchando en el puerto especificado.
app.listen(PORT);

console.log(`server esta corriendo en el puerto ${PORT}`);