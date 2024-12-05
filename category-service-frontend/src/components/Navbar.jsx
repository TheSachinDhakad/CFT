import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login after logout
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:underline">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/categories/1/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:underline">
                LogOut
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
