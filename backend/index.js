import express from 'express'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

const requiredEnvVars = ['JWT_SECRET', 'CLOUDINARY_NAME'];
const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);
if (!process.env.MONGODB_URL && !process.env.MONGODB_URI) {
  missingEnvVars.push('MONGODB_URL/MONGODB_URI');
}
if (missingEnvVars.length > 0) {
  console.warn(`WARNING: Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Connect to database
connectDb()

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.enable('trust proxy'); // Important for Vercel/proxies to correctly handle req.secure and cookies

const allowedOrigins = [
  "https://ecom-peach-nine.vercel.app",
  "https://ecom-phi-cyan.vercel.app",
  "https://ecom-2gq4.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174"
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// Routes
app.get('/', (req, res) => res.send('Hello World!'));

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong: ' + err.message })
})


// Start server
// Start server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


export default app
