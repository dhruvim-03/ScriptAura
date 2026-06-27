import { useState } from "react";
import api from "../utils/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-Help",
  "Horror",
  "Children's",
  "Young Adult",
  "Poetry",
  "Others",
];

const AddBook = () => {
  const { id, token } = useSelector((state) => state.auth ?? {});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    genre: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await api.post(
        "/api/v1/add-book",
        formData,
        {
          headers: {
            id,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ text: response.data.message || "Book added successfully!", type: "success" });
      setFormData({ url: "", title: "", author: "", price: "", desc: "", language: "", genre: "" });
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to add book. Please try again.";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
  "block text-base md:text-lg font-semibold text-zinc-200 mb-2";
  const inputClass =
  "w-full px-5 py-3 text-base md:text-lg bg-zinc-700 text-white rounded-xl border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500";

  return (
    <div
  className="h-[92vh] overflow-y-auto rounded-2xl px-6 md:px-12 py-8 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://i.pinimg.com/736x/e5/d5/5b/e5d55b2676bf12c30bc0b88932886ae5.jpg')",
  }}
>
      <h1 className="text-5xl md:text-4xl font-bold text-white text-center mb-10 tracking-wide drop-shadow-lg">
  Add New Book
</h1>

      {message.text && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-500/20 text-green-400 border border-green-700"
              : "bg-red-500/20 text-red-400 border border-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
  onSubmit={handleSubmit}
  className="max-w-3xl mx-auto space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-2xl"
>

        <div>
          <label className={labelClass}>Cover Image URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="" disabled>Select a genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="e.g. English"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 299"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows="5"
            placeholder="Book description..."
            className={`${inputClass} resize-none`}
            required
          />
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 text-base md:text-lg bg-teal-500 hover:bg-teal-800 text-white rounded-xl font-semibold transition-all disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-10 py-3 text-base md:text-lg border border-zinc-600 text-zinc-300 hover:text-white rounded-xl font-semibold transition-all"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddBook;
