import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-300 z-50">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        {/* Left Side: Logo and Name */}
        <Link to="/" className="flex items-center gap-2">
          <img className="h-10 w-auto" src={logo} alt="TaskMart Logo" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            TaskMart
          </h2>
        </Link>

        {/* Right Side: Profile and Buttons */}
        <div className="flex items-center gap-4">
          {user && user?.email ? (
            <div className="flex items-center gap-2">
              {/* Profile Avatar */}
              <Link to={"/"}>
                <button className="flex items-center gap-2">
                  <img
                    src={user?.photoURL}
                    alt="User Profile"
                    title={user?.displayName}
                    className="w-11 h-11 rounded-full border-2 border-gray-300 shadow-md hover:border-blue-500 transition-all duration-300"
                  />
                </button>
              </Link>

              {/* Logout Button */}
              <button
                className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
                onClick={logOut}
              >
                Log Out
              </button>
            </div>
          ) : (
            <NavLink to="/signIn">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
                SignIn
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
