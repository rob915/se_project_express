const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  DOCUMENT_NOT_FOUND_ERROR,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CREATED,
  ASSERTION_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })

      .then((user) =>
        res
          .status(CREATED)
          .send({ name: user.name, avatar: user.avatar, email: user.email })
      )

      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          next(new BadRequestError("The id string is an invalid format"));
        } else if (err.code === 11000) {
          next(new ConflictError("Email already registered"));
        } else {
          next(err);
        }
      })
  );
};

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("The data was not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data error"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("The password and email fields are required"));
  }

  return User.findUserByCredentials(email, password, next)
    .then(({ _id, name, email, avatar }) => {
      const token = jwt.sign({ _id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({
        token,
        user: {
          _id,
          name,
          email,
          avatar,
        },
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "VaidationError") {
        next(new BadRequestError("Invalid data error"));
      }
      next(err);
    });
};

module.exports = { createUser, getUser, login, updateProfile };
