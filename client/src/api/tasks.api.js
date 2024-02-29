import axios from "axios";

// Función para obtener todas las tareas.
export const getTasksRequest = async () => {
  return await axios.get("http://localhost:4000/tasks");
};

// Función para crear una nueva tarea.
export const createTaskRequest = async (task) => {
  return await axios.post("http://localhost:4000/tasks", task);
};

// Función para eliminar una tarea por su ID.
export const deleteTaskRequest = async (id) => {
  return await axios.delete(`http://localhost:4000/tasks/${id}`);
};

// Función para obtener una tarea por su ID.
export const getTaskRequest = async (id) => {
  return await axios.get(`http://localhost:4000/tasks/${id}`);
};

// Función para actualizar una tarea por su ID con nuevos campos.
export const updateTaskRequest = async (id, newfields) => {
  return await axios.put(`http://localhost:4000/tasks/${id}`, newfields);
};

// Función para cambiar el estado de una tarea por su ID.
export const toggleTaskDoneRequest = async (id, done) => {
  return await axios.put(`http://localhost:4000/tasks/${id}`, {
    done,
  });
};
