const router = require("express").Router();
const { getUser, updateProfile } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.use(auth);
router.get("/me", getUser);
router.patch("/me", updateProfile);

module.exports = router;
