import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { name, price: Number(price), category, image };
    await axios.post("http://localhost:3001/products", newProduct);
    alert("Add new product successfull");
    navigate("/admin");
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            required
          />

          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            required
          />

          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL Image"
            required
          />

          <select
            className="border px-2 py-1 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductAdd;
