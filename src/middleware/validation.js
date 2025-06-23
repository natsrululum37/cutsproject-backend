import { body, validationResult } from "express-validator";

// Validation rules for service
export const validateService = [
  body("name").trim().notEmpty().withMessage("Service name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive number"),
];

// Validation rules for booking
export const validateBooking = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("serviceId").notEmpty().withMessage("Service is required"),
];

// Validation rules for review
export const validateReview = [
  body("name").notEmpty().withMessage("Name is required"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be 1-5"),
  body("comment").notEmpty().withMessage("Comment is required"),
  body("serviceId").notEmpty().withMessage("Service is required"),
];

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
