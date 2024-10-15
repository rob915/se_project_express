const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");
const { DOCUMENT_NOT_FOUND_ERROR } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res
    .status(DOCUMENT_NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
