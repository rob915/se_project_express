const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const { errors } = require("celebrate");

const mainRouter = require("./routes/index");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const errorHandler = require("./middlewares/errorHandler");

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

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
