import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import UserList from "../pages/UserList";
import UserForm from "../pages/UserForm";
import Navbar from "./Navbar";
import Login from "../pages/Login";

export default function AppRoutes() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/user" element={<UserForm />} />
        <Route path="/user/:id" element={<UserForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
