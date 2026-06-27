import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import fav from "../../assets/fav.png";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [removingId, setRemovingId] = useState("");

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const getHeaders = () => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchFavourites = async () => {
    try {
      const response = await api.get(
        "/api/v1/get-favourite-books",
        { headers: getHeaders() }
      );
      setFavouriteBooks((response.data.data || []).filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch favourites:", error);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleRemove = async (bookid) => {
    if (!bookid || removingId) return;

    setRemovingId(bookid);

    try {
      const response = await api.delete(
        "/api/v1/remove-book-from-favourite",
        {
          headers: {
            ...getHeaders(),
            bookid,
          },
        }
      );

      triggerToast(response.data.message);
      setFavouriteBooks((prev) =>
        prev.filter((book) => book._id !== bookid)
      );
    } catch (error) {
      console.error("Failed to remove book from favourite:", error);
      triggerToast("Failed to remove from favourites.");
    } finally {
      setRemovingId("");
    }
  };

  if (!favouriteBooks) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-stone-500">
        <div className="text-xl">Loading Favourites...</div>
      </div>
    );
  }
return (
  <div
    className="min-h-screen bg-cover bg-center bg-fixed"
    style={{
      backgroundImage:
        "url('https://i.pinimg.com/1200x/f4/04/c7/f404c71aa9456800e7db48650b701d74.jpg')",
    }}
  >
    <div className="min-h-screen bg-black/60 p-4 md:p-6 relative">
      {favouriteBooks.length === 0 && (
        <div className="h-[70vh] flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            No Favourite Books
          </h1>

          <img
            src={fav}
            alt="No favourites"
            className="w-52 md:w-72 mb-6 object-contain"
          />

          <p className="text-lg text-center">
            Add books to your favourites to see them here.
          </p>
        </div>
      )}

      {favouriteBooks.length > 0 && (
        <>
          <h1 className="text-4xl font-serif font-bold text-white mb-8 text-center">
            Favourite Books
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favouriteBooks.map((items, i) => (
              <div
                key={items._id || i}
                className="bg-white/90 backdrop-blur-sm border border-stone-200 rounded-xl p-4 flex flex-col justify-between shadow-xl"
              >
                <Link to={`/view-book-details/${items._id}`}>
                  <div className="bg-stone-100 rounded-lg flex items-center justify-center h-[30vh]">
                    <img
                      src={items.url}
                      alt={items.title || "book cover"}
                      className="h-full object-contain p-2"
                    />
                  </div>

                  <h2 className="mt-4 text-xl text-stone-800 font-semibold line-clamp-1">
                    {items.title || "Untitled Book"}
                  </h2>

                  <p className="mt-2 text-stone-600 font-semibold line-clamp-1">
                    by {items.author || "Unknown Author"}
                  </p>

                  <p className="mt-2 text-zinc-500 text-sm line-clamp-1">
                    {items.genre || "Unknown Genre"}
                  </p>

                  <p className="mt-2 text-green-700 font-bold text-xl">
                    ₹ {items.price}
                  </p>
                </Link>

                <button
                  onClick={() => handleRemove(items._id)}
                  disabled={removingId === items._id}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-4 transition-all duration-300 w-full cursor-pointer shadow-md disabled:opacity-70"
                >
                  {removingId === items._id
                    ? "Removing..."
                    : "Remove From Favourites"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {toast.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-zinc-800 text-white border border-[#7A8F6A] py-6 px-10 rounded-2xl shadow-2xl flex flex-col items-center gap-4 max-w-sm text-center">
            <div className="w-16 h-16 bg-[#7A8F6A] rounded-full flex items-center justify-center text-3xl font-bold text-white">
              ✓
            </div>

            <p className="text-xl font-semibold tracking-wide">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);


};

export default Favourites;