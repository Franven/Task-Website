import { Link } from "react-router-dom";

// Componente de barra de navegación.
const NavBar = () => {
  return (
    // Contenedor principal de la barra de navegación.
    <div className="bg-zinc-700 flex justify-between px-10 py-4 text-white">
      <Link className="text-lg font-bold" to={"/"}>
        <h1>React PostgreSQL</h1>
      </Link>
      <ul className="flex gap-x-6">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/new">CREATE TASK</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
