import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import stockRoutes from './routes/stock.routes.js';
import cookieParser  from 'cookie-parser';
import { loadSymbols } from "./utils/validSymbols.js";
import path from 'path';

await loadSymbols(); // Load once before app starts


dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/stock" , stockRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("/{*splat}", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    console.log("Server is Running on http://localhost:" + PORT);
    connectDB();
})