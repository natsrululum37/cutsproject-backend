import { body, validationResult } from "express-validator";

// Validation rules for service
export const validateService = [
  body("name")
    .notEmpty()
    .withMessage("Nama layanan wajib diisi")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama layanan harus antara 3-100 karakter"),

  body("price")
    .notEmpty()
    .withMessage("Harga layanan wajib diisi")
    .isFloat({ min: 0 })
    .withMessage("Harga harus berupa angka positif"),

  body("description")
    .notEmpty()
    .withMessage("Deskripsi layanan wajib diisi")
    .isLength({ min: 10 })
    .withMessage("Deskripsi minimal 10 karakter"),

  body("duration")
    .notEmpty()
    .withMessage("Durasi layanan wajib diisi")
    .isInt({ min: 1 })
    .withMessage("Durasi harus berupa angka positif dalam menit"),

  body("category").notEmpty().withMessage("Kategori layanan wajib diisi"),

  body("image_url")
    .optional()
    .isURL()
    .withMessage("URL gambar tidak valid"),
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
