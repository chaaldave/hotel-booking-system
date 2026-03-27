import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.description ||
      !formData.occupancy ||
      !formData.bed_type ||
      !formData.size ||
      !formData.price ||
      !formData.amenities
    ) {
      setMessage("Please complete all required room details.");
      return;
    }

    const roomData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      occupancy: formData.occupancy,
      bed_type: formData.bed_type,
      size: formData.size,
      price: Number(formData.price),
      amenities: formData.amenities,
      tags: formData.tags,
      available: formData.available === "true",
    };

    if (editId) {
      const { error } = await updateRoom(editId, roomData);

      if (error) {
        setMessage("Failed to update room.");
        return;
      }

      setMessage("Room updated successfully.");
      setEditId(null);
    } else {
      const { error } = await addRoom(roomData);

      if (error) {
        setMessage("Failed to add room.");
        return;
      }

      setMessage("Room added successfully.");
    }

    setFormData({
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

    fetchRooms();
  }

  function handleEdit(room) {
    setFormData({
      name: room.name || "",
      category: room.category || "",
      description: room.description || "",
      occupancy: room.occupancy || "",
      bed_type: room.bed_type || "",
      size: room.size || "",
      price: room.price || "",
      amenities: room.amenities || "",
      tags: room.tags || "",
      available: room.available ? "true" : "false",
    });

    setEditId(room.id);
    setMessage("Editing selected room.");
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await deleteRoom(id);

    if (error) {
      setMessage("Failed to delete room.");
      return;
    }

    setMessage("Room deleted successfully.");
    fetchRooms();
  }

  function handleCancelEdit() {
    setEditId(null);

    setFormData({
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

    setMessage("Edit cancelled.");
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="admin-hero transylvania-hero">
          <h1>Manage Hotel Transylvania Rooms</h1>
          <p>
            Update themed suites, monster capacity, room facilities,
            and nightly rates.
          </p>
        </div>

        <div className="admin-form-wrapper">
          <form className="admin-form-card spooky-form" onSubmit={handleSubmit}>
            <h2>{editId ? "Edit Monster Room" : "Add New Monster Room"}</h2>

            <input
              type="text"
              name="name"
              placeholder="Room name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Room description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              name="occupancy"
              placeholder="Occupancy"
              value={formData.occupancy}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bed_type"
              placeholder="Bed type"
              value={formData.bed_type}
              onChange={handleChange}
            />

            <input
              type="text"
              name="size"
              placeholder="Room size"
              value={formData.size}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price per night"
              value={formData.price}
              onChange={handleChange}
            />

            <textarea
              name="amenities"
              placeholder="Amenities (separate with semicolons)"
              value={formData.amenities}
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              name="tags"
              placeholder="Tags"
              value={formData.tags}
              onChange={handleChange}
            />

            <select
              name="available"
              value={formData.available}
              onChange={handleChange}
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>

            <div className="button-group">
              <button type="submit" className="primary-btn">
                {editId ? "Update Room" : "Add Room"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>

            {message && <p className="message-text">{message}</p>}
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Category</th>
                <th>Occupancy</th>
                <th>Bed Type</th>
                <th>Size</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Loading rooms...</td>
                </tr>
              ) : rooms.length === 0 ? (
                <tr>
                  <td colSpan="8">No rooms found.</td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.category}</td>
                    <td>{room.occupancy}</td>
                    <td>{room.bed_type}</td>
                    <td>{room.size}</td>
                    <td>₲{room.price}</td>
                    <td>{room.available ? "Available" : "Not Available"}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(room)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(room.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}