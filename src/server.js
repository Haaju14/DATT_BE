import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import sequelize from "./config/db.js";
import initModels from "./models/init-models.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import productRoute from "./routes/ProductRoute.js";
import cartRoute from "./routes/CartRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import ReviewRoute from "./routes/ReviewRoute.js";
import NotificationRoute from "./routes/NotificationRoute.js";
import WishlistRoute from "./routes/WishlistRoute.js";
import PromotionRoute from "./routes/PromotionRoute.js";
import LoyaltyRoute from "./routes/LoyaltyRoute.js";
import StatisticsRoute from "./routes/StatisticsRoute.js";
import HookRoute from "./routes/HookRoute.js";
import VoucherRoute from "./routes/VoucherRoute.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);

app.use(express.json());

const allowedOrigins = [
  "http://192.168.100.134:5173",
  "http://tmdt2.cholimexfood.com.vn",
  "https://tmdt2.cholimexfood.com.vn",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// WebSocket
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Khởi tạo models
const models = initModels(sequelize);

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/cart", cartRoute);
app.use("/api/categories", CategoryRoute);
app.use("/api/notifications", NotificationRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/products", productRoute);
app.use("/api/promotions", PromotionRoute);
app.use("/api/reviews", ReviewRoute);
app.use("/api/users", UserRoute);
app.use("/api/wishlist", WishlistRoute);
app.use("/api/loyalty", LoyaltyRoute);
app.use("/api/statistics", StatisticsRoute);
app.use("/api/hooks", HookRoute);
app.use("/api/vouchers", VoucherRoute);

app.use(errorHandler);

httpServer.listen(8080, () => {
  console.log("Server running on port 8080 with WebSocket");
});
console.log("Starting server...");
sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));