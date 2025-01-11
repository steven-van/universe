const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const con = require("../config/connection");
const User = require("../src/models/User");

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});