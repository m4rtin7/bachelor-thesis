require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (_req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
