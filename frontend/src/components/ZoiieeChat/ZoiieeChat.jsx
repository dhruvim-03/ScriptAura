import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaPaperPlane, FaTimes, FaMinus } from "react-icons/fa";

const ZoiieeChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const cached = sessionStorage.getItem("zoiiee_chat_history");
    if (cached) {
      return JSON.parse(cached);
    }
    return [
      {
        sender: "zoiiee",
        text: "Hi! I'm **Zoiiee**, your ScriptAura assistant. 📚\n\nHow can I help you today? You can ask me to **recommend books**, find **genres**, navigate the site (like your **cart** or **order history**), or get general guidance!",
        timestamp: new Date().toISOString(),
      },
    ];
  });
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Load books dynamically from cache for real recommendations
  const [cachedBooks] = useState(() => {
    try {
      const cached = localStorage.getItem("all_books");
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      console.error("Zoiiee failed to read books cache:", e);
      return [];
    }
  });

  // Save conversation history to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("zoiiee_chat_history", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // AI response helper
  const generateResponse = (message) => {
    const query = message.toLowerCase().trim();

    // Navigation queries
    if (query.includes("cart") || query.includes("checkout") || query.includes("buy")) {
      return "You can view the items in your cart and proceed to checkout at the [Cart Page](/cart).";
    }
    if (query.includes("favourite") || query.includes("wishlist") || query.includes("like")) {
      return "You can view your liked books under your profile [Favourites Page](/profile).";
    }
    if (query.includes("order") || query.includes("purchase") || query.includes("history")) {
      return "Your order details are located in your profile [Order History](/profile/orderHistory).";
    }
    if (query.includes("setting") || query.includes("password") || query.includes("address")) {
      return "You can edit your account info and address in your [Settings Page](/profile/settings).";
    }
    if (query.includes("add book") || query.includes("new book") || query.includes("upload")) {
      return "If you are an admin, you can add new books by navigating to [Add Book](/profile/add-book).";
    }
    if (query.includes("about") || query.includes("company") || query.includes("contact")) {
      return "Learn more about ScriptAura and our mission on the [About Us](/about-us) page.";
    }
    if (query.includes("home") || query.includes("welcome")) {
      return "Go back to our main landing page [Home](/) to see featured books and collections.";
    }

    // Genre query
    if (query.includes("genre") || query.includes("category") || query.includes("categories")) {
      if (cachedBooks.length > 0) {
        const genres = [
          ...new Set(
            cachedBooks.flatMap((b) =>
              b.genre ? b.genre.split(",").map((g) => g.trim()) : []
            )
          ),
        ];
        return `We have a wide range of genres including: **${genres
          .slice(0, 8)
          .join(", ")}**. You can explore all of them on the [All Books](/all-books) page.`;
      }
      return "We offer many genres like Fiction, Classic, Sci-Fi, Biography, and Romance. Explore them on the [All Books](/all-books) page!";
    }

    // Recommendation queries
    if (
      query.includes("recommend") ||
      query.includes("suggest") ||
      query.includes("best") ||
      query.includes("top") ||
      query.includes("popular")
    ) {
      if (cachedBooks.length > 0) {
        // Pick 3 random or top books
        const shuffled = [...cachedBooks].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        let reply = "Here are a few books I highly recommend:\n\n";
        selected.forEach((book) => {
          reply += `- **[${book.title}](/view-book-details/${book._id})** by ${book.author} (₹${book.price}) — *Genre: ${book.genre || "General"}*\n`;
        });
        return reply + "\nClick on any title to view its details and add it to your cart!";
      }
      return "I recommend checking out our classics and hot releases on the [All Books](/all-books) page! You'll find something you love there.";
    }

    // Search by title or author
    if (cachedBooks.length > 0) {
      const found = cachedBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query)
      );
      if (found.length > 0) {
        let reply = `I found ${found.length} book${found.length > 1 ? "s" : ""} matching your query:\n\n`;
        found.slice(0, 3).forEach((book) => {
          reply += `- **[${book.title}](/view-book-details/${book._id})** by ${book.author} (₹${book.price})\n`;
        });
        return reply + "\nWould you like to check one of these out?";
      }
    }

    // General conversational query
    if (
      query.includes("hello") ||
      query.includes("hi") ||
      query.includes("hey") ||
      query.includes("greetings")
    ) {
      return "Hello! I'm Zoiiee, your AI assistant. How can I help you explore ScriptAura today?";
    }
    if (query.includes("thank") || query.includes("thanks")) {
      return "You're very welcome! Let me know if there's anything else I can assist you with.";
    }
    if (query.includes("who are you") || query.includes("your name")) {
      return "I am Zoiiee, your friendly AI shopping assistant here at ScriptAura. I help you find books, navigate the site, and answer questions!";
    }

    return "I'm not sure I completely understand. You can ask me to **recommend books**, list **genres**, help you find your **cart** or **order history**, or provide general assistance about ScriptAura!";
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        sender: "zoiiee",
        text: generateResponse(textToSend),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  // Helper parser for markdown links and bolding
  const renderLinks = (text) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [, linkText, url] = match;
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      if (url.startsWith("/")) {
        parts.push(
          <span
            key={matchIndex}
            onClick={() => {
              navigate(url);
              // Mini close to not obstruct view after navigation
            }}
            className="text-amber-400 underline font-semibold cursor-pointer hover:text-amber-300 transition-colors"
          >
            {linkText}
          </span>
        );
      } else {
        parts.push(
          <a
            key={matchIndex}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 underline font-semibold hover:text-amber-300 transition-colors"
          >
            {linkText}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.map((part, index) => {
      if (typeof part === "string") {
        return part.split("\n").map((line, i) => (
          <span key={`${index}-${i}`}>
            {line}
            {i < part.split("\n").length - 1 && <br />}
          </span>
        ));
      }
      return part;
    });
  };

  const parseMessageContent = (text) => {
    const boldParts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return boldParts.map((part, index) => {
      const isBold = index % 2 === 1;
      const rendered = renderLinks(part);
      if (isBold) {
        return <strong key={index} className="font-extrabold text-white">{rendered}</strong>;
      }
      return <span key={index}>{rendered}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Expanded Chat Window */}
      {isOpen ? (
        <div className="w-[360px] max-w-[90vw] h-[500px] max-h-[80vh] bg-stone-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-stone-800 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="bg-amber-600 p-2 rounded-xl text-white shadow-inner">
                <FaRobot className="text-lg" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">Zoiiee AI</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] text-green-400 font-semibold uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-1"
                title="Minimize"
              >
                <FaMinus className="text-xs" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-1"
                title="Close"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-900/95 scrollbar-thin scrollbar-thumb-zinc-700">
            {messages.map((msg, index) => {
              const isBot = msg.sender === "zoiiee";
              return (
                <div
                  key={index}
                  className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md text-sm font-semibold leading-relaxed break-words ${
                      isBot
                        ? "bg-stone-800 text-zinc-200 rounded-tl-none border border-white/5"
                        : "bg-amber-600 text-white rounded-tr-none"
                    }`}
                  >
                    {parseMessageContent(msg.text)}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-stone-800 text-zinc-300 rounded-2xl rounded-tl-none border border-white/5 px-4 py-3 text-xs font-semibold flex items-center gap-1">
                  <span>Zoiiee is thinking</span>
                  <span className="dot animate-pulse">.</span>
                  <span className="dot animate-pulse delay-100">.</span>
                  <span className="dot animate-pulse delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-4 py-2 bg-stone-900 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleSendMessage("Recommend a book")}
              className="flex-shrink-0 bg-stone-800 border border-white/10 hover:border-amber-500/50 hover:bg-stone-700 text-zinc-300 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-300"
            >
              📚 Recommend
            </button>
            <button
              onClick={() => handleSendMessage("What genres do you have?")}
              className="flex-shrink-0 bg-stone-800 border border-white/10 hover:border-amber-500/50 hover:bg-stone-700 text-zinc-300 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-300"
            >
              🎭 Genres
            </button>
            <button
              onClick={() => handleSendMessage("Where is my cart?")}
              className="flex-shrink-0 bg-stone-800 border border-white/10 hover:border-amber-500/50 hover:bg-stone-700 text-zinc-300 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-300"
            >
              🛒 Cart
            </button>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputText.trim()) {
                handleSendMessage(inputText);
                setInputText("");
              }
            }}
            className="p-3 bg-stone-800 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Zoiiee something..."
              className="flex-1 bg-stone-900 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition-all duration-300 font-semibold"
            />
            <button
              type="submit"
              className="bg-amber-600 text-white p-2.5 rounded-xl hover:bg-amber-500 transition-all duration-300 flex items-center justify-center shadow"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Button Widget */
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-600 hover:bg-amber-500 text-white h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500/30 animate-bounce-short"
          title="Chat with Zoiiee"
        >
          <FaRobot className="text-2xl animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default ZoiieeChat;
