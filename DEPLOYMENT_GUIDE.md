# Vercel Deployment Guide

Your project consists of three parts: **Backend**, **Frontend**, and **Admin**. For the best stability, it is recommended to deploy them as **separate Vercel projects** (or ensure you configure the "Root Directory" correctly when importing into Vercel).

## 1. Backend Deployment

When importing to Vercel, select the `backend` folder as the Root Directory if deploying separately.

**Environment Variables (Settings -> Environment Variables):**
You must add these secrets in Vercel:

- `MONGODB_URL`: Your MongoDB connection string.
- `CLOUDINARY_NAME`: Cloudinary Cloud Name.
- `CLOUDINARY_API_KEY`: Cloudinary API Key.
- `CLOUDINARY_API_SECRET`: Cloudinary API Secret.
- `JWT_SECRET`: Secret key for token signing.
- `ADMIN_EMAIL`: Email for the admin account.
- `ADMIN_PASSWORD`: Password for the admin account.
- `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://your-frontend.vercel.app`). This is used for CORS to allow your frontend to talk to the backend.
- `NODE_ENV`: Set to `production` (Vercel usually sets this automatically).

**Note:** The code has been updated to use `/tmp` for file uploads (Multer) to comply with Vercel's Serverless environment.

## 2. Frontend Deployment

When importing, select the `frontend` folder. Vercel should detect "Vite".

**Environment Variables:**
- `VITE_BACKEND_URL`: The URL of your deployed backend (e.g., `https://your-backend.vercel.app`).
  *Important:* Do not add a trailing slash `/` if your code appends `/api/...`. The updated code handles it, but consistency helps.

**Configuration:**
- A `vercel.json` has been added to handle Client-Side Routing (prevents 404 on page refresh).

## 3. Admin Deployment

When importing, select the `admin` folder.

**Environment Variables:**
- `VITE_BACKEND_URL`: Same as Frontend (URL of your backend).

**Configuration:**
- A `vercel.json` has been added to handle Client-Side Routing.

---

### Local Development
To run locally:
1. **Backend**: `cd backend` -> `npm install` -> `npm run dev` (Runs on port 4000 or defined in .env).
2. **Frontend**: `cd frontend` -> `npm install` -> `npm run dev`.
3. **Admin**: `cd admin` -> `npm install` -> `npm run dev`.

Ensure you have a `.env` file in `backend/` with the same keys as above for local testing.
