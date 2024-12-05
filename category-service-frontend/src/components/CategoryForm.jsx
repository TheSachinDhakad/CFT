import { useState } from "react";
import { createCategory } from "../api/category";

export default function CategoryForm({ onSuccess }) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name: categoryName });
      setCategoryName("");
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Category
      </button>
    </form>
  );
}
