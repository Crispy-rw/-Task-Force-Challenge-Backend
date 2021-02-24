import app from "./app";
import http from "http";


const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const onListen = () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Server is running on port`, PORT);
  }
};

server.listen(PORT, onListen());
