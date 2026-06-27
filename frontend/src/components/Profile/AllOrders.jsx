import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { FaUser, FaBook, FaCalendarAlt } from "react-icons/fa";

const AllOrders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/v1/get-all-orders",
        { headers }
      );
      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await api.put(
        `/api/v1/update-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      triggerToast(response.data.message || "Status Updated Successfully");
      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      triggerToast("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div
  className="h-[92vh] rounded-2xl shadow-2xl p-6 overflow-y-auto font-sans bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://i.pinimg.com/736x/33/e8/bc/33e8bcf67f1d27ca22c1a06aa767a7bc.jpg')",
  }}
>
    
  <h1 className="text-5xl md:text-4xl font-bold text-white text-center mb-10 tracking-wide drop-shadow-lg">
  All Orders
</h1>

      {orders && orders.length === 0 ? (
        <div className="h-[50vh] flex flex-col items-center justify-center text-zinc-400">
          <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No Orders"
            className="h-[15vh] opacity-50"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Header Row */}
          <div className="hidden md:flex bg-zinc-700/50 rounded-xl py-4 px-5 text-zinc-200 font-bold text-lg">
            <div className="w-[5%]">Sr.</div>
            <div className="w-[20%] text-left">User Name</div>
            <div className="w-[35%] text-left">Book Title</div>
            <div className="w-[12%]">Price</div>
            <div className="w-[13%]">Date</div>
            <div className="w-[15%]">Status</div>
          </div>

          {/* Data Rows */}
          {orders.map((order, i) => {
            if (!order) return null;
            return (
              <div
                key={order._id}
                className="bg-zinc-750/30 border border-zinc-700/50 rounded-xl p-4 md:py-3 md:px-4 flex flex-col md:flex-row md:items-center hover:bg-zinc-700/20 transition-all duration-300 gap-2 md:gap-0"
              >
                {/* Mobile Info */}
                <div className="flex justify-between items-center md:hidden border-b border-zinc-700/50 pb-2 mb-2">
                  <span className="text-xs text-zinc-400">Order #{i + 1}</span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN")
                      : "N/A"}
                  </span>
                </div>

                <div className="w-full md:w-[5%] text-zinc-400 text-sm hidden md:block">
                  {i + 1}
                </div>

                <div className="w-full md:w-[20%] flex items-center gap-2 text-zinc-200">
                  <FaUser className="text-zinc-500 text-xs block md:hidden" />
                 <span className="font-semibold text-base md:text-lg text-white">
                    {order.user?.username || "Deleted User"}
                  </span>
                </div>

                <div className="w-full md:w-[35%] flex items-center gap-2">
                  <FaBook className="text-zinc-500 text-xs block md:hidden" />
                  {order.book ? (
                    <Link
                      to={`/view-book-details/${order.book._id}`}
                     className="text-[#FFD700] hover:text-[#FFEA70] hover:underline text-base md:text-lg font-semibold truncate max-w-[250px] md:max-w-none transition-all duration-300"
                    >
                      {order.book.title}
                    </Link>
                  ) : (
                    <span className="text-red-400 text-sm font-medium">Deleted Book</span>
                  )}
                </div>

            <div  className="w-full md:w-[12%] flex items-center gap-2 text-white text-base md:text-lg font-medium">
                  <span className="text-zinc-500 text-xs font-bold block md:hidden">₹</span>
                  <span>₹ {order.book?.price || "N/A"}</span>
                </div>

               <div className="w-full md:w-[13%] flex items-center gap-2 text-zinc-300 text-sm md:text-base">
                  <FaCalendarAlt className="text-zinc-500 text-xs block md:hidden" />
                  <span>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN")
                      : "N/A"}
                  </span>
                </div>

                <div className="w-full md:w-[15%] mt-2 md:mt-0">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-base font-semibold border border-zinc-600 outline-none focus:border-yellow-300 cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fade-in">
          <div className="bg-zinc-800 text-white border border-[#7A8F6A] py-6 px-10 rounded-2xl shadow-2xl flex flex-col items-center gap-4 max-w-sm text-center animate-bounce-short">
            <div className="w-16 h-16 bg-[#7A8F6A] rounded-full flex items-center justify-center text-base font-bold text-white shadow-lg shadow-[#7A8F6A]/20">
              Done
            </div>
            <p className="text-xl font-semibold tracking-wide">{toast.message}</p>
          </div>
        </div>
      )}
      </div>
    
  );
};

export default AllOrders;