import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/storeHooks";
import { logoutStore } from "../store/userSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatch(logoutStore());
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      throw error;
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark "
      style={{ height: 80 }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Admin Module
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
          style={{ marginLeft: 30 }}
        >
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/" aria-current="page">
              Inicio
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Usuarios
            </NavLink>
          </div>
        </div>
        <nav className="text-light">
          <button className="nav-link btn" onClick={logout}>
            Cerrar Session
          </button>
        </nav>
      </div>
    </nav>
  );
}
