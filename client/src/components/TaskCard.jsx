import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskProvider";

// Componente para representar una tarjeta de tarea.
const TaskCard = ({ task }) => {
  // Utiliza el hook useTask para obtener las funciones necesarias.
  const { deleteTask, toggleTaskDone } = useTask();
  // Utiliza el hook useNavigate para la navegación programática.
  const navigate = useNavigate();

  // Manejador de eventos para cambiar el estado de una tarea.
  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  // Obtiene la fecha de creación de la tarea y la formatea.
  const dateString = task.createAt;
  const date = new Date(dateString);

  // Opciones de formato para la fecha.
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // Formatea la fecha en el formato deseado.
  const formattedDate = date.toLocaleDateString("es-ES", options);

  return (
    // Contenedor principal de la tarjeta de tarea.
    <div className="bg-zinc-600  text-white rounded-md p-4 ">
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <span>{task.done === 1 ? "✔️" : "✖️"}</span>
      </header>
      <p>{task.description}</p>
      <span>{formattedDate}</span>
      {/* Botones de acción para la tarea (Eliminar, Editar, Cambiar estado). */}
      <div className="flex gap-2 items-end">
        <button
          className="bg-red-500 px-2 py-1 rounded ml-auto "
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-500 px-2 py-1 rounded "
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-green-500 px-2 py-1 rounded "
          onClick={() => handleDone(task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
