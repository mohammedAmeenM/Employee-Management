const express = require("express");
const employeeRoutes = express.Router();
const employeeController = require("../controllers/employeeController");
const uploadImage = require("../middlewares/imageUpload");
const { verifyToken } = require("../middlewares/verifyToken");

employeeRoutes
  .post("/", verifyToken,uploadImage, employeeController.createEmployee)
  .get("/", verifyToken,employeeController.getAllEmployees)
  .get("/:employeeId", verifyToken,employeeController.getEmployeeById)
  .patch("/:employeeId", uploadImage, employeeController.updateEmployee)
  .delete("/:employeeId", employeeController.deleteEmployee);

module.exports = employeeRoutes;
