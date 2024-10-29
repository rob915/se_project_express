const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { BAD_REQUEST, UNAUTHORIZED } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  req.user = payload; //{_id: skldjfw23293928urw}
  req.message = "hello";

  next();
};

module.exports = { auth };
