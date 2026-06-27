import React from "react";
import { Link } from "react-router-dom";
import { 
  FiBookOpen, 
  FiTarget, 
  FiAward, 
  FiUsers, 
  FiHeart, 
  FiCheckCircle 
} from "react-icons/fi";
import webbg from "../assets/webbg.png";

const AboutUs = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen py-12 px-4 md:px-12 flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${webbg})` }}
    >
      {/* Container with backdrop blur for premium look */}
      <div className="max-w-6xl w-full bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-stone-200/50 p-6 md:p-12 mt-6 animate-fade-in text-stone-800">
        
        {/* Section 1: Welcome to our BookStore */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#7A8F6A] bg-[#7A8F6A]/10 px-4 py-1.5 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-700 mt-4 mb-6 leading-tight">
            Welcome to ScriptAura
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-sans">
            At <strong className="text-stone-800 font-semibold">ScriptAura</strong>, we believe that books are not just sheets of paper bound together, but gateways to new worlds, ideas, and experiences. Our bookstore is a sanctuary for bibliophiles, casual readers, and lifelong learners alike.
          </p>
        </div>

        {/* Section 2: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-amber-50/50 rounded-2xl p-8 border border-amber-200/60 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#7A8F6A] rounded-xl flex items-center justify-center text-white mb-6 text-2xl shadow-lg shadow-[#7A8F6A]/20">
              <FiTarget />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-700 mb-4">
              Our Mission
            </h3>
            <p className="text-stone-600 leading-relaxed font-sans">
              To cultivate a diverse, inclusive community of readers by offering a meticulously curated selection of literature. We aim to inspire a passion for reading, champion independent authors, and make knowledge accessible to everyone, everywhere.
            </p>
          </div>

          <div className="bg-amber-50/50 rounded-2xl p-8 border border-amber-200/60 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#7A8F6A] rounded-xl flex items-center justify-center text-white mb-6 text-2xl shadow-lg shadow-[#7A8F6A]/20">
              <FiBookOpen />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-700 mb-4">
              Our Vision
            </h3>
            <p className="text-stone-600 leading-relaxed font-sans">
              To become a cherished cultural cornerstone where stories spark conversations. We envision a world enriched by literature, where reading fosters empathy, creativity, and mutual understanding across all walks of life.
            </p>
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-center text-stone-700 mb-10">
            Why Choose Us
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4 p-4 rounded-xl hover:bg-[#7A8F6A]/5 transition-colors duration-300">
              <div className="text-[#7A8F6A] text-2xl flex-shrink-0 mt-1">
                <FiCheckCircle />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-stone-800 mb-1">Handpicked Selection</h4>
                <p className="text-stone-600 text-sm">Every book on our shelf is chosen with care, ensuring high-quality storytelling and insightful reads.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-[#7A8F6A]/5 transition-colors duration-300">
              <div className="text-[#7A8F6A] text-2xl flex-shrink-0 mt-1">
                <FiCheckCircle />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-stone-800 mb-1">Reader-Centric App</h4>
                <p className="text-stone-600 text-sm">Our platform is designed to make browsing, finding, and purchasing your next read completely seamless.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-[#7A8F6A]/5 transition-colors duration-300">
              <div className="text-[#7A8F6A] text-2xl flex-shrink-0 mt-1">
                <FiCheckCircle />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-stone-800 mb-1">Secure Transactions</h4>
                <p className="text-stone-600 text-sm">Enjoy absolute peace of mind with our state-of-the-art secure payment verification system.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-[#7A8F6A]/5 transition-colors duration-300">
              <div className="text-[#7A8F6A] text-2xl flex-shrink-0 mt-1">
                <FiCheckCircle />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-stone-800 mb-1">Community Focused</h4>
                <p className="text-stone-600 text-sm">We give back by supporting local libraries, book clubs, and showcasing budding independent authors.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-[#7A8F6A]/5 transition-colors duration-300">
              <div className="text-[#7A8F6A] text-2xl flex-shrink-0 mt-1">
                <FiCheckCircle />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-stone-800 mb-1">Swift Delivery</h4>
                <p className="text-stone-600 text-sm">Get your books safely packed and delivered directly to your doorstep in record time.</p>
              </div>
            </div>


          </div>
        </div>

        {/* Section 4: What We Offer */}
        <div className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-center text-stone-700 mb-10">
            What We Offer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-[#7A8F6A]/30 transition-all duration-300">
              <div className="text-3xl text-[#7A8F6A] mb-4">
                <FiBookOpen />
              </div>
              <h4 className="font-bold text-stone-800 mb-2">Vast Collection</h4>
              <p className="text-stone-500 text-sm">Thousands of books across multiple genres including fiction, history, science, mystery, and biographies.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-[#7A8F6A]/30 transition-all duration-300">
              <div className="text-3xl text-[#7A8F6A] mb-4">
                <FiAward />
              </div>
              <h4 className="font-bold text-stone-800 mb-2">Bestsellers</h4>
              <p className="text-stone-500 text-sm">Top-rated releases, critically acclaimed award winners, and highly recommended literary masterpieces.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-[#7A8F6A]/30 transition-all duration-300">
              <div className="text-3xl text-[#7A8F6A] mb-4">
                <FiUsers />
              </div>
              <h4 className="font-bold text-stone-800 mb-2">Active Clubs</h4>
              <p className="text-stone-500 text-sm">Join our digital reading circles, discuss your favorite plots, and interact with fellow book lovers.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-[#7A8F6A]/30 transition-all duration-300">
              <div className="text-3xl text-[#7A8F6A] mb-4">
                <FiHeart />
              </div>
              <h4 className="font-bold text-stone-800 mb-2">Personalization</h4>
              <p className="text-stone-500 text-sm">Add books to your favorites list, rate them, and get customized reading suggestions.</p>
            </div>
          </div>
        </div>

        {/* Section 5: Call to Action */}
        <div className="bg-stone-800 rounded-3xl p-8 md:p-12 text-center text-amber-50 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7A8F6A_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to find your next adventure?
            </h3>
            <p className="text-stone-300 mb-8 max-w-lg mx-auto">
              Dive into our rich collection of handpicked titles and uncover stories that will captivate your mind.
            </p>
            <Link
              to="/all-books"
              className="inline-block bg-[#7A8F6A] hover:bg-[#5E7151] text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
