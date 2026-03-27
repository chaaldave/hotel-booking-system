import { Routes, Route } from "react-router-dom";
import "./App.css";
// USER PAGES
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Rooms from "./pages/user/Rooms";
import BookingForm from "./pages/user/BookingForm";
import BookingHistory from "./pages/user/BookingHistory";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageBookings from "./pages/admin/ManageBookings";

//EXTRA
import About from "./pages/extra/About";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/history" element={<BookingHistory />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/manage-rooms" element={<ManageRooms />} />
      <Route path="/manage-bookings" element={<ManageBookings />} />
    </Routes>
  );
}