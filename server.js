const http = require("http");
const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
let corsOptions = {
  origin: ["http://127.0.0.1/:5500"],
};
app.use(cors(corsOptions));

const server = http.createServer(function (req, res) {
  res.write("Hello Notse");
  // res.header("Access-Control-Allow-Origin", "*");
  console.log(req);
  res.end();
});

server.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});

// app.listen(4000, () => console.log("Server running on port 4000"));
