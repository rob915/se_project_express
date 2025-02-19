const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");
const NotFoundError = require("../errors/NotFoundError");

const {
  validateUserInfoBodyOnCreate,
  authenticationOnUserLogin,
} = require("../middlewares/validation");

router.use("/items", clothingItemRouter);
router.post("/signup", validateUserInfoBodyOnCreate, createUser);
router.post("/signin", authenticationOnUserLogin, login);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("The data was not found"));
});

module.exports = router;
