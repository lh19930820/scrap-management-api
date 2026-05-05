require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // 👈 QUAN TRỌNG

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

module.exports.io = io;

app.use(express.json());

// =====================
// routes
// =====================
const authRoutes = require("./src/routes/auth.route");
const postRoutes = require("./src/routes/post.route");
const commentRoutes = require("./src/routes/comment.route");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes); 

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join room theo post
  socket.on("joinPost", (postId) => {
    socket.join(postId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

const errorHandler = require("./src/middleware/error.middleware");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => { 
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();