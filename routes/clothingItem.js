const router = require("express").Router();
const {
  createItem,
  getClothingItems,
  deleteClothingItems,
} = require("../controllers/clothingItem");

router.post("/", createItem);
router.get("/", getClothingItems);
router.delete("/:id", deleteClothingItems);

module.exports = router;
