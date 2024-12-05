import { useEffect, useState } from "react";
import { getCategories, deleteCategory, updateCategory } from "../api/category";
import CategoryForm from "../components/CategoryForm";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdate = async (id) => {
    try {
      await updateCategory(id, { name: editingName });
      setEditingId(null);
      setEditingName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <CategoryForm onSuccess={fetchCategories} />
      <ul className="mt-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center p-2 border-b"
          >
            {editingId === category.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border p-2 rounded flex-grow"
                />
                <button
                  onClick={() => handleUpdate(category.id)}
                  className="bg-green-500 text-white p-2 rounded ml-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white p-2 rounded ml-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <div>
                  <button
                    onClick={() => handleEdit(category.id, category.name)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
