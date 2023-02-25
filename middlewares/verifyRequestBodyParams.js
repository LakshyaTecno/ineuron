const Item = require("../models/item.schema");

const validateCreateItemBody = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name caption is not provided",
    });
  }
  if (!req.body.price) {
    return res.status(400).send({
      message: "Failed price is not provided",
    });
  }
  next();
};
const isValidItem_idInRequestParam = async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });

    if (!item) {
      return res.status(400).send({
        message: "Item _id passed doesn't exist",
      });
    }
    next();
  } catch (err) {
    console.log("Error while reading the fecthing item", err.message);
    return res.status(500).send({
      message: "Internal server error while getting  item",
    });
  }
};

const verifyItemRequestBodies = {
  validateCreateItemBody: validateCreateItemBody,
  isValidItem_idInRequestParam: isValidItem_idInRequestParam,
};

module.exports = verifyItemRequestBodies;
