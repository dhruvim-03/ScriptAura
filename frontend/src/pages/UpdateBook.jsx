import { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    language: "",
    genre: "",
    desc: "",
  });

  const [loading, setLoading] = useState(false);
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
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;

    setData({
      ...Data,
      [name]: value,
    });
  };

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(
          `/api/v1/get-book-by-id/${id}`
        );

        setData({
          url: response.data.data.url,
          title: response.data.data.title,
          author: response.data.data.author,
          price: response.data.data.price,
          language: response.data.data.language,
          genre: response.data.data.genre || "",
          desc: response.data.data.desc,
        });
      } catch (error) {
        console.log(error);
        triggerToast("Failed to fetch book details.");
      }
    };

    fetchBook();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.put(
        "/api/v1/update-book",
        Data,
        { headers }
      );

      // Clear cache in localStorage to ensure fresh fetch
      try {
        localStorage.removeItem("all_books");
        localStorage.removeItem("recent_books");
      } catch (err) {
        console.error("Failed to clear cache:", err);
      }

      triggerToast(response.data.message);

      setTimeout(() => {
        navigate("/all-books");
      }, 2000);
    } catch (error) {
      console.log(error);
      triggerToast(
        error.response?.data?.message ||
          "Failed to update book."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-2xl bg-zinc-800 rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Update Book
        </h1>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-300 block mb-2">
              Book Cover URL
            </label>

            <input
              type="text"
              name="url"
              value={Data.url}
              onChange={change}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 outline-none focus:border-[#7A8F6A]"
            />
          </div>

          <div>
            <label className="text-zinc-300 block mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={Data.title}
              onChange={change}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 outline-none focus:border-[#7A8F6A]"
            />
          </div>

          <div>
            <label className="text-zinc-300 block mb-2">
              Author
            </label>

            <input
              type="text"
              name="author"
              value={Data.author}
              onChange={change}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 outline-none focus:border-[#7A8F6A]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-zinc-300 block mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={Data.price}
                onChange={change}
                className="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 outline-none focus:border-[#7A8F6A]"
              />
            </div>

            <div>
              <label className="text-zinc-300 block mb-2">
                Language
              </label>

              <input
                type="text"
                name="language"
                value={Data.language}
                onChange={change}
                className="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 outline-none focus:border-[#7A8F6A]"
              />
            </div>

            <div>
              <label className="text-zinc-300 block mb-2">
                Genre
              </label>

              <input
                type="text"
                name="genre"
                value={Data.genre}
                onChange={change}
                placeholder="Enter genres (comma separated)"
                className="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 outline-none focus:border-[#7A8F6A]"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-300 block mb-2">
              Description
            </label>

            <textarea
              rows="5"
              name="desc"
              value={Data.desc}
              onChange={change}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 outline-none focus:border-[#7A8F6A] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#7A8F6A] hover:bg-[#657757] text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Book"}
          </button>
        </form>
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

export default UpdateBook;