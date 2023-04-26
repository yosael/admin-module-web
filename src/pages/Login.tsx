import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks/storeHooks";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { loginStore } from "../store/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await UserService.login(email, password);
      console.log(data);
      if (data?.token) {
        dispatch(
          loginStore({
            name: data.name,
            email: data.email,
            roleId: data.roleId,
            isAuth: true,
          })
        );
        localStorage.setItem("token", data.token);
      }
      setError;
      navigate("/");
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500, marginTop: "20%" }}>
      <h1 className="text-center">Iniciar Session</h1>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar Correo"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-2">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 btn btn-lg btn-primary mt-3"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Session"}
        </Button>
      </Form>
      {error !== "" && (
        <div
          className="alert alert-danger mt-3 alert-dismissible"
          role="alert"
          aria-label="Close"
        >
          {error}
        </div>
      )}
    </div>
  );
}
