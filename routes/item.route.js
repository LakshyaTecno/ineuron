const itemController = require("../controllers/item.controller");

module.exports = (app) => {
  app.get("/ineuron/api/v1/items/:id", itemController.getItem);
  app.get("/ineuron/api/v1/items", itemController.getAllItems);
  app.post("/ineuron/api/v1/items", itemController.updateItem);
  app.put("/ineuron/api/v1/items/:id", itemController.updateItem);
  app.delete("/ineuron/api/v1/items/:id", itemController.deleteItem);
};
