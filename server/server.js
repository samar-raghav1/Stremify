import express from "express";
import dotenv from "dotenv";
import router from "./Routes/authRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import chatRouter from "./Routes/chatRoutes.js";
import cors from "cors";
import path from "path";
import friendRoute from "./Routes/friendRoutes.js";

dotenv.config();
const app=express();
const port =process.env.PORT;
const __dirname = path.resolve();
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods:['GET','POST','DELETE','PUT','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization']
}));

app.use(cookieParser())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("server is live...")
})

app.use("/api/auth",router)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRouter)
app.use("/api/friend",friendRoute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}


app.listen(port,()=>{
    console.log(`running on http://localhost:${port}`);
    
});