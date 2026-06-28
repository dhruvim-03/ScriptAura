# 📚 ScriptAura
### *Where Stories Find Their Readers*

ScriptAura is a full-stack MERN online bookstore where readers can explore books by genre, manage their cart, place orders, and chat with a built-in AI assistant — all wrapped in a beautifully designed interface.

🔗 **Live Site:** [script-aura.vercel.app](https://script-aura.vercel.app)

---

## ✨ Features

- 🔍 Browse & filter books by genre
- ❤️ Save favourites & manage wishlist
- 🛒 Add to cart & place orders
- 💳 Mock payment gateway (Cash on Delivery + Online Payment)
- 🤖 Built-in AI assistant (Zoiiee)
- 👤 User profile with avatar selection
- 📦 Order history tracking
- 🔐 Secure JWT authentication
- 📱 Fully responsive design

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| 🎨 Frontend | React, Vite, Tailwind CSS, Redux |
| 🖥️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB |
| 🚀 Deployment | Vercel (Frontend) • Render (Backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/dhruvim-03/ScriptAura.git
cd ScriptAura
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=1000
```

Start the backend:

```bash
node app.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [script-aura.vercel.app](https://script-aura.vercel.app) |
| Backend | Render | [scriptaura.onrender.com](https://scriptaura.onrender.com) |

---

## ⚠️ Note

> The payment gateway is a **mock/demo integration** — no real transactions are processed. Feel free to explore it freely!

---

## 📁 Project Structure

```
ScriptAura/
├── backend/
│   ├── conn/          # Database connection
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── app.js         # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   ├── store/      # Redux store
    │   └── utils/      # Utility functions
    └── index.html
```

---

## 🙋‍♀️ Author

**Dhruvi** — Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/dhruvim-03)

---

<p align="center">Made with ❤️ by Dhruvi &nbsp;•&nbsp; © 2026 ScriptAura</p>
