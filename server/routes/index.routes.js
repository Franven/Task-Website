import { Router } from "express";
import { pool } from "../db.js";

// Crea una instancia de 'Router' para gestionar las rutas.
const router = Router()


// Define una ruta GET '/ping' que devuelve un JSON con el resultado de 'SELECT 1 + 1'.
router.get('/ping', async (req,res)=>{
  try {
    // Muestra el resultado en la consola para propósitos de registro o depuración.
    const [rows] = await pool.query("SELECT 1 + 1 as result;");
    // Devuelve el resultado como JSON en la respuesta HTTP.
    res.json(rows);
  } catch (error) {
    console.log(error)
  }
})


export default router