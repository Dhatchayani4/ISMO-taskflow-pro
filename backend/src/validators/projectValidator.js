const { body } = require("express-validator");

exports.projectValidation = [
  body("projectName")
    .notEmpty()
    .withMessage("Project name is required"),

  body("status")
    .isIn([
      "Not Started",
      "In Progress",
      "Completed",
    ])
    .withMessage("Invalid project status"),
];