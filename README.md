<div align="center">

<img src="https://github.com/user-attachments/assets/88f20f22-bdf6-4519-af00-0a5159f995b1" width="130" alt="ScriptAura Logo" />

# ScriptAura

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
![Homepage](https://github.com/user-attachments/assets/cce66200-5088-46ab-8522-fe96cade62ee)

### 📖 All Books
![All Books](https://github.com/user-attachments/assets/8ad328f6-7677-44dc-b7b9-ac313c455497)

### 🛒 Cart & Checkout
![Cart & Checkout](https://github.com/user-attachments/assets/e3d0e57f-ad6b-410b-bac3-55b278a8987d)

### 👤 Profile & Order History
![Profile](https://github.com/user-attachments/assets/0bfca0b3-3053-453e-b40d-aee01b6ae4b4)

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
| 🤖 AI | Built-in AI Assistant (Zoiiee) |
| 🚀 Deployment | Vercel (Frontend) • Render (Backend) |
| ⏱️ Uptime | UptimeRobot |

---

## 🏗️ Architecture

```mermaid
graph TD
    A[👤 User - Browser] -->|HTTPS Request| B[🎨 React Frontend - Vercel]
    B -->|REST API via Axios| C[🖥️ Express.js Backend - Render]
    C -->|Mongoose ODM| D[(🗄️ MongoDB Atlas)]
    C -->|JWT Verify| E[🔐 Auth Middleware]
    B -->|Redux State| F[📦 Redux Store]
    C -->|JSON Response| B

style A fill:#C71585,stroke:#333,stroke-width:2px
style B fill:#0077B6,stroke:#333,stroke-width:2px
style C fill:#2D6A4F,stroke:#333,stroke-width:2px
style D fill:#1B5E20,stroke:#333,stroke-width:2px
style E fill:#B8860B,stroke:#333,stroke-width:2px
style F fill:#4A235A,stroke:#333,stroke-width:2px
```

---

## 👤 User Flow

```mermaid
flowchart TD
    A([🏠 Home]) --> B([📖 All Books])
    B --> C([🔍 Filter by Genre])
    C --> D([📘 Book Details])
    D --> E{🔑 Logged In?}
    E -->|No| F([🔐 Login / Signup])
    E -->|Yes| G([🛒 Add to Cart])
    F --> G
    G --> H([💳 Checkout])
    H --> I1([📦 Cash on Delivery]) & I2([💻 Online Payment])
    I1 --> J([✅ Order Placed])
    I2 --> J
    J --> K1([📋 Order History]) & K2([❤️ Favourites]) & K3([👤 Profile])

    style A fill:#5C3317,color:#fff,stroke:#3B1F0A,stroke-width:3px
    style B fill:#1A3A5C,color:#fff,stroke:#0D2137,stroke-width:3px
    style C fill:#1A3A5C,color:#fff,stroke:#0D2137,stroke-width:3px
    style D fill:#1A3A5C,color:#fff,stroke:#0D2137,stroke-width:3px
    style E fill:#7B4F00,color:#fff,stroke:#4A3000,stroke-width:3px
    style F fill:#6B0000,color:#fff,stroke:#3D0000,stroke-width:3px
    style G fill:#1A3A5C,color:#fff,stroke:#0D2137,stroke-width:3px
    style H fill:#7B4F00,color:#fff,stroke:#4A3000,stroke-width:3px
    style I1 fill:#4A235A,color:#fff,stroke:#2D1636,stroke-width:3px
    style I2 fill:#4A235A,color:#fff,stroke:#2D1636,stroke-width:3px
    style J fill:#1A5C2A,color:#fff,stroke:#0D3718,stroke-width:3px
    style K1 fill:#1A5C2A,color:#fff,stroke:#0D3718,stroke-width:3px
    style K2 fill:#6B0000,color:#fff,stroke:#3D0000,stroke-width:3px
    style K3 fill:#5C3317,color:#fff,stroke:#3B1F0A,stroke-width:3px
```

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

## 🌐 API Overview

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
- 💳 Real payment gateway (Razorpay)
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
- 💼 **LinkedIn:** [Dhruvi Mishra](https://www.linkedin.com/in/dhruvi-mishra-a86115288)
- ✉️ **Email:** dhruvimishra23@gmail.com

---

<div align="center">

Made with ❤️ by **Dhruvi** &nbsp;•&nbsp; © 2026 ScriptAura

⭐ If you liked this project, please give it a star!

</div>
