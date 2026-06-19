const { body } = require("express-validator");

exports.taskValidation = [
  body("taskName")
    .notEmpty()
    .withMessage("Task name is required"),

  body("priority")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  body("status")
    .isIn([
      "Pending",
      "In Progress",
      "Completed",
    ])
    .withMessage("Invalid status"),
];