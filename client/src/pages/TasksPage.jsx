import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTask } from "../context/TaskProvider";

const TasksPage = () => {
  // Utiliza el contexto de tareas para obtener la lista de tareas y la función para cargarlas.
  const { tasks, loadTask } = useTask();

  // useEffect para cargar las tareas al montar el componente.
  useEffect(() => {
    // Llama a la función para cargar tareas.
    loadTask();
  }, []);

  // Función para renderizar el contenido principal de la página.
  const renderMain = () => {
    // Si no hay tareas, muestra un mensaje indicando que no hay tareas.
    if (tasks.length === 0)
      return (
        <h2 className="text-white text-center col-span-3 font-bold text-3xl uppercase ">
          No task yet
        </h2>
      );

    // Mapea las tareas y renderiza un componente TaskCard para cada una.
    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  };

  return (
    /* Utiliza una cuadrícula de 3 columnas para mostrar las tarjetas de tareas. */
    <>
      <h1 className="text-5xl text-white font-bold text-center mb-3">Tasks</h1>
      <div className="grid grid-cols-3 gap-5">{renderMain()}</div>
    </>
  );
};

export default TasksPage;
