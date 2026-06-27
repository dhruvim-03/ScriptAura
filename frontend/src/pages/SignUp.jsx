import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const DEFAULT_AVATARS = [
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FF512F"/><stop offset="100%" stop-color="%23DD2476"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g1)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%232193b0"/><stop offset="100%" stop-color="%236dd5ed"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g2)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/><circle cx="50" cy="37" r="14" fill="%232193b0" opacity="0.3"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2311998e"/><stop offset="100%" stop-color="%2338ef7d"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g3)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/><circle cx="44" cy="35" r="3" fill="%2311998e"/><circle cx="56" cy="35" r="3" fill="%2311998e"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%237F00FF"/><stop offset="100%" stop-color="%23E100FF"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g4)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/><path d="M43,45Q50,49,57,45" stroke="%237F00FF" stroke-width="2.5" fill="none"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23F3904F"/><stop offset="100%" stop-color="%233B4371"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g5)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/><circle cx="44" cy="35" r="2.5" fill="%233B4371"/><circle cx="56" cy="35" r="2.5" fill="%233B4371"/><path d="M44,43Q50,47,56,43" stroke="%233B4371" stroke-width="2" fill="none"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%237A8F6A"/><stop offset="100%" stop-color="%235E7151"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g6)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23e65c00"/><stop offset="100%" stop-color="%23F9D423"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g7)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23a8c0ff"/><stop offset="100%" stop-color="%233f2b96"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g8)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g9" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ff007f"/><stop offset="100%" stop-color="%237f00ff"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g9)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g10" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%233A6073"/><stop offset="100%" stop-color="%233a7bd5"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g10)"/><circle cx="50" cy="37" r="18" fill="%23fff" opacity="0.95"/><path d="M22,78C22,63,34,58,50,58C66,58,78,63,78,78Z" fill="%23fff" opacity="0.95"/></svg>'
];

const SignUp = () => {
  // eslint-disable-next-line no-unused-vars
  const[Values]=useState({username:"",email:"", password:"",address:""});
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    address: "",
    avatar: DEFAULT_AVATARS[0],
  });

  const [customAvatar, setCustomAvatar] = useState("");
  const [selectedType, setSelectedType] = useState(0); // 0 to 9, or "custom"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max_size = 256;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > max_size) {
            height *= max_size / width;
            width = max_size;
          }
        } else {
          if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setCustomAvatar(dataUrl);
        setSelectedType("custom");
        setFormData((prev) => ({ ...prev, avatar: dataUrl }));
        setError("");
      };
    };
  };

  const validateForm = () => {
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      setError("Name must be at least 3 characters long.");
      return false;
    }

    if (!formData.username || formData.username.trim().length < 4) {
      setError("Username must be at least 4 characters long.");
      return false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (!formData.address || formData.address.trim().length < 5) {
      setError("Please enter a valid address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/api/v1/sign-up",
        formData
      );

      if (response.status === 200) {
        setSuccess("Account created successfully. Redirecting to login...");

        setFormData({
          username: "",
          fullName: "",
          email: "",
          password: "",
          address: "",
          avatar: DEFAULT_AVATARS[0],
        });
        setSelectedType(0);
        setCustomAvatar("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (

  <div
    className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage:
        "url('https://i.pinimg.com/1200x/6c/30/d2/6c30d23597da1da04a58bbacbc641b46.jpg')",
    }}
  >
    <div className="min-h-screen bg-black/10 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/50 p-8">
        {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-[#6B4F3A]">
        Create Account
      </h2>
      <p className="text-gray-600 mt-2 text-sm">
        Sign up to access your bookstore account.
      </p>
    </div>

    {/* Error Message */}
    {error && (
      <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    )}

    {/* Success Message */}
    {success && (
      <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        {success}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8F6A]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Username
        </label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your username"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8F6A]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8F6A]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8F6A]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Address
        </label>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={loading}
          rows="3"
          placeholder="Enter your address"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#7A8F6A]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Choose Profile Avatar
        </label>
        <div className="grid grid-cols-6 gap-2 p-2.5 bg-stone-100/50 border border-stone-200 rounded-xl mb-4">
          {DEFAULT_AVATARS.map((avatar, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => {
                setSelectedType(idx);
                setFormData((prev) => ({ ...prev, avatar }));
              }}
              className={`relative aspect-square rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none ${
                selectedType === idx
                  ? "ring-4 ring-yellow-400 border-2 border-yellow-400 shadow-md scale-105"
                  : "border border-stone-300 hover:border-stone-400"
              }`}
            >
              <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}

          {/* Custom Upload Option */}
          <div className="relative aspect-square">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                if (customAvatar) {
                  setSelectedType("custom");
                  setFormData((prev) => ({ ...prev, avatar: customAvatar }));
                } else {
                  document.getElementById("custom-avatar-upload").click();
                }
              }}
              className={`w-full h-full rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none flex flex-col items-center justify-center ${
                selectedType === "custom"
                  ? "ring-4 ring-yellow-400 border-2 border-yellow-400 shadow-md scale-105"
                  : "border border-dashed border-stone-400 bg-stone-50 hover:bg-stone-200 hover:border-stone-500"
              }`}
            >
              {customAvatar ? (
                <img src={customAvatar} alt="Custom" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-stone-500">
                  <span className="text-xl font-bold leading-none">+</span>
                  <span className="text-[9px] font-bold leading-none mt-1">Custom</span>
                </div>
              )}
            </button>
            {customAvatar && (
              <button
                type="button"
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("custom-avatar-upload").click();
                }}
                className="absolute -bottom-0.5 -right-0.5 bg-yellow-400 hover:bg-yellow-500 text-stone-900 rounded-full p-1 shadow-md transition-colors duration-200"
                style={{ width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
        <input
          id="custom-avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCustomUpload}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#7A8F6A] hover:bg-[#5E7151] text-white rounded-xl font-medium transition duration-300 disabled:opacity-70"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>

    <div className="mt-6 text-center border-t pt-5">
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
       <Link
  to="/login"
  className="text-[#7A8F6A] font-semibold hover:underline"
>
  Sign In
</Link>
      </p>
    </div>

  </div>
</div>
  </div>
);

};

export default SignUp;