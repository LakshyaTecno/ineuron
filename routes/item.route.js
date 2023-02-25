const itemController = require("../controllers/item.controller");
const verifyItemRequestBodies = require("../middlewares/verifyRequestBodyParams");
module.exports = (app) => {
  app.get(
    "/ineuron/api/v1/items/:id",
    [verifyItemRequestBodies.isValidItem_idInRequestParam],
    itemController.getItem
  );
  app.get("/ineuron/api/v1/items", itemController.getAllItems);
  app.post(
    "/ineuron/api/v1/items",
    [verifyItemRequestBodies.validateCreateItemBody],
    itemController.updateItem
  );
  app.put(
    "/ineuron/api/v1/items/:id",
    [verifyItemRequestBodies.isValidItem_idInRequestParam],
    itemController.updateItem
  );
  app.delete(
    "/ineuron/api/v1/items/:id",
    [verifyItemRequestBodies.isValidItem_idInRequestParam],
    itemController.deleteItem
  );
};
