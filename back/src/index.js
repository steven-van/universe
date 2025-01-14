const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const con = require("../config/connection");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require('./routes/messageRoutes');
const { initializeSocket } = require("./socket");

const server = http.createServer(app);



app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
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
  app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
  });
} catch (error) {
  console.log("Unable to connect to the database:", error);
}

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});

app.use(messageRoutes);

