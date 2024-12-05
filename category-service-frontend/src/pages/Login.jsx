import { useState } from "react";
import { login } from "../api/auth";
import { Spin, message } from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const { data } = await login(email, password);
      localStorage.setItem("token", data.token);
      setLoading(false); // Stop loader
      message.success("Login successful! Redirecting...");
      window.location.href = "/dashboard"; // Redirect after success
    } catch (err) {
      setLoading(false); // Stop loader
      message.error("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <Spin spinning={loading}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </Spin>
  );
}
