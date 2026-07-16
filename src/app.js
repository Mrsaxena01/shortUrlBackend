import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

import UrlRoutes from "./routes/url.route.js";
import {redirectToOriginalUrl} from "./controllers/url.controller.js";

const app = express();

app.use(cors({
  origin:"https://trimlinkshort.vercel.app"
}));
app.use(express.json());
app.use(morgan("dev"));


app.get("/", async (req, res) => {
 res.send("Welcome to the URL Shortener API!");
})


app.get("/:shortCode", redirectToOriginalUrl);
app.use("/api", UrlRoutes);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});