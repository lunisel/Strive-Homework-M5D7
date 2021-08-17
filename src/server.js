import express from "express";
import cors from "cors";
import authorsRouter from "./services/authors/index.js";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);

server.listen(port, () => {
  console.log("Server in running on port: ", port);
});
