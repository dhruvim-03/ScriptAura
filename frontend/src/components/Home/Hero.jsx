import front from "../../assets/front.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col lg:flex-row items-center justify-center gap-8 px-6 py-10 bg-amber-50/25">

      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">

        <h1 className="text-4xl lg:text-7xl font-semibold text-stone-700 font-serif leading-tight">
          Where Stories Find Their Readers!
        </h1>

        {/* Mobile Image */}
        <img
          src={front}
          alt="hero"
          className="block w-[82%] max-w-[360px] max-h-[42vh] object-contain lg:hidden my-6"
        />

        <p className="mt-4 text-lg lg:text-xl text-zinc-800 font-semibold">
          Unlock worlds hidden between the pages and dive into stories that
          inspire, educate, and stay with you forever.
        </p>

        <Link
          to="/all-books"
          className="mt-8 text-stone-900 hover:text-amber-50 text-lg lg:text-2xl font-semibold border border-stone-800 px-8 lg:px-20 py-3 lg:py-4 hover:bg-stone-800 backdrop-blur-sm bg-white/45 rounded-2xl shadow-lg transition-all duration-300"
        >
          Explore Our Collection
        </Link>
      </div>

      {/* Desktop Image */}
      <div className="hidden lg:flex lg:w-1/2 justify-center">
        <img
          src={front}
          alt="hero"
          className="w-[90%] max-w-[680px] max-h-[76vh] object-contain"
        />
      </div>

    </div>
  );
};

export default Hero;
