const userController = require("../controllers/user.controller");

module.exports = (app) => {
    app.post("/Swimn/api/v1/users", userController.createSwimn);

    app.delete("/Swimn/api/v1/users/:id", userController.deleteSwimn);

    app.put("/Swimn/api/v1/users/:id", userController.updateSwimn);
}