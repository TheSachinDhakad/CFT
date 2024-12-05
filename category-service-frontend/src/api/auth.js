import API from "./axios";

export const login = async (email, password) => {
  return API.post("/auth/login", { email, password });
};