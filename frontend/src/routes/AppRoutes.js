import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Pitch from "../pages/Pitch";
import MyBooking from "../pages/MyBooking";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Home />} />
    <Route path="/pitch/:id" element={<Pitch />} />
    <Route path="/my-booking" element={<MyBooking />} />
    <Route path="*" element={<h2>404 - Page not found</h2>} />
  </Routes>
);

export default AppRoutes;
