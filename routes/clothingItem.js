const router = require("express").Router();
const {
  createItem,
  getClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// PUT /items/:itemId/likes — like an item
// DELETE /items/:itemId/likes — unlike an item

router.post("/", createItem);
router.get("/", getClothingItems);
router.delete("/:id", deleteClothingItems);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
