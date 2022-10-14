import { Link } from "react-router-dom";
import { useGlobalAuthContext } from "../contexts/authContext";
import { useGlobalContext } from "../contexts/saleContext";

const Navbar = () => {
  const { user, logOut } = useGlobalAuthContext();
  const { setSales } = useGlobalContext();

  const handleClick = () => {
    setSales([]);
    logOut();
  };

  return (
    <header>
      <h1>Sales Tracker </h1>
      {user && (
        <div className="links">
          <h4 className="email">{user?.email}</h4>

          <button className="btn" onClick={handleClick}>
            Log Out
          </button>
        </div>
      )}
      {!user && (
        <div className="links">
          <Link to="/login" className="btn">
            Log In
          </Link>
          <Link to="/signup" className="btn">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
