const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequestError");

const ForbiddenError = require("../errors/ForbiddenError");

const NotFoundError = require("../errors/NotFoundError");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    // .populate("owner")
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const createItem = (req, res, next) => {
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

const deleteClothingItems = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
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

const likeItem = (req, res, next) =>
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

const dislikeItem = (req, res, next) =>
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
