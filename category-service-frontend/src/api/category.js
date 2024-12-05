import API from "./axios";

export const getCategories = async () => API.get("/categories");
export const createCategory = async (data) => API.post("/category", data);
export const updateCategory = async (id, data) =>
  API.put(`/category/${id}`, data);
export const deleteCategory = async (id) =>
  API.delete(`/category/${id}`);
