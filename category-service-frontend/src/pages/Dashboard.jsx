import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Redirect to login if no token is present
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
      <p>Select a category or service from the navigation bar above to get started.</p>
    </div>
  );
}
