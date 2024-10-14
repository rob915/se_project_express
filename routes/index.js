const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

// PUT /items/:itemId/likes — like an item
// DELETE /items/:itemId/likes — unlike an item

router.use((req, res) => {
  res.status(500).send({ message: "Requested resource not found" });
});

module.exports = router;
