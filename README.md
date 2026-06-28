<div align="center">

# 📚 ScriptAura
### *Where Stories Find Their Readers*

ScriptAura is a full-stack MERN online bookstore that enables users to browse books by genre, view details, manage profiles, and place orders seamlessly. It features secure authentication, responsive design, an admin dashboard, real-time help chat, avatar selection, and an AI assistant.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🌐 Live Demo

- 🔗 **Live Site:** [script-aura.vercel.app](https://script-aura.vercel.app)
- 🖥️ **Backend API:** [scriptaura.onrender.com](https://scriptaura.onrender.com)

> ⚠️ **Note:** The payment gateway is a **mock/demo integration** — no real transactions are processed. Feel free to explore it freely!

---

## 📸 Screenshots

| Page | Description |
|---|---|
| 🏠 Homepage | Hero section with book illustration | 
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/cce66200-5088-46ab-8522-fe96cade62ee" />
| 📖 All Books | Browse & filter books by genre |
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/8ad328f6-7677-44dc-b7b9-ac313c455497" />
| 🛒 Cart & Checkout | Order summary with payment options |
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/e3d0e57f-ad6b-410b-bac3-55b278a8987d" />
| 👤 Profile | User profile with order history |
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/0bfca0b3-3053-453e-b40d-aee01b6ae4b4" />

---

## ❓ Problem Statement

Book lovers often struggle to find a single platform that offers seamless browsing, purchasing, and personalization. ScriptAura centralizes all of this into one elegant full-stack experience with AI-powered assistance and a beautiful UI.

---

## ✨ Features

### 👤 User
- 🔐 Secure JWT Authentication (Signup / Login)
- 🔍 Browse & filter books by genre
- ❤️ Save favourites & manage wishlist
- 🛒 Add to cart & manage orders
- 📦 View order history (COD + Online)
- 👤 Profile with custom avatar selection
- 🤖 Built-in AI assistant (Zoiiee)
- 📱 Fully responsive on all devices

### 🛠️ Admin
- 📚 Add, edit & delete books
- 📊 Manage all user orders
- 🖼️ Upload book covers

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| 🎨 Frontend | React 19, Vite, Tailwind CSS, Redux Toolkit |
| 🖥️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB, Mongoose |
| 🔐 Auth | JWT (JSON Web Tokens) |
| 🚀 Deployment | Vercel (Frontend) • Render (Backend) |

---

## 🏗️ Architecture

```
React Frontend (Vercel)
        |
        | REST API (Axios)
        ↓
Express.js Backend (Render)
        |
        ↓
   MongoDB Atlas
```

---

## 📁 Folder Structure

```
ScriptAura/
├── backend/
│   ├── conn/           # Database connection
│   ├── models/         # Mongoose schemas (User, Book, Order, Cart)
│   ├── routes/         # API routes (user, book, cart, order, favourites)
│   └── app.js          # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Page components (Home, Books, Cart, Profile)
    │   ├── store/      # Redux store & slices
    │   └── utils/      # API config (axios instance)
    ├── public/         # Static assets
    └── index.html
```

---

## 🗄️ Database Design

The MongoDB database consists of the following primary collections:

- **User** — Authentication, profile, avatar, address
- **Book** — Title, author, genre, price, description, cover image
- **Cart** — User's cart items
- **Order** — Order details, payment mode, delivery info
- **Favourite** — User's saved books

---

## 🚀 Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/dhruvim-03/ScriptAura.git
cd ScriptAura
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=1000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=https://scriptaura.onrender.com
```

---

## 🌐 API Overview

The REST API is organized into the following modules:

- `/api/v1/sign-up` — User Registration
- `/api/v1/sign-in` — User Login
- `/api/v1/get-all-books` — Fetch all books
- `/api/v1/get-recent-books` — Recently added books
- `/api/v1/add-to-cart` — Cart management
- `/api/v1/get-orders` — Order history
- `/api/v1/add-book` — Admin: Add new book
- `/api/v1/update-book` — Admin: Update book

---

## 🚀 Deployment

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | [script-aura.vercel.app](https://script-aura.vercel.app) |
| Backend | Render (Free) | [scriptaura.onrender.com](https://scriptaura.onrender.com) |
| Database | MongoDB Atlas | Cloud hosted |
| Uptime | UptimeRobot | Keeps backend awake 24/7 |

---

## 🔮 Future Enhancements

- ⭐ Book ratings & reviews
- 🔎 Search functionality
- 📧 Order confirmation emails
- 💳 Real payment gateway integration
- 📱 Mobile app (React Native)
- 🌙 Dark / Light mode toggle

---

## 👩‍💻 Contributors

- **Dhruvi** — Full Stack Developer

---

## 🙏 Acknowledgements

- [MongoDB](https://mongodb.com)
- [Express.js](https://expressjs.com)
- [React](https://reactjs.org)
- [Node.js](https://nodejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)
- [Render](https://render.com)

---

## 📬 Contact

- 🐙 **GitHub:** [@dhruvim-03](https://github.com/dhruvim-03)
- 💼 **LinkedIn:** [Dhruvi Mishra](www.linkedin.com/in/dhruvi-mishra-a86115288)
- ✉️ **Email:** [Dhruvi Mishra](dhruvimishra23@gmail.com)
---

<div align="center">
Made with ❤️ by Dhruvi &nbsp;•&nbsp; © 2026 ScriptAura
</div>
