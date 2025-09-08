import dotenv from "dotenv";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import contactRouter from "./routers/contactRouter.js";
import { initMongoConnection } from "./db/models/initMongoConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { createContact } from "./controllers/contactController.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(
  express.json({
    "Content-type": "application/json",
  })
);
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});
app.use(logger);

app.use("/contacts", contactRouter);
app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to Contact API",
    status: "success",
    endpoints: {
      contacts: "/contacts",
    },
  });
});
// app.post("/contacts", (req,res)=>{
//   const newContact = createContact(req,res);
//   res.status(201).json(newContact);

// });
app.use(notFoundHandler);
app.use(errorHandler);

export const setupServer = async () => {
  await initMongoConnection();

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

setupServer();
