import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-sky-600 via-indigo-700 to-purple-700 text-white bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-sky-800">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          Stock Sentiment
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-14">
          <Link to="/" className="text-lg font-semibold hover:text-gray-900">Home</Link>
          <Link to="/stock" className="text-lg font-semibold hover:text-gray-900">Stock Analysis</Link>
          <Link to="/about" className="text-lg font-semibold hover:text-gray-900">About</Link>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <button
              className="bg-white text-sky-600 hover:bg-sky-100 font-semibold py-2 px-4 rounded-lg shadow transition"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" className="text-lg font-semibold hover:text-gray-900">Signup</Link>
              <Link to="/login" className="text-lg font-semibold hover:text-gray-900">Login</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={handleMobileMenuToggle}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white px-4 pb-4">
          <Link to="/" className="block py-2 font-medium hover:text-sky-400">Home</Link>
          <Link to="/stock" className="block py-2 font-medium hover:text-sky-400">Stock Analysis</Link>
          <Link to="/about" className="block py-2 font-medium hover:text-sky-400">About</Link>

          <div className="mt-2 border-t border-gray-700 pt-2">
            {user ? (
              <button
                onClick={logout}
                className="w-full text-left py-2 font-medium hover:text-sky-400"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/signup" className="block py-2 font-medium hover:text-sky-400">Signup</Link>
                <Link to="/login" className="block py-2 font-medium hover:text-sky-400">Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
