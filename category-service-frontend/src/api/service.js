import API from "./axios";

export const getServices = async (categoryId) =>
  API.get(`/category/${categoryId}/services`);
export const createService = async (categoryId, data) =>
  API.post(`/category/${categoryId}/service`, data);
export const updateService = async (categoryId, serviceId, data) =>
  API.put(`/category/${categoryId}/service/${serviceId}`, data);
export const deleteService = async (categoryId, serviceId) =>
  API.delete(`/category/${categoryId}/service/${serviceId}`);
