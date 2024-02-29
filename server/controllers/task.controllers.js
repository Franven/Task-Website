import { pool } from "../db.js";
// Controlador para obtener todas las tareas ordenadas por fecha de creación ascendente.
export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM task ORDER BY createAt ASC"
    );
    res.json(result); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener una tarea por su ID.
export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear una nueva tarea.
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query(
      "INSERT INTO task (title, description) values(?, ?)",
      [title, description]
    );

    res.json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una tarea existente por su ID.
export const updateTask = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE task SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una tarea por su ID.
export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM task WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};