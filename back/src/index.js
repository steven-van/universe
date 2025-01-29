const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const con = require("../config/connection");
const cors = require("cors");
const http = require("http");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require('./routes/messageRoutes');
const contactRoutes = require("./routes/contactRoutes");

const socket = require("./socket");


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const httpserver = http.createServer(app);
socket.initializeSocket(httpserver);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);
app.use(contactRoutes);

try {
  con.authenticate();
  console.log("Connection has been established successfully.");
  con
    .sync({ force: false }) // force: true recrer les tables, attention à l'utiliser en production
    .then(() => {
      console.log("Database & tables created!");
    })
    .catch((error) => {
      console.error("Error during sync:", error);
    });
  httpserver.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
  });
} catch (error) {
  console.log("Unable to connect to the database:", error);
}

