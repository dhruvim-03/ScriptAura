import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import api from "../utils/api";
import { useEffect, useState } from "react";

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      // Step 1: Load from cache immediately IF it has real data (not empty)
      let hasCachedData = false;
      try {
        const cached = localStorage.getItem("all_books");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setData(parsed.filter(Boolean));
            setLoading(false);
            hasCachedData = true;
          }
        }
      } catch (e) {
        console.error("Failed to read books cache:", e);
      }

      // Step 2: Always fetch fresh data from the API in the background
      try {
        const response = await api.get(
          "/api/v1/get-all-books"
        );
        if (response.data && response.data.data) {
          const books = response.data.data.filter(Boolean);
          setData(books);
          setError("");
          // Only cache if we actually got books — never cache an empty array
          if (books.length > 0) {
            localStorage.setItem("all_books", JSON.stringify(books));
          }
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
        // Only show error if we have no cached data to fall back on
        if (!hasCachedData) {
          setError(
            "Could not load the books. Please ensure the backend server is running."
          );
        }
        // If we had cached data, stay silent — books are already displayed
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Helper to format genres to Title Case (e.g. "classic fiction" -> "Classic Fiction")
  const toTitleCase = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Extract all unique genres dynamically from split book genres
  const genres = [
    "All Genres",
    ...new Set(
      Data.flatMap((book) => {
        if (!book || !book.genre) return [];
        return book.genre
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean)
          .map(toTitleCase);
      })
    )
  ];

  // Filter books dynamically based on selected genre
  const filteredBooks = Data.filter((book) => {
    if (!book) return false;
    if (selectedGenre === "All Genres") return true;
    if (!book.genre) return false;
    const bookGenres = book.genre.split(",").map((g) => g.trim().toLowerCase());
    return bookGenres.includes(selectedGenre.toLowerCase());
  });

  return (
    <div
  className="min-h-screen px-0 sm:px-12 py-8 bg-cover bg-center bg-fixed"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://i.pinimg.com/1200x/fc/3b/94/fc3b94533ab0137ab5cf49066c1a7f81.jpg')",
  }}
>
      <div className="mt-8 px-3 sm:px-4 pb-12">
        <div className="flex flex-col sm:relative sm:flex-row sm:items-center sm:justify-end gap-6 sm:gap-4 mb-6 border-b border-zinc-100 pb-6 sm:pb-4">
          <h4 className="text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 text-5xl text-zinc-100 font-bold border-b border-zinc-100 pb-4 sm:border-b-0 sm:pb-0 mb-2 sm:mb-0 w-full sm:w-auto">
            ALL BOOKS
          </h4>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-600/80 px-5 py-3 rounded-2xl shadow-lg mx-auto sm:mx-0">
            <span className="text-stone-100 text-lg font-semibold">
              Filter by Genre:
            </span>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-stone-400 text-zinc-100 rounded-xl px-5 py-3 text-lg font-semibold border-2 border-stone-300 outline-none focus:ring-2 focus:ring-amber-300 shadow-lg cursor-pointer min-w-[220px]"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="my-8 p-6 bg-red-950/40 border border-red-900 text-red-200 rounded-2xl shadow-sm text-center max-w-2xl mx-auto backdrop-blur-sm">
            <p className="text-lg font-semibold mb-2">Oops! Something went wrong...</p>
            <p className="text-sm font-sans">{error}</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="my-8 p-6 bg-amber-950/40 border border-amber-900 text-amber-200 rounded-2xl shadow-sm text-center max-w-2xl mx-auto backdrop-blur-sm">
            <p className="text-lg font-semibold">No books found in this genre!</p>
            <p className="text-sm mt-1 font-sans">Check back later or add books from the dashboard.</p>
          </div>
        ) : (
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredBooks.map((item, i) => (
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
    </div>
  );
};

export default AllBooks;
