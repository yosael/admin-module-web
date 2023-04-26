import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import UserList from "../pages/UserList";
import UserForm from "../pages/UserForm";
import Navbar from "./Navbar";
import Login from "../pages/Login";
import { useAppSelector } from "../hooks/storeHooks";
import { selectUser } from "../store/userSlice";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const location = useLocation();
  const user = useAppSelector(selectUser);

  const redirectPath = "/login";

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute
              isAuthenticated={user?.isAuth || false}
              redirectPath={redirectPath}
            />
          }
        >
          <Route path="/user" element={<UserForm />} />
        </Route>

        <Route
          path="/user/:id"
          element={
            <ProtectedRoute
              isAuthenticated={user?.isAuth || false}
              redirectPath={redirectPath}
            />
          }
        >
          <Route path="/user/:id" element={<UserForm />} />
        </Route>

        <Route
          path="/users"
          element={
            <ProtectedRoute
              isAuthenticated={user?.isAuth || false}
              redirectPath={redirectPath}
            />
          }
        >
          <Route path="/users" element={<UserList />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={user?.isAuth || false}
              redirectPath={redirectPath}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
