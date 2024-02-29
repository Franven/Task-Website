import { Form, Formik } from "formik";
import { useTask } from "../context/TaskProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TaskForm = () => {
  // Accede a las funciones proporcionadas por el contexto de tareas.
  const { createTask, getTask, updateTask } = useTask();

  // Obtiene los parámetros de la URL utilizando el enrutador de React.
  const params = useParams();

  // Obtiene la función de navegación para redirigir después de la operación.
  const navigate = useNavigate();

  // Estado local para almacenar los datos de la tarea.
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  // useEffect para cargar los datos de la tarea si se proporciona un ID en los parámetros.
  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        // Obtiene los detalles de la tarea utilizando la función getTask del contexto.
        const task = await getTask(params.id);
        // Actualiza el estado local con los datos de la tarea obtenidos.
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);

  return (
    <>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            // Si hay un ID en los parámetros, actualiza la tarea existente.
            await updateTask(params.id, values);
            // Navega de regreso a la página principal después de la actualización.
            navigate("/");
          } else {
            
            // Si no hay ID, crea una nueva tarea.
            await createTask(values);
            // Reinicia el formulario después de la creación.
            actions.resetForm();
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-600 max-w-sm rounded-md p-4 mx-auto mt-4"
          >
            <h1 className="text-white text-2xl text-center font-bold mb-3 uppercase">
              {/* Título dinámico según si se está editando o creando una tarea nueva. */}
              {params.id ? "Edit task" : "New Task"}
            </h1>
            <label className="block text-white  py-2">Title</label>
            <input
              className="px-2 py-1 rounded-sm w-full"
              type="text"
              name="title"
              placeholder="wrile a title"
              onChange={handleChange}
              value={values.title}
            />

            <label className="block text-white  py-2">Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="write a description"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-cyan-700 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "saving..." : "save"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;
