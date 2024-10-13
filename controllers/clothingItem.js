const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  console.log(req);
  console.log(req.body);

  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: `Error from createItem: ${err.message}` });
    });
};

const createItem = (req, res) => {
  console.log(req.body);
  console.log(req);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error from createItem: ${err.message}` });
    });
};

const deleteClothingItems = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.id)
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: `Error from createItem: ${err.message}` });
    });
};

module.exports = { createItem, getClothingItems, deleteClothingItems };
