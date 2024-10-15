const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const routes = require("./routes");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((e) => {
    console.error(e);
  });

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "67076a4525a3d97f61588794",
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
