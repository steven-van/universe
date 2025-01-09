const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World')
})