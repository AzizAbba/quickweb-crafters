
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-brand-blue font-bold text-xl">QuickWeb</span>
              <span className="text-brand-darkgray font-medium">Creations</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-brand-blue px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-brand-blue px-3 py-2 text-sm font-medium">Services</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-brand-blue px-3 py-2 text-sm font-medium">Pricing</Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-blue px-3 py-2 text-sm font-medium">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-brand-blue px-3 py-2 text-sm font-medium">Contact</Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                {user.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-2 pt-2">
          <div className="flex flex-col space-y-1">
            <Link to="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>Home</Link>
            <Link to="/services" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>Services</Link>
            <Link to="/pricing" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>Pricing</Link>
            <Link to="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>Contact</Link>
            
            {user ? (
              <div className="flex flex-col space-y-1 pt-2 border-t border-gray-200">
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" className="w-full" onClick={() => { logout(); toggleMenu(); }}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link to="/signin" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
