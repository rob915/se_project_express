const User = require("../models/user");
const {
  DOCUMENT_NOT_FOUND_ERROR,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CREATED,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
        // Bad request
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
