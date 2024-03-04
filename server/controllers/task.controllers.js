import { pool } from "../db.js";
// Controlador para obtener todas las tareas ordenadas por fecha de creación ascendente.
export const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM task ORDER BY "created_at" ASC;'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener una tarea por su ID.
export const getTask = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task WHERE id = $1;", [
      req.params.id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result.rows[0]); //res.json(result[0])
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear una nueva tarea.
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const date = Date();
    const dateIso = date.toLocaleDateString();
    const result = await pool.query(
      "INSERT INTO task (title, description, created_at) values($1, $2, $3) ",
      [title, description, dateIso]
    );

    res.json({
      id: result.insertId,
      title,
      description,
      created_at: dateIso,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una tarea existente por su ID.
export const updateTask = async (req, res) => {
  try {
    const updatedFields = req.body;
    const fieldNames = Object.keys(updatedFields);
    const fieldValues = Object.values(updatedFields);

    // Construir la parte SET de la consulta
    const setClause = fieldNames
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    // Construir la consulta SQL completa
    const queryString = `UPDATE task SET ${setClause} WHERE id = $${
      fieldNames.length + 1
    }`;

    // Agregar el valor del ID al final de los valores
    const values = [...fieldValues, req.params.id];

    // Ejecutar la consulta
    const result = await pool.query(queryString, values);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una tarea por su ID.
export const deleteTask = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM task WHERE id = $1", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
