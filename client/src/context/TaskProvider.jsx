import { useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from "../api/tasks.api";
import { TaskContext } from "./TaskContext";

// Hook personalizado para acceder al contexto de tareas.
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used whithin a TaskContextProvider");
  }
  return context;
};

// Componente proveedor del contexto de tareas.
export const TaskContextProvider = ({ children }) => {
  // Estado local para almacenar la lista de tareas.
  const [tasks, setTasks] = useState([]);

  // Función para cargar las tareas desde el servidor.
  const loadTask = async () => {
    const response = await getTasksRequest();
    setTasks(response.data);
  };

  // Función para eliminar una tarea por su ID.
  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Función para crear una nueva tarea.
  const createTask = async (task) => {
    try {
      //Si no tiene título no se crea
      if (task.title === "") {
        throw new Error("La tarea tiene que tener título");
      } else {
        const response = await createTaskRequest(task);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener una tarea por su ID
  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar una tarea por su ID con nuevos campos.
  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Función para cambiar el estado de una tarea por su ID.
  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);
      if (!taskFound) {
        throw new Error(`Tarea con ID ${id} no encontrada`);
      }
      const newDoneValue = taskFound.done === 0 ? 1 : 0;

      await toggleTaskDoneRequest(id, newDoneValue);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, done: newDoneValue } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };
  // Provee el contexto y las funciones a los componentes hijos.
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTask,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
