const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");
const { DOCUMENT_NOT_FOUND_ERROR } = require("../utils/errors");

router.use("/items", clothingItemRouter);
router.post("/signup", createUser);
router.post("/signin", login);
router.use("/users", userRouter);

router.use((req, res) => {
  res
    .status(DOCUMENT_NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
