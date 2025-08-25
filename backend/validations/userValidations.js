const { body } = require("express-validator");

const validateUser = [
    body("firstName")
        .notEmpty().withMessage("Firstname is required")
        .isString().withMessage("Firstname must be a string")
        .isLength({ min: 1, max: 255 }).withMessage("Firstname must be between 1–255 characters")
        .trim(),

    body("lastName")
        .notEmpty().withMessage("Lastname is required")
        .isString().withMessage("Lastname must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Lastname must be between 3–255 characters")
        .trim(),

    body("username")
        .isString().withMessage("Username must be a string")
        .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters")
        .notEmpty().withMessage("Username is required")
        .trim(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 100 }).withMessage("Password must be 6-100 characters")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&#]/).withMessage("Password must contain a special character (@$!%*?&#)")
        .trim(),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),

    body("avatar").optional().isURL().withMessage("Avatar must be a valid URL")
];

module.exports = validateUser;