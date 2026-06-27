import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import Loader from "../Loader/Loader";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          "/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
        setOrderHistory([]);
      }
    };

    // Load persisted payment mode/price details from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("orderPaymentDetails") || "{}");
      setPaymentDetails(stored);
    } catch (e) {
      console.error("Failed to load payment details from storage:", e);
    }

    fetchOrders();
  }, []);

  // Group adjacent orders placed within 5 seconds of each other
  const getGroupedOrders = () => {
    if (!OrderHistory || OrderHistory.length === 0) return [];

    // Sort orders by date descending (newest first)
    const sortedOrders = [...OrderHistory].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const grouped = [];

    sortedOrders.forEach((order) => {
      if (!order || !order.book) return;

      const orderTime = new Date(order.createdAt).getTime();

      // Find if there is an existing group created within 5 seconds of this order
      const matchedGroup = grouped.find((g) => {
        const groupTime = new Date(g.createdAt).getTime();
        return Math.abs(groupTime - orderTime) < 5000;
      });

      const details = paymentDetails[order._id] || {
        paymentMethod: "COD",
        paymentStatus: "Pending",
      };

      if (matchedGroup) {
        matchedGroup.books.push(order.book);
        matchedGroup.orderIds.push(order._id);
        matchedGroup.totalBookPrice += Number(order.book.price) || 0;

        // If any book in the checkout group was marked as Online Payment, the group is online payment
        if (details.paymentMethod === "Online Payment" || details.paymentMethod === "Online") {
          matchedGroup.paymentMethod = "Online Payment";
          matchedGroup.paymentStatus = "Paid";
        }
      } else {
        grouped.push({
          createdAt: order.createdAt,
          books: [order.book],
          orderIds: [order._id],
          totalBookPrice: Number(order.book.price) || 0,
          paymentMethod: details.paymentMethod,
          paymentStatus: details.paymentStatus,
        });
      }
    });

    return grouped;
  };

  const groupedOrders = getGroupedOrders();

  return (
    <>
      {!OrderHistory && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>

            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No Orders"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div
          className="min-h-screen p-0 md:p-4 text-zinc-100 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/66/9a/1b/669a1bfdbb3814f673c5f803774365d7.jpg')",
          }}
        >
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-900 mb-8 text-center font-serif">
            Your Order History
          </h1>

          {/* Desktop Header */}
          <div className="hidden md:flex bg-zinc-800 rounded py-3 px-4 items-center text-center font-semibold mb-3">
            <div className="w-[10%]">Sr. No.</div>
            <div className="w-[40%]">Book Name</div>
            <div className="w-[15%]">Price</div>
            <div className="w-[15%]">Order Date</div>
            <div className="w-[20%]">Mode</div>
          </div>

          {groupedOrders.map((group, i) => {
            const isCod = group.paymentMethod === "COD";
            const modeText = isCod ? "COD" : "Online";
            const modeColor = isCod ? "text-amber-400" : "text-green-400";
            const priceText = isCod
              ? `${group.totalBookPrice} (+ 30 delivery)`
              : `${group.totalBookPrice}`;

            return (
              <div
                key={group.orderIds.join("-")}
                className="bg-stone-700 rounded-lg p-4 mb-4 hover:bg-zinc-900 transition-all duration-300"
              >
                {/* Mobile View */}
                <div className="md:hidden">
                  <div className="text-sm text-zinc-400 mb-2">
                    Order #{i + 1}
                  </div>

                  <div className="text-lg font-semibold text-blue-300 leading-snug flex flex-col gap-1.5">
                    {group.books.map((book, idx) => (
                      <Link
                        key={book._id || idx}
                        to={`/view-book-details/${book._id}`}
                        className="hover:underline hover:text-blue-200"
                      >
                        {book.title}
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-between mt-3 text-base">
                    <span className="font-sans text-zinc-100">{priceText}</span>
                    <span className={`font-semibold ${modeColor}`}>
                      {modeText}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-zinc-400 font-sans">
                    Date:{" "}
                    {group.createdAt
                      ? new Date(group.createdAt).toLocaleDateString("en-IN")
                      : "N/A"}
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex items-center text-center">
                  <div className="w-[10%]">
                    {i + 1}
                  </div>

                  <div className="w-[40%] text-left px-4 text-zinc-100 leading-relaxed font-sans">
                    {group.books.map((book, idx) => (
                      <span key={book._id || idx}>
                        <Link
                          to={`/view-book-details/${book._id}`}
                          className="hover:text-blue-300 hover:underline text-zinc-100 font-medium"
                        >
                          {book.title}
                        </Link>
                        {idx < group.books.length - 1 && ", "}
                      </span>
                    ))}
                  </div>

                  <div className="w-[15%] font-sans text-zinc-100">
                    {priceText}
                  </div>

                  <div className="w-[15%] font-sans">
                    {group.createdAt
                      ? new Date(group.createdAt).toLocaleDateString("en-IN")
                      : "N/A"}
                  </div>

                  <div className={`w-[20%] font-semibold ${modeColor}`}>
                    {modeText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;