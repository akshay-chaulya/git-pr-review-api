import express, { Request, Response } from "express";
import cors from "cors";
import mainRoute from "./routes"
import { connectDB } from "./db";


const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/v1", mainRoute)


// Basic webhook endpoint (optional)
app.get("/webhook", (req: Request, res: Response) => {
    res.json({ message: "Webhook received" });
});

app.get("/", (req, res) => {
    res.send("Work")
})

app.use("*", (req, res) => {
    res.status(404).json({ message: "404 page not found" })
})

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log("Server is running on port", port);
    connectDB();
});
