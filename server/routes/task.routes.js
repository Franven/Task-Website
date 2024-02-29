import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

// Crea una instancia de 'Router' para gestionar las rutas relacionadas con las tareas.
const router = Router();

// Define una ruta GET '/tasks' que invoca la función controladora 'getTasks'.
router.get("/tasks", getTasks); 

// Define una ruta GET '/tasks/:id' que invoca la función controladora 'getTask'.
router.get("/tasks/:id", getTask); 

// Define una ruta POST '/tasks' que invoca la función controladora 'createTask'
router.post("/tasks", createTask); 

// Define una ruta PUT '/tasks/:id' que invoca la función controladora 'updateTask'.
router.put("/tasks/:id", updateTask); 

// Define una ruta DELETE '/tasks/:id' que invoca la función controladora 'deleteTask'.
router.delete("/tasks/:id", deleteTask); 

// Exporta el router para que pueda ser utilizado en otros archivos.
export default router;
