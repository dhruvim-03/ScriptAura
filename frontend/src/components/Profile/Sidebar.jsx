import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";


const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(authActions.logout());
    navigate("/");
  };
  const role = useSelector((state) => state.auth.role);



  return (
    <div
      className="rounded-xl overflow-hidden bg-cover bg-center h-[92vh]"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/09/40/34/0940344adf9c0edc59cf6f4453ae7000.jpg')",
      }}
    >
      <div className="bg-black/70 h-full p-6 flex flex-col items-center">
        <img
          src={data?.avatar}
          alt="Profile"
          className="h-24 w-24 rounded-full border-2 border-white/30 object-cover mt-2"
        />
        <p className="mt-3 text-2xl font-bold text-white text-center">
          {data?.username}
        </p>
        <p className="mt-1 text-sm text-zinc-300 text-center break-all px-2">
          {data?.email}
        </p>
        <div className="w-full h-[1px] bg-zinc-500 my-5"></div>

        {role === "user" && (
          <div className="w-full flex-1 flex flex-col justify-center gap-3">
            <Link
              to="/profile"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg md:text-xl font-bold py-3 text-center rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg md:text-xl font-bold py-3 text-center rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg md:text-xl font-bold py-3 text-center rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Settings
            </Link>

          </div>
        )}
        {role === "admin" && (
          <div className="w-full flex-1 flex flex-col justify-center gap-3">
            <Link
              to="/profile"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg md:text-xl font-bold py-3 text-center rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              All Orders
            </Link>
            <Link
              to="/profile/add-book"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg md:text-xl font-bold py-3 text-center rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Add Book
            </Link>

          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full bg-zinc-900/80 text-white font-semibold flex items-center justify-center py-3 rounded-xl hover:bg-white hover:text-zinc-900 transition-all duration-300 mb-3"
        >
          Log Out
          <FaSignOutAlt className="ms-3" />
        </button>
      </div>
    </div>
  );
};
export default Sidebar;