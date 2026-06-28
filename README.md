<div align="center">

<img src="https://github.com/user-attachments/assets/88f20f22-bdf6-4519-af00-0a5159f995b1" width="130" alt="ScriptAura Logo" />

# ScriptAura📚

#### *Where Stories Find Their Readers*

> *Unlock worlds hidden between the pages and dive into stories that inspire, educate, and stay with you forever.*

<br/>

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-script--aura.vercel.app-brightgreen?style=for-the-badge)](https://script-aura.vercel.app)

</div>

---

## 🌐 Live Demo

| 🔗 Resource | 🌍 URL |
|---|---|
| 🎨 Frontend | [script-aura.vercel.app](https://script-aura.vercel.app) |
| 🖥️ Backend API | [scriptaura.onrender.com](https://scriptaura.onrender.com) |

> ⚠️ **Note:** The payment gateway is a **mock/demo integration** — no real transactions are processed. Feel free to explore it freely!

---

## 📸 Screenshots

### 🏠 Homepage
*(Add screenshot here)*

### 📖 All Books
*(Add screenshot here)*

### 🛒 Checkout Portal
*(Add screenshot here)*

### 👤 Profile & Order History
*(Add screenshot here)*

---

## ❓ Problem Statement

Book lovers often struggle to find a single platform that offers seamless browsing, purchasing, and personalization. ScriptAura centralizes all of this into one elegant full-stack experience — complete with AI-powered assistance, a beautiful UI, and a smooth shopping experience.

---

## ✨ Features

### 👤 User
- 🔐 Secure JWT Authentication (Signup / Login)
- 🔍 Browse & filter books by genre
- ❤️ Save favourites & manage wishlist
- 🛒 Add to cart & manage orders
- 📦 View complete order history
- 💳 Mock payment gateway (COD + Online UPI)
- 👤 Profile with custom avatar selection
- 🤖 Built-in AI assistant — **Zoiiee**
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
| 🤖 AI | Built-in AI Assistant |
| 🚀 Deployment | Vercel (Frontend) • Render (Backend) |
| ⏱️ Uptime | UptimeRobot |

---

## 🏗️ Architecture

```mermaid
graph TD
    A[👤 User - Browser] -->|HTTPS Request| B[🎨 React Frontend - Vercel]
    B -->|REST API - Axios| C[🖥️ Express.js Backend - Render]
    C -->|Mongoose ODM| D[(🗄️ MongoDB Atlas)]
    C -->|JWT Verify| E[🔐 Auth Middleware]
    B -->|Redux State| F[📦 Redux Store]
    C -->|Response JSON| B

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#61DAFB,stroke:#333,stroke-width:2px
    style C fill:#68A063,stroke:#333,stroke-width:2px
    style D fill:#4EA94B,stroke:#333,stroke-width:2px
    style E fill:#FFD700,stroke:#333,stroke-width:2px
    style F fill:#764ABC,stroke:#333,stroke-width:2px
```

---

## 👤 User Flow

```mermaid
flowchart LR
    A([🏠 Home]) --> B([📖 All Books])
    B --> C([🔍 Filter by Genre])
    C --> D([📘 Book Details])
    D --> E{Logged In?}
    E -->|No| F([🔐 Login / Signup])
    F --> G([🛒 Add to Cart])
    E -->|Yes| G
    G --> H([💳 Checkout])
    H --> I([✅ Order Placed])
    I --> J([📦 Order History])

    style A fill:#8B4513,color:#fff
    style I fill:#4EA94B,color:#fff
    style F fill:#FFD700,color:#333
```

---

## 🗄️ Database Design

```mermaid
erDiagram
    USER {
        string username
        string email
        string password
        string avatar
        string address
        string role
    }
    BOOK {
        string title
        string author
        string genre
        number price
        string description
        string url
    }
    ORDER {
        string books
        number price
        string status
        string paymentMode
        date orderDate
    }
    CART {
        objectId bookId
        objectId userId
    }
    FAVOURITE {
        objectId bookId
        objectId userId
    }

    USER ||--o{ ORDER : places
    USER ||--o{ CART : has
    USER ||--o{ FAVOURITE : saves
    BOOK ||--o{ CART : "added to"
    BOOK ||--o{ FAVOURITE : "saved in"
    BOOK ||--o{ ORDER : "included in"
```

---

## 📁 Folder Structure

```
ScriptAura/
├── 🖥️ backend/
│   ├── conn/           # 🔌 Database connection
│   ├── models/         # 📋 Mongoose schemas
│   │   ├── user.js
│   │   ├── book.js
│   │   ├── order.js
│   │   ├── cart.js
│   │   └── favourite.js
│   ├── routes/         # 🛣️ API routes
│   │   ├── user.js
│   │   ├── book.js
│   │   ├── cart.js
│   │   ├── order.js
│   │   └── favourites.js
│   └── app.js          # 🚀 Entry point
│
└── 🎨 frontend/
    ├── src/
    │   ├── components/ # 🧩 Reusable UI components
    │   ├── pages/      # 📄 Page components
    │   ├── store/      # 📦 Redux store & slices
    │   └── utils/      # 🔧 API config (axios instance)
    ├── public/         # 🖼️ Static assets
    └── index.html
```

---

## 🌐 API Overview

The REST API is organized into the following modules:

| Endpoint | Method | Description |
|---|---|---|
| `/api/v1/sign-up` | POST | User Registration |
| `/api/v1/sign-in` | POST | User Login |
| `/api/v1/get-all-books` | GET | Fetch all books |
| `/api/v1/get-recent-books` | GET | Recently added books |
| `/api/v1/add-to-cart` | PUT | Add book to cart |
| `/api/v1/get-user-cart` | GET | Get user cart |
| `/api/v1/place-order` | POST | Place an order |
| `/api/v1/get-order-history` | GET | User order history |
| `/api/v1/add-book` | POST | Admin: Add new book |
| `/api/v1/update-book` | PUT | Admin: Update book |
| `/api/v1/delete-book` | DELETE | Admin: Delete book |

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
node app.js
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

## 🚀 Deployment

```mermaid
graph LR
    A[💻 Local Dev] -->|git push| B[📦 GitHub Repo]
    B -->|Auto Deploy| C[🎨 Vercel - Frontend]
    B -->|Auto Deploy| D[🖥️ Render - Backend]
    D -->|Connect| E[(🗄️ MongoDB Atlas)]
    F[⏱️ UptimeRobot] -->|Ping every 5min| D

    style C fill:#000,color:#fff
    style D fill:#46E3B7,color:#000
    style E fill:#4EA94B,color:#fff
    style F fill:#FF6B6B,color:#fff
```

---

## 🔮 Future Enhancements

- ⭐ Book ratings & reviews system
- 🔎 Advanced search functionality
- 📧 Order confirmation emails
- 💳 Real payment gateway (Razorpay)
- 📱 Mobile app (React Native)
- 🌙 Dark / Light mode toggle
- 📊 Admin analytics dashboard

---

## 👩‍💻 Contributors

**Dhruvi** — Full Stack Developer

---

## 🙏 Acknowledgements

- [MongoDB](https://mongodb.com) — Database
- [Express.js](https://expressjs.com) — Backend framework
- [React](https://reactjs.org) — Frontend library
- [Node.js](https://nodejs.org) — Runtime environment
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Vercel](https://vercel.com) — Frontend hosting
- [Render](https://render.com) — Backend hosting
- [UptimeRobot](https://uptimerobot.com) — Server monitoring

---

## 📬 Contact

- 🐙 **GitHub:** [@dhruvim-03](https://github.com/dhruvim-03)
- 💼 **LinkedIn:** [Dhruvi Mishra](https://www.linkedin.com/in/dhruvi-mishra-a86115288)
- ✉️ **Email:** dhruvimishra23@gmail.com

---

<div align="center">

Made with ❤️ by **Dhruvi** &nbsp;•&nbsp; © 2026 ScriptAura

⭐ If you liked this project, please give it a star!

</div>
