import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Room",
      description: "A cozy room with queen-sized bed and city view.",
      price: 3500,
      capacity: 2,
      available: true,
    },
    {
      id: 2,
      name: "Family Suite",
      description: "A spacious suite ideal for families and group stays.",
      price: 5500,
      capacity: 4,
      available: true,
    },
    {
      id: 3,
      name: "Single Room",
      description: "A simple and affordable room for solo travelers.",
      price: 2200,
      capacity: 1,
      available: false,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    capacity: "",
    available: "true",
  });

  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.capacity
    ) {
      setMessage("Please fill in all room fields.");
      return;
    }

    if (editId) {
      const updatedRooms = rooms.map((room) =>
        room.id === editId
          ? {
              ...room,
              name: formData.name,
              description: formData.description,
              price: Number(formData.price),
              capacity: Number(formData.capacity),
              available: formData.available === "true",
            }
          : room
      );

      setRooms(updatedRooms);
      setMessage("Room updated successfully.");
      setEditId(null);
    } else {
      const newRoom = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        available: formData.available === "true",
      };

      setRooms([...rooms, newRoom]);
      setMessage("Room added successfully.");
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      capacity: "",
      available: "true",
    });
  }

  function handleDelete(id) {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    setMessage("Room deleted successfully.");
  }

  function handleEdit(room) {
    setFormData({
      name: room.name,
      description: room.description,
      price: room.price,
      capacity: room.capacity,
      available: room.available ? "true" : "false",
    });

    setEditId(room.id);
    setMessage("Editing selected room.");
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h1>Room Management</h1>
        <p>Add, edit, delete, and view all hotel rooms.</p>

        <div className="form-page">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>{editId ? "Edit Room" : "Add New Room"}</h2>

            <input
              type="text"
              name="name"
              placeholder="Room name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Room description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Room price"
              value={formData.price}
              onChange={handleChange}
            />

            <input
              type="number"
              name="capacity"
              placeholder="Room capacity"
              value={formData.capacity}
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

            <button type="submit" className="primary-btn">
              {editId ? "Update Room" : "Add Room"}
            </button>

            {message && <p className="message-text">{message}</p>}
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.description}</td>
                  <td>₱{room.price}</td>
                  <td>{room.capacity}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}