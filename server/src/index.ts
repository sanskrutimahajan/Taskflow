// src/index.ts
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user";

const app = express();
const PORT = process.env.PORT || 5004;

app.use(express.json());

// Mount the user router on the "/users" path
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from TaskFlow API!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

export { app };
