const Item = require("../models/item.schema");

// /items:
// get:
// summary: Get all items
// responses:
// 200:
// description: OK
// content:
// application/json:
// schema:
// type: array
// items:
// $ref: '#/components/schemas/Item'
// 500:
// description: Internal server error while getting all items

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items);

    res.status(200).send(items);
  } catch (err) {
    console.log("#### Error while getting all items #### ", err);
    res.status(500).send({
      message: "Internal server error while getting all items",
    });
  }
};

// @swagger
// /items/{id}:
// get:
// summary: Get item by ID
// parameters:
// - in: path
// name: id
// schema:
// type: string
// required: true
// description: ID of the item to retrieve
// responses:
// 200:
// description: OK
// content:
// application/json:
// schema:
// $ref: '#/components/schemas/Item'
// 500:
// description: Internal server error while getting item by ID
exports.getItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const item = await Item.findOne({ _id: itemId });

    console.log(item);

    res.status(200).send(item);
  } catch (err) {
    console.log("#### Error while getting new item #### ", err);
    res.status(500).send({
      message: "Internal server error while getting new item",
    });
  }
};

// @swagger
// /items:
// post:
// summary: Add new item
// requestBody:
// description: Item object that needs to be added
// required: true
// content:
// application/json:
// schema:
// $ref: '#/components/schemas/Item'
// responses:
// 201:
// description: Created
// content:
// application/json:
// schema:
// $ref: '#/components/schemas/Item'
// 500:
// description: Internal server error while adding new item

exports.addItem = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    const item = await Item.create(data);

    console.log(`#### New item '${item.name}' added ####`);
    res.status(201).send(book);
  } catch (err) {
    console.log("#### Error while adding new item #### ", err);
    res.status(500).send({
      message: "Internal server error while adding new item",
    });
  }
};

// @swagger
// /items/{id}:
// delete:
// summary: Delete item by ID
// parameters:
// - in: path
// name: id
// schema:
// type: string
// required: true
// description: ID of the item to delete
// responses:
// 200:
// description: OK
// content:
// application/json:
// schema:
// type: object
// properties:
// message:
// type: string
// example: Item deleted
// 500:
// description: Internal server error while deleting item by ID
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const item = await Item.findOne({ _id: itemId });
    await item.remove();

    console.log(`#### Item deleted ####`);
    res.status(200).send({ message: "item deleted" });
  } catch (err) {
    console.log("#### Error while deleting item #### ", err.message);
    res.status(500).send({
      message: "Internal server error while deleting item",
    });
  }
};

// @swagger
// /items/{id}:
// patch:
// summary: Update item by ID
// parameters:
// - in: path
// name: id
// schema:
// type: string
// required: true
// description: ID of the item to update
// requestBody:
// description: New item object that needs to be updated
// required: true
// content:
// application/json:
// schema:
// $ref: '#/components/schemas/Item'
// responses:
// 200:
// description: OK
// content:
// application/json:
// schema:
// $ref: '#/components/schemas/Item'
// 500:
// description: Internal server error while updating item by ID
exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findOne({ _id: itemId });

    (item.name = req.body.name ? req.body.name : item.name),
      (item.description = req.body.description
        ? req.body.description
        : item.description),
      (item.price = req.body.price ? req.body.price : item.price);

    const updatedItem = await item.save();

    console.log(`#### Item '${updatedItem.name}' data updated ####`);
    res.status(200).send(updatedItem);
  } catch (err) {
    console.log("#### Error while updating item data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating item data",
    });
  }
};
