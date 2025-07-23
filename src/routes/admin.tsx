import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => setUsers(res.data));
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data));
  }, []);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Users section */}
        <section id="users" className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Users</h3>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Products section */}
        <section id="products">
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-2 px-4">
                    <img
                      src={product.image}
                      className="h-10 w-10 rounded object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-red-400 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
