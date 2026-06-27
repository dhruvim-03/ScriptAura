import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const role=useSelector((state) => state.auth.role);
  return (
   <>
    {role ==="user" &&  (<div className="w-full flex flex-wrap lg:hidden items-center justify-center mt-4 gap-1">
       <Link
         to="/profile"
         className="text-zinc-100 font-semibold px-3 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm"
       >
         Favourites
       </Link>

       <Link
         to="/profile/orderHistory"
         className="text-zinc-100 font-semibold px-3 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm"
       >
         Order History
       </Link>

       <Link
         to="/profile/settings"
         className="text-zinc-100 font-semibold px-3 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm"
       >
         Settings
       </Link>
     </div>
    )}
     {role ==="admin" && (<div className="w-full flex flex-wrap lg:hidden items-center justify-center mt-4 gap-1">
       <Link
         to="/profile"
         className="text-zinc-100 font-semibold px-3 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm"
       >
         All Orders
       </Link>

       <Link
         to="/profile/add-book"
         className="text-zinc-100 font-semibold px-3 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm"
       >
         Add Book
       </Link>
     </div>
   )}
</>
  );
};

export default MobileNav;