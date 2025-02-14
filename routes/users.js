const router = require("express").Router();
const { getUser, updateProfile } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUserInfoBodyOnUpdate } = require("../middlewares/validation");

router.use(auth);
router.get("/me", getUser);
router.patch("/me", validateUserInfoBodyOnUpdate, updateProfile);

module.exports = router;
