import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { FaCartArrowDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";


const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Book ID:", id);
  const [Data, setData] = useState(() => {
    try {
      const recent = JSON.parse(localStorage.getItem("recent_books") || "[]");
      const all = JSON.parse(localStorage.getItem("all_books") || "[]");
      return (
        recent.find((b) => b._id === id) ||
        all.find((b) => b._id === id) ||
        null
      );
    } catch {
      return null;
    }
  });

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [actionPending, setActionPending] = useState("");

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const bgColor = "hsl(0, 0%, 95%)";
  const textColor = "hsl(0, 0%, 15%)";
  const subTextColor = "hsl(0, 0%, 32%)";
  const cardBgColor = "hsl(0, 0%, 88%)";

  const getHeaders = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  console.log("HEADERS:", headers);

  return headers;
};

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get(
          `/api/v1/get-book-by-id/${id}`
        );
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch book by id:", error);
        const recent = JSON.parse(localStorage.getItem("recent_books") || "[]");
        const all = JSON.parse(localStorage.getItem("all_books") || "[]");
        const book =
          recent.find((b) => b._id === id) || all.find((b) => b._id === id);
        if (book) {
          setData(book);
        }
      }
    };

    fetch();
  }, [id]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const checkStatus = async () => {
      try {
        const favRes = await api.get(
          "/api/v1/get-favourite-books",
          { headers: getHeaders() }
        );
        const favs = (favRes.data.data || []).filter(Boolean);
        setIsFavourite(favs.some((book) => book && book._id === id));
      } catch (error) {
        console.error("Error fetching favourites status:", error);
      }

      try {
        const cartRes = await api.get(
          "/api/v1/get-user-cart",
          { headers: getHeaders() }
        );
        const cartItems = (cartRes.data.data || []).filter(Boolean);
        setIsInCart(cartItems.some((book) => book && book._id === id));
      } catch (error) {
        console.error("Error fetching cart status:", error);
      }
    };

    checkStatus();
  }, [id, isLoggedIn]);

  const handleFavourite = async () => {
    if (actionPending) return;
    setActionPending("favourite");
    try {
      if (isFavourite) {
        const response = await api.delete(
          "/api/v1/remove-book-from-favourite",
          {
            headers: {
              ...getHeaders(),
              bookid: id,
            },
          }
        );
        triggerToast(response.data.message);
        setIsFavourite(false);
      } else {
        const response = await api.put(
          "/api/v1/add-book-to-favourite",
          {},
          {
            headers: {
              ...getHeaders(),
              bookid: id,
            },
          }
        );
        triggerToast(response.data.message);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Error toggling favourite status:", error);
      triggerToast("An error occurred. Please try again.");
    } finally {
      setActionPending("");
    }
  };

  const handleCart = async () => {
    if (actionPending || isInCart) return;
    setActionPending("cart");
    try {
      console.log("BOOK ID:", id);
      const response = await api.put(
        "/api/v1/add-to-cart",
        {},
        {
          headers: {
            ...getHeaders(),
            bookid: id,
          },
        }
      );
      triggerToast(response.data.message);
      if (response.data.message === "Book added to cart") {
        setIsInCart(true);
      }
    } catch (error) {
      console.log("ADD TO CART ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

      triggerToast("An error occurred. Please try again.");
    } finally {
      setActionPending("");
    }
  };

  const handleDeleteBook = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      const response = await api.delete(
        "/api/v1/delete-book",
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            bookid: id,
          },
        }
      );

      // Update cache in localStorage
      try {
        const allBooks = JSON.parse(localStorage.getItem("all_books") || "[]");
        const updatedAll = allBooks.filter((b) => b && b._id !== id);
        localStorage.setItem("all_books", JSON.stringify(updatedAll));

        const recentBooks = JSON.parse(localStorage.getItem("recent_books") || "[]");
        const updatedRecent = recentBooks.filter((b) => b && b._id !== id);
        localStorage.setItem("recent_books", JSON.stringify(updatedRecent));
      } catch (err) {
        console.error("Failed to update cache after delete:", err);
      }

      triggerToast(response.data.message);
      setTimeout(() => {
        navigate("/all-books");
      }, 2000);
    } catch (error) {
      console.error("Delete book failed:", error);
      triggerToast(error.response?.data?.message || "Failed to delete the book.");
    }
  };

  if (!Data) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="px-4 md:px-12 py-8 flex flex-col md:flex-row gap-8 min-h-screen transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
    >
      {/* Book Cover Section */}
      <div
        className="rounded p-4 h-[60vh] md:h-[88vh] w-full md:w-3/6 flex items-center justify-center transition-colors duration-500 shadow-sm relative"
        style={{ backgroundColor: cardBgColor }}
      >
        {isLoggedIn === true && role === "user" && (
          <button
            onClick={handleFavourite}
            className={`absolute top-3 right-3 md:top-4 md:right-4 rounded-full p-2 md:p-3 text-lg md:text-3xl shadow-lg transition-all duration-300 ${
              isFavourite
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 hover:bg-red-500 hover:text-white"
            } disabled:opacity-70`}
            disabled={actionPending === "favourite"}
          >
            <GoHeartFill />
          </button>
        )}
        {isLoggedIn === true && role === "admin" && (
          <Link
            to={`/update-book/${id}`}
            className="absolute top-3 right-3 md:top-4 md:right-4 bg-white rounded-full p-2 md:p-3 text-lg md:text-3xl shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center text-stone-850"
          >
            <MdEditSquare />
            <span className="text-sm md:text-base ms-1 font-semibold">Edit</span>
          </Link>
        )}

        <img
          src={Data.url}
          alt={Data.title || "book cover"}
          className="h-full max-h-[50vh] md:max-h-[70vh] object-contain rounded-lg shadow-md"
        />
      </div>

      {/* Details Section */}
      <div className="p-4 w-full md:w-3/6 flex flex-col justify-start">
        <h1
          className="text-4xl md:text-5xl font-semibold transition-colors duration-500"
          style={{ color: textColor }}
        >
          {Data.title || "Untitled Book"}
        </h1>

        <p
          className="mt-2 text-lg transition-colors duration-500"
          style={{ color: subTextColor }}
        >
          by{" "}
          <span className="font-semibold" style={{ color: textColor }}>
            {Data.author || "Unknown Author"}
          </span>
        </p>

        <p
          className="mt-6 text-lg md:text-xl leading-relaxed transition-colors duration-500"
          style={{ color: subTextColor }}
        >
          {Data.desc || "No description available."}
        </p>

        <p
          className="flex mt-6 items-center text-lg transition-colors duration-500"
          style={{ color: subTextColor }}
        >
          <GrLanguage className="me-3" />
          {Data.language || "Language not specified"}
        </p>

        <p
          className="mt-4 text-lg transition-colors duration-500"
          style={{ color: subTextColor }}
        >
          <span className="font-semibold" style={{ color: textColor }}>Genre: </span>
          {Data.genre || "Unknown Genre"}
        </p>

        {/* Price + Actions Section */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <div
            className="text-2xl font-semibold py-3 px-5 rounded-xl transition-colors duration-500"
            style={{
              backgroundColor: cardBgColor,
              color: textColor,
            }}
          >
            Rs. {Data.price ?? "0"}
          </div>

          {isLoggedIn === true && role === "user" && (
            <>
              {isInCart ? (
                <button
                  disabled
                  className="flex items-center gap-3 bg-zinc-700 text-zinc-400 px-5 py-3 rounded-xl text-lg font-semibold cursor-not-allowed shadow-inner"
                >
                  Already in Cart
                </button>
              ) : (
                <button
                  onClick={handleCart}
                  disabled={actionPending === "cart"}
                  className="flex items-center gap-3 bg-[#7A8F6A] hover:bg-[#5E7151] text-white px-5 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md disabled:opacity-70"
                >
                  <FaCartArrowDown className="text-2xl" />
                  {actionPending === "cart" ? "Adding..." : "Add to Cart"}
                </button>
              )}
            </>
          )}

          {isLoggedIn === true && role === "admin" && (
            <button
              onClick={handleDeleteBook}
              className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md"
            >
              <RiDeleteBin6Line />
              Delete Book
            </button>
          )}
        </div>
      </div>
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

export default ViewBookDetails;
