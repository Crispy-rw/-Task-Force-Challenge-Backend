import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import env from "dotenv";
import morgan from "morgan";
import { serve, setup } from "swagger-ui-express";
import swaggerDoc from "../swagger.json";

const app = express();

env.config();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/", (request, response) => {
  response.status(200).json({
    status: 200,
    message: "Welcome to Awesomety Lab Task Force Challenge",
  });
});

app.use("/api/v1", routes);
// app.use("/api/doc", serve, setup(swaggerDoc));

app.use('*', (request, response) => {
  response.status(404).json({
    status: 404,
    error: `${request.method}=${request.protocol}://${request.headers.host}${request.originalUrl} not found`,
  });
});

// HANDLING BODY PARSER ERRORS
app.use((error, request, response) => {
  response.status(400).json({
    status: 400,
    message: `bad request: ${error.message}`
  });
});

export default app;