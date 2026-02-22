import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the HOME_PAGE");
});

app.use(errorMiddleware);
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
