import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="/user/:id" element={<UserForm />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
