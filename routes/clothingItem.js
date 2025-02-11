const router = require("express").Router();
const {
  createItem,
  getClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const { auth } = require("../middlewares/auth");
const {
  validateClothingItemOnCreate,
  validateItemId,
} = require("../middlewares/validation");

router.get("/", getClothingItems);

router.use(auth);
router.post("/", createItem);
router.delete("/:id", deleteClothingItems);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
