import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const currentPath = location.pathname;

  // Base navigation links
  let baseLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
  ];

  if (auth?.isLoggedIn) {
    baseLinks.push({ title: "Cart", link: "/cart" });
    baseLinks.push({ title: "Profile", link: "/profile" });
  }

  // Filter links conditionally:
  // - Hide "Home" when on Home page ("/")
  // - Hide "All Books" when on All Books page ("/all-books")
  const visibleLinks = baseLinks.filter((item) => {
    if (item.title === "Home" && currentPath === "/") {
      return false;
    }
    if (item.title === "All Books" && currentPath === "/all-books") {
      return false;
    }
    return true;
  });

  const [MobileNav, setMobileNav] = useState("hidden");

  useEffect(() => {
    if (MobileNav === "block") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [MobileNav]);

  return (
    <>
      {/* Sticky/Fixed Premium Redesigned Navbar */}
      <nav className="sticky top-0 z-50 flex bg-stone-900/95 backdrop-blur-md text-amber-50 px-6 md:px-12 py-4 items-center justify-between shadow-lg border-b border-stone-800">
        <Link to="/" className="flex items-center group">
          <img className="h-10 me-3 transition-transform duration-300 group-hover:rotate-6" src={logo} alt="logo" />
          <h1 className="text-2xl font-serif font-bold tracking-wide text-amber-100 group-hover:text-amber-200 transition-colors duration-300">
            ScriptAura
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {visibleLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className={
                item.title === "Profile"
                  ? "px-5 py-2 border border-amber-200/50 rounded-full text-amber-100 font-semibold hover:bg-amber-100 hover:text-stone-900 transition-all duration-300 shadow-sm hover:shadow-md"
                  : "relative pb-1 text-amber-100 hover:text-amber-200 font-medium transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-amber-200 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              }
            >
              {item.title}
            </Link>
          ))}

          {!auth?.isLoggedIn && (
            <div className="flex items-center gap-4 border-l border-stone-800 ps-6">
              <Link
                to="/login"
                className="px-4 py-1.5 border border-amber-200/40 text-amber-100 font-medium rounded-lg hover:bg-amber-100 hover:text-stone-900 transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-1.5 bg-[#7A8F6A] text-white font-medium rounded-lg hover:bg-[#5E7151] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-3xl text-amber-100 hover:text-amber-200 transition-colors duration-200"
          onClick={() =>
            setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
          }
          aria-label="Toggle Menu"
        >
          {MobileNav === "hidden" ? <AiOutlineMenu /> : <AiOutlineClose />}
        </button>
      </nav>

      {/* Mobile Full Screen Menu */}
      <div
        className={`${MobileNav} fixed inset-0 z-[9999] md:hidden`}
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/7e/5f/92/7e5f9292a60d510cae5a823eb13db82a.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Blur Overlay */}
        <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"></div>

        {/* Close Button on Mobile Overlay */}
        <button
          className="absolute top-5 right-6 text-4xl text-amber-200 hover:text-amber-100 transition-colors duration-200 z-20"
          onClick={() => setMobileNav("hidden")}
          aria-label="Close Menu"
        >
          <AiOutlineClose />
        </button>

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
          {/* Logo in mobile overlay */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <img className="h-16 w-auto" src={logo} alt="logo" />
            <h1 className="text-3xl font-serif font-bold tracking-wide text-amber-100">
              ScriptAura
            </h1>
            <div className="w-16 h-[2px] bg-amber-200/40 mt-2"></div>
          </div>

          {visibleLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMobileNav("hidden")}
              className={
                item.title === "Profile"
                  ? "px-8 py-3 rounded-xl border border-amber-200/30 bg-white/5 text-amber-100 text-xl font-bold tracking-[0.15em] uppercase hover:bg-amber-100 hover:text-stone-900 transition-all duration-300"
                  : "text-amber-100 text-2xl font-bold tracking-[0.2em] uppercase hover:text-amber-200 transition-all duration-300"
              }
            >
              {item.title}
            </Link>
          ))}

          {!auth?.isLoggedIn && (
            <div className="flex flex-col gap-4 w-64 mt-4">
              <Link
                to="/login"
                onClick={() => setMobileNav("hidden")}
                className="px-8 py-3 rounded-xl border border-amber-200/35 bg-white/5 text-amber-100 text-center text-lg font-bold tracking-[0.12em] uppercase hover:bg-amber-100 hover:text-stone-900 transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMobileNav("hidden")}
                className="px-8 py-3 rounded-xl bg-[#7A8F6A] text-white text-center text-lg font-bold tracking-[0.12em] uppercase hover:bg-[#5E7151] transition-all duration-300 shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
