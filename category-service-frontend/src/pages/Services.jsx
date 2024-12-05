import { useEffect, useState } from "react";
import { getServices, deleteService } from "../api/service";
import { getCategories } from "../api/category";
import ServiceForm from "../components/ServiceForm";

export default function Services() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null); // Track service being edited

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategoryId(data[0].id); // Default to the first category
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async (categoryId) => {
    if (!categoryId) return;
    try {
      const { data } = await getServices(categoryId);
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    fetchServices(categoryId);
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(selectedCategoryId, serviceId);
      fetchServices(selectedCategoryId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service); // Set the service for editing
  };

  const clearEditingService = () => {
    setEditingService(null); // Clear the editing state after submission
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchServices(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 font-semibold">
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          className="border p-2 rounded w-full"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ServiceForm
        categoryId={selectedCategoryId}
        service={editingService}
        onSuccess={() => {
          fetchServices(selectedCategoryId);
          clearEditingService(); // Clear editing state after submission
        }}
      />
      <ul className="mt-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>
              {service.name} - {service.type}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
