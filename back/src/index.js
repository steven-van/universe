const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const port = process.env.PORT || 8000;
const con = require("../config/connection");
const cors = require('cors');
const User = require("../src/models/User");
const authRoute = require('./routes/auth');

app.use(cors({
  origin: "http://localhost:5173", 
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoute);


try {
  con.authenticate();
  console.log('Connection has been established successfully.');
  con.sync({ force: false }) // force: true recrer les tables, attention à l'utiliser en production
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error during sync:', error);
  });
  app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
  });
} catch (error) {
  console.log('Unable to connect to the database:', error);
}

app.get('/', (req, res) => {
  res.send('Hello World')
})

// A utiliser pour la page inscription
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const saltRounds = 10; // Choisi arbitrairement
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});