import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`).then((res) => {
      setEmail(res.data.email);
      setPassword(res.data.password);
      setRole(res.data.role);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/users/${id}`, {
      email,
      password,
      role,
    });
    navigate("/admin");
  };
  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Email...."
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Email...."
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
            className="border px-2 py-1 w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="bg-blue-500 text-blue-600 px-4 py-2 rounded">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default UserEdit;
