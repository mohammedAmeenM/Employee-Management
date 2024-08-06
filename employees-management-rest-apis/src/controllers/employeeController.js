const Employee = require("../models/employeeSchema");

const createEmployee = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const employee = new Employee({ ...data });
    if (!employee) {
      return res.status(400).json({
        status: "failure",
        message: "Somthing went wrong",
      });
    }
    await employee.save();
    res.status(201).json({
      status: "success",
      message: "Successfully created employee",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};


const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    if (!employees) {
      return res.status(404).json({
        status: "failure",
        message: "Employees not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched employees",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};


const getEmployeeById = async (req, res) => {
  try {
    const emplyeeId = req.params.employeeId;
    const employee = await Employee.findById(emplyeeId);
    if (!employee) {
      return res.status(404).json({
        status: "failure",
        message: "Employee not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully fetched employee",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};


const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const updatedData = req.body;
    const employee = await Employee.findByIdAndUpdate(employeeId, updatedData, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({
        status: "failure",
        message: "Employee not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated employee",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const employee = await Employee.findByIdAndDelete(employeeId);
    if (!employee) {
      return res.status(404).json({
        status: "failure",
        message: "Employee not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted employee",
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
