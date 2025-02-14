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
router.post("/", validateClothingItemOnCreate, createItem);
router.delete("/:itemId", validateItemId, deleteClothingItems);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
