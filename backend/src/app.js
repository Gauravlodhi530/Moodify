const express  = require('express');
const songRoutes = require("./routes/song.route")
const cors = require('cors');

const app= express()
app.use(cors());
app.use(express.json())

app.use('/', songRoutes);
app.use("/", (req, res) => {
  res.json({ message: "Backend working" });
});


module.exports = app;