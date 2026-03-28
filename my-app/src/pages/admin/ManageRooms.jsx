import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../../services/roomService";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    occupancy: "",
    bed_type: "",
    size: "",
    price: "",
    amenities: "",
    tags: "",
    available: "true",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    setLoading(true);
    const { data, error } = await getRooms();
    if (error) {
      setMessage("Failed to load rooms.");
    } else {
      setRooms(data || []);
      setMessage("");
    }
    setLoading(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const roomData = {
      ...formData,
      price: Number(formData.price),
      available: formData.available === "true",
    };

    if (editId) {
      const { error } = await updateRoom(editId, roomData);
      if (error) { setMessage("Failed to update room."); return; }
      setMessage("Room updated successfully.");
      setEditId(null);
    } else {
      const { error } = await addRoom(roomData);
      if (error) { setMessage("Failed to add room."); return; }
      setMessage("Room added successfully.");
    }

    resetForm();
    fetchRooms();
  }

  function resetForm() {
    setFormData({
      name: "", category: "", description: "", occupancy: "",
      bed_type: "", size: "", price: "", amenities: "",
      tags: "", available: "true",
    });
    setEditId(null);
  }

  function handleEdit(room) {
    setFormData({
      ...room,
      available: room.available ? "true" : "false",
    });
    setEditId(room.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this room permanently?")) return;
    const { error } = await deleteRoom(id);
    if (error) { setMessage("Failed to delete room."); return; }
    setMessage("Room deleted successfully.");
    fetchRooms();
  }

  return (
    <div className="admin-page-wrapper">
      <Navbar />

      <div className="rooms-page">
        <div className="rooms-hero">
          <p className="home-kicker">Inventory Management</p>
          <h1 className="pro-title">Manage Hotel Rooms</h1>
          <p className="home-description">
            Update themed suites, monster capacity, and nightly rates.
          </p>
        </div>

        {/* Form Section */}
        <div className="admin-form-container">
          <form className="spooky-form-card admin-edit-form" onSubmit={handleSubmit}>
            <h2 className="form-title">{editId ? "Update Chamber" : "Add New Chamber"}</h2>
            
            <div className="form-grid">
              <input type="text" name="name" placeholder="Room Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
              <input type="text" name="occupancy" placeholder="Occupancy" value={formData.occupancy} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Price (₲)" value={formData.price} onChange={handleChange} required />
              <input type="text" name="bed_type" placeholder="Bed Type" value={formData.bed_type} onChange={handleChange} />
              <input type="text" name="size" placeholder="Room Size" value={formData.size} onChange={handleChange} />
              <select name="available" value={formData.available} onChange={handleChange}>
                <option value="true">Available</option>
                <option value="false">Occupied/Hidden</option>
              </select>
              <input type="text" name="tags" placeholder="Tags (Spooky, Luxury)" value={formData.tags} onChange={handleChange} />
            </div>

            <textarea name="description" placeholder="Room Description" value={formData.description} onChange={handleChange} required></textarea>
            <textarea name="amenities" placeholder="Amenities (separate with semicolons)" value={formData.amenities} onChange={handleChange}></textarea>

            <div className="admin-actions">
              <button type="submit" className="primary-btn">{editId ? "Save Changes" : "Create Room"}</button>
              {editId && <button type="button" className="outline-btn" onClick={resetForm}>Cancel</button>}
            </div>
            {message && <p className="message-text centered">{message}</p>}
          </form>
        </div>

        {/* Table Section */}
        <div className="history-table-container">
          <table className="spooky-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="loading-text">Fetching crypt inventory...</td></tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id}>
                    <td className="gold-text">{room.name}</td>
                    <td>{room.category}</td>
                    <td>₲{room.price}</td>
                    <td>{room.available ? "Available" : "Not Available"}</td>
                    <td className="table-actions">
                      <button className="action-link edit" onClick={() => handleEdit(room)}>Edit</button>
                      <button className="action-link delete" onClick={() => handleDelete(room.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}