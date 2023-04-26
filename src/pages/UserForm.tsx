import { useState, useEffect } from "react";
import { UserResponse } from "../types/User";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { Form } from "react-bootstrap";
import Loader from "../components/Loader";
import { useAppSelector } from "../hooks/storeHooks";
import { selectUser } from "../store/userSlice";

export default function UserForm() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [password, setPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const logged = useAppSelector(selectUser);

  useEffect(() => {
    const getUser = async (userId: string) => {
      try {
        setLoadingData(true);
        const result = await UserService.getUserById(Number(userId));
        setUser(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingData(false);
      }
    };

    if (params.id) {
      getUser(params.id);
    }
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: value } as UserResponse));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setUser(
      (prev) =>
        ({
          ...prev,
          role: {
            id: value,
          },
        } as UserResponse)
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      if (params.id) {
        await UserService.updateUser(Number(params.id), {
          name: user.name,
          email: user.email,
          password: password,
          roleId: user.role?.id,
        });
      } else {
        await UserService.createUser({
          name: user.name,
          email: user.email,
          password: password,
          roleId: user.role?.id,
        });
      }
      navigate("/users");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <Loader />;

  return (
    <div className="container">
      <h1 className="py-4">Gestionar Usuario</h1>
      <Form style={{ maxWidth: 600 }} className="mx-auto" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={user?.name || ""}
            name="name"
            onChange={onInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user?.email || ""}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            minLength={6}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Rol
          </label>
          <Form.Select
            className="form-select"
            id="role"
            name="role"
            onChange={handleSelectChange}
            value={user?.role?.id || ""}
          >
            <option value="">Seleccionar</option>
            <option value="admin">ADMIN</option>
            <option value="readonly">READ ONLY</option>
          </Form.Select>
        </div>
        <div className="d-flex justify-content-evenly py-4">
          <Link to={"/users"}>
            <button type="submit" className="btn btn-secondary">
              Lista de Usuarios
            </button>
          </Link>
          {logged?.roleId === "admin" && (
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}
