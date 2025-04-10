import React, { useState } from "react";
import "./User.css";

const User = ({ currentUserRole }) => {
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Doe", role: "Super Admin", lastLogin: "2025-03-29", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Admin", lastLogin: "2025-03-27", status: "Disabled" },
    { id: 3, name: "David Johnson", role: "Editor", lastLogin: "2025-03-25", status: "Active" },
  ]);

  const [newAdmin, setNewAdmin] = useState({ name: "", role: "Admin", status: "Active" });

  // Role-based access control (RBAC)
  const hasPermission = (action) => {
    if (currentUserRole === "Super Admin") return true; // Full Access
    if (currentUserRole === "Admin") return action !== "delete"; // Admins can add/edit but not delete
    if (currentUserRole === "Editor") return action === "edit"; // Editors can only edit roles
    return false; // Viewers have no permissions
  };

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const addAdmin = () => {
    if (!hasPermission("add") || newAdmin.name.trim() === "") return;
    setAdmins([...admins, { ...newAdmin, id: admins.length + 1, lastLogin: "Never" }]);
    setNewAdmin({ name: "", role: "Admin", status: "Active" });
  };

  const editAdminRole = (id, newRole) => {
    if (!hasPermission("edit")) return;
    setAdmins(admins.map(admin => admin.id === id ? { ...admin, role: newRole } : admin));
  };

  const deleteAdmin = (id) => {
    if (!hasPermission("delete")) return;
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  return (
    <div className="user-management-container">
      <h1>👤 Admin User Management</h1>

      {/* Add New Admin (Only Super Admin and Admin can add) */}
      {hasPermission("add") && (
        <div className="add-admin">
          <input
            type="text"
            name="name"
            placeholder="Enter Admin Name"
            value={newAdmin.name}
            onChange={handleInputChange}
          />
          <select name="role" value={newAdmin.role} onChange={handleInputChange}>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button onClick={addAdmin} className="add-button">➕ Add New Admin</button>
        </div>
      )}

      {/* Admins Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>
                {hasPermission("edit") ? (
                  <select value={admin.role} onChange={(e) => editAdminRole(admin.id, e.target.value)}>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                ) : (
                  admin.role
                )}
              </td>
              <td>{admin.lastLogin}</td>
              <td className={admin.status === "Active" ? "status-active" : "status-disabled"}>
                {admin.status}
              </td>
              <td>
                {hasPermission("edit") && (
                  <button className="edit-btn">✏️ Edit</button>
                )}
                {hasPermission("delete") && (
                  <button className="delete-btn" onClick={() => deleteAdmin(admin.id)}>❌ Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;

