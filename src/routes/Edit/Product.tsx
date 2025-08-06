import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

const ProductEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]); // <- danh sách từ API

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy sản phẩm theo id
    axios.get(`http://localhost:3001/products/${id}`).then((res) => {
      const product = res.data;
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category); // sẽ khớp với `option value`
      setImage(product.image);
    });

    // Lấy danh sách categories
    axios
      .get("http://localhost:3001/categories")
      .then((res) => setCategories(res.data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = { name, price, category, image };
    await axios.put(`http://localhost:3001/products/${id}`, updatedProduct);
    navigate("/admin");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 w-full"
          placeholder="Name Product"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-2 py-1 w-full"
          placeholder="Price"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border px-2 py-1 w-full"
          placeholder="Image URL"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-1 w-full"
        >
          <option value="">-- Chọn Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-blue-500 px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
