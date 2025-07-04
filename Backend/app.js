import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from 'cors'
import auth_routes from "./src/routes/auth.route.js";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";
dotenv.config();


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }))
  
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser) 

app.use("/api/create",shortUrlRoute);
app.use("/api/user",userRoute)
app.use("/api/auth",auth_routes);
app.get("/:id",redirectFromShortUrl)
app.use(errorHandler)


   
app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
});



 

// GET - Redirect
// POST - Create short URL