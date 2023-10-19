const http = require("http");
const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

let data = [];
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://notse.github.io/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.get("/data", (req, res) => {
  res.status(200).send(data);
});

app.post("/getCity", (req, res) => {
  data.push(req.body);
  console.log(data);
  res.status(200).send("Done!");
});

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
