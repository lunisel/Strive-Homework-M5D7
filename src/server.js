import express from "express";
import cors from "cors";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.listen(port, () => {
  console.log("Server in running on port: ", port);
});
