import Loader from "../components/Loader";
import UserService from "../service/UserService";
import { UserResponse } from "../types/User";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppSelector } from "../hooks/storeHooks";
import { selectUser } from "../store/userSlice";

export default function UserList() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const logged = useAppSelector(selectUser);
  const [searchUser, setSearchUser] = useState<String | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await UserService.getAllUsers();
        setUsers(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const onDelete = async () => {
    try {
      setLoading(true);
      await UserService.deleteUser(deleteId as number);
      setUsers(users.filter((user) => user.id !== (deleteId as number)));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
      setDeleteId(null);
    }
  };

  const deleteModal = (id: number) => {
    setDeleteId(id);
    handleShow();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredUsers = users.filter((user) => {
    if (searchUser === null) {
      return user;
    } else if (
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase())
    ) {
      return user;
    }
  });

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1 className="py-4">UserList</h1>
      <div className="d-flex ">
        {logged?.roleId === "admin" && (
          <Link to={"/user"}>
            <button className="btn btn-primary py-2">Agregar Usuario</button>
          </Link>
        )}
        <input
          type="text"
          className="form-control mx-2"
          placeholder="Buscar usuario por nombre o correo"
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      <table className="table table-striped p-50">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
            {logged?.roleId === "admin" && (
              <th scope="col" colSpan={2}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.name}</th>
              <td>{user.email}</td>
              <td>{user.role.name}</td>
              {logged?.roleId === "admin" && (
                <>
                  <td>
                    <Link to={`/user/${user.id}`} className="btn btn-primary">
                      Editar
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteModal(user.id)}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>Quieres Borrar el usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
