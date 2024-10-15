const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  DOCUMENT_NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data error" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteClothingItems = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.id)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data error" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "The data was not found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "The data was not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data error" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "The data was not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data error" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });

module.exports = {
  createItem,
  getClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
};
