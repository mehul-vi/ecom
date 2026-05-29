# 🛒 ZOVO - Modern E-Commerce Hub

ZOVO is a state-of-the-art, full-stack e-commerce application powered by the MERN stack (**MongoDB, Express, React, Node.js**). It features a sleek customer shopping storefront, a robust administrative dashboard, Google OAuth authentication, automatic voice control/AI search assistance, and Cloudinary image integration.

---

## 🚀 Highlights & Features

### 🛍️ Client Front-End
*   **Aesthetic & Modern UI:** CURATED CSS gradients, outfit typography, hover effects, and fully responsive grid layouts.
*   **State-of-Management:** Powered by React Context for seamless synchronization across User, Auth, and Shop configurations.
*   **Smart Search & Filtering:** Filter products by categories, subcategories, price, or tags.
*   **Persisted Shopping Cart:** Add items with specific sizes, adjust quantities, and instantly view calculated totals.
*   **My Orders page:** Check previous orders, payment states, and shipping progress.

### 🎙️ AI Voice Command Helper
*   Click the AI icon in the bottom-left corner to enable **hands-free voice control** using browser native SpeechRecognition and SpeechSynthesis:
    *   *"open search"* or *"search close"*
    *   *"collections"* / *"products"* (navigates to the collection catalog)
    *   *"cart"* / *"about"* / *"contact"* / *"orders"* (instant hands-free routing)

### 👑 Admin Control Panel
*   **Catalog Management:** Add new items with multi-image Cloudinary upload, descriptions, prices, categories, and size charts.
*   **Order Supervision:** Track every checkout, update delivery statuses, and monitor payment states (COD).
*   **Admin Login:** Custom protected credential checkpoint with administrative JWT signing.

### 🛡️ Backend API & Security
*   **Secure Cookie Authentication:** JWT tokens signed and delivered via `httpOnly`, `secure`, and `sameSite` cookies to protect against XSS and CSRF.
*   **File Stream Storage:** Integration with **Multer** and **Cloudinary** for lightning-fast image uploads.

---

## 🛠️ Technology Stack

*   **Front-End:** React 19 (Vite), TailwindCSS, React Router DOM, React Icons, React Toastify, Firebase Auth.
*   **Back-End:** Node.js, Express, Cookie Parser, CORS, JSON Web Tokens (JWT).
*   **Database:** MongoDB, Mongoose ODM.
*   **Cloud Integrations:** Cloudinary (Media hosting).
*   **Hosting:** Fully configured for **Vercel** serverless functions and SPA routing rewrites.

---

## 📂 Project Architecture

```bash
ecom/
├── admin/                 # Admin Dashboard (React + Vite)
├── backend/               # Server API (Express + Node.js)
│   ├── config/            # Cloudinary, Database, & Token configurations
│   ├── controller/        # Auth, Cart, Order, and Product controllers
│   ├── middleware/        # Authentication & Multer upload middleware
│   ├── model/             # MongoDB Schema Definitions
│   └── routes/            # Express Router endpoints
└── frontend/              # Customer Front-End Shop (React + Vite)
```

---

## ⚙️ Local Setup Guide

### 1. Clone the repository
```bash
git clone https://github.com/mehul-vi/ecom.git
cd ecom
```

### 2. Configure Backend environment
Navigate to the `backend/` directory and create a `.env` file:
```env
PORT = 8000
MONGODB_URL = "your-mongodb-connection-string"
JWT_SECRET = "your-jwt-signing-secret"
ADMIN_EMAIL = "admin@zovo.com"
ADMIN_PASSWORD = "admin-password"
CLOUDINARY_NAME = "your-cloudinary-name"
CLOUDINARY_API_KEY = "your-cloudinary-api-key"
CLOUDINARY_API_SECRET = "your-cloudinary-api-secret"
```

### 3. Configure Frontend environment
Navigate to the `frontend/` directory and create a `.env` file:
```env
VITE_BACKEND_URL = http://localhost:8000
```

### 4. Install Dependencies & Run
Start both components in separate terminal instances:

*   **Backend Server:**
    ```bash
    cd backend
    npm install
    npm run dev
    ```
*   **Frontend Shop:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
*   **Admin Dashboard:**
    ```bash
    cd admin
    npm install
    npm run dev
    ```

---

## ☁️ Deployment Instructions (Vercel)

The project includes an optimized `vercel.json` file at the root to handle unified serverless hosting:

1.  **Configure Environment Variables:** Add your backend `.env` variables to Vercel's **Environment Variables** in the project settings.
2.  **MIME & Fallback Fixes:** The root `vercel.json` automatically configures SPA routing and applies strict `Cross-Origin-Opener-Policy: same-origin-allow-popups` headers to handle cross-origin Firebase popups flawlessly.

---

## 📝 License

Distributed under the ISC License. Created with ❤️ by [Mehul Sahu](https://github.com/mehul-vi) (mehulkumars315@gmail.com).
