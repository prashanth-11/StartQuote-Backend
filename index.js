// const express = require("express");
// const app = express();
// const fs = require("fs");
// const jsonServer = require("json-server");
// const dummyjson = require("dummy-json");
// const cors = require("cors");
// const nodemailer = require("nodemailer");

require("./config/db");

const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
// const connection = require('../backend_v2/config/db')
// connection();
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
const PORT = 8000;
app.listen(PORT, () => {
  console.log("server listening");
});

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const jsonServerMiddleware = jsonServer.router("api.json");
// app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

// app.use("/api", jsonServerMiddleware);

// // app.set("view engine", "ejs");

// app.post("/users", (req, res) => {
//   const users = JSON.parse(fs.readFileSync("api.json")).users;
//   let user = {
//     id: Date.now(),
//     name: req.body.name,
//     age: req.body.age,
//     gender: req.body.gender,
//   };
//   users.push(user);
//   fs.writeFileSync("api.json", JSON.stringify({ users }));
//   res.redirect("/users");
// });

// app.listen(5000, () => {
//   console.log("Listening on PORT 5000!!");
// });
