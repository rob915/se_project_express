const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  DOCUMENT_NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

const BadRequestError = require("../errors/badRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    // .populate("owner")
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      next(err);
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
        next(new BadRequestError("Invalid data error"));
      }
      next(err);
    });
};

const deleteClothingItems = (req, res) => {
  ClothingItem.findById(req.params.id)
    .orFail()
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        ClothingItem.deleteOne(item).then(() => {
          res.send({ message: "Item successfully deleted" });
        });
      } else {
        next(new ForbiddenError("Attempting to delete another user's item"));
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data error"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Data was not found"));
      }
      next(err);
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
        next(new NotFoundError("The data was not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data error"));
      }
      next(err);
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
        next(new NotFoundError("The data was not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data error"));
      }
      next(err);
    });

module.exports = {
  createItem,
  getClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
};
