import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t mt-16 pt-12 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Ecommerce</h2>
          <p className="text-sm text-gray-500 max-w-xs">
            A multivendor marketplace where buyers and sellers come together.
          </p>
        </div>

        {/* Company */}
        {/* Company */}
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left">
          <h3 className="font-semibold text-gray-900">Company</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-orange-500 transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-orange-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left">
          <h3 className="font-semibold text-gray-900">Account</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li>
              <Link
                to="/profile"
                className="hover:text-orange-500 transition-colors"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="hover:text-orange-500 transition-colors"
              >
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-orange-500 transition-colors"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-orange-500 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
