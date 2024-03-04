import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

// Función para obtener todas las tareas.
export const getTasksRequest = async () => {
  return await axios.get(URL);
};

// Función para crear una nueva tarea.
export const createTaskRequest = async (task) => {
  return await axios.post(URL, task);
};

// Función para eliminar una tarea por su ID.
export const deleteTaskRequest = async (id) => {
  return await axios.delete(`${URL}/${id}`);
};

// Función para obtener una tarea por su ID.
export const getTaskRequest = async (id) => {
  return await axios.get(`${URL}/${id}`);
};

// Función para actualizar una tarea por su ID con nuevos campos.
export const updateTaskRequest = async (id, newfields) => {
  return await axios.put(`${URL}/${id}`, newfields);
};

// Función para cambiar el estado de una tarea por su ID.
export const toggleTaskDoneRequest = async (id, done) => {
  return await axios.put(`${URL}/${id}`, {
    done,
  });
};
