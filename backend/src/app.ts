import express, { type Application } from "express"
import routes from "./routes/index";
import cors from "cors";
import morgan from "morgan";


const app: Application = express();

//middlewares
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api", routes);

export default app;