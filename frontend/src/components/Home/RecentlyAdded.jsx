import { useEffect, useState } from "react";
import api from "../../utils/api";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentBooks = async () => {
      // Step 1: Load from cache immediately IF it has real data (not empty)
      let hasCachedData = false;
      try {
        const cached = localStorage.getItem("recent_books");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setData(parsed.filter(Boolean).slice(0, 4));
            setLoading(false);
            hasCachedData = true;
          }
        }
      } catch (e) {
        console.error("Failed to read book cache:", e);
      }

      // Step 2: Always fetch fresh data from the API in the background
      try {
        const response = await api.get(
          "/api/v1/get-recent-books"
        );
        if (response.data && response.data.data) {
          const books = response.data.data.filter(Boolean).slice(0, 4);
          setData(books);
          setError("");
          // Only cache if we actually got books — never cache an empty array
          if (books.length > 0) {
            localStorage.setItem("recent_books", JSON.stringify(books));
          }
        }
      } catch (err) {
        console.error("Failed to fetch recent books:", err);
        // Only show error if we have no cached data to fall back on
        if (!hasCachedData) {
          setError(
            "Books are coming your way. Please wait for a few seconds"
          );
        }
        // If we had cached data, stay silent — books are already displayed
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-amber-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-amber-50/25 px-4 md:px-12 py-12 backdrop-blur-[2px]">
      <h4 className="text-3xl text-stone-700 font-serif font-semibold mb-4">
        RECENTLY ADDED BOOKS
      </h4>

      {error ? (
        <div className="my-8 p-6 bg-red-50/90 border border-red-200 text-red-800 rounded-2xl shadow-sm text-center max-w-2xl mx-auto backdrop-blur-sm">
          <p className="text-lg font-semibold mb-2">Oops! Books are missing...</p>
          <p className="text-sm font-sans">{error}</p>
        </div>
      ) : data.length === 0 ? (
        <div className="my-8 p-6 bg-white/80 border border-amber-200 text-stone-700 rounded-2xl shadow-sm text-center max-w-2xl mx-auto backdrop-blur-sm">
          <p className="text-lg font-serif font-semibold">The bookshelves are currently empty!</p>
          <p className="text-sm mt-1 font-sans">Check back later or add some books from the admin dashboard.</p>
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.map((item, i) => (
            <div key={item._id || i} className="transform transition-transform duration-300 hover:scale-[1.02]">
              <BookCard
                data={item}
                onDelete={(deletedId) => setData((prev) => prev.filter((b) => b && b._id !== deletedId))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
