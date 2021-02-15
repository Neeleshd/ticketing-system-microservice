import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors";

const router = express.Router();

// router for getting current user
router.get("/api/users/currentuser", (req: Request, res: Response) => {
  res.status(200).send("Hi there");
});

// router for user signup
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please enter valid email!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be minimum 4 and maximum 20 characters long"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
  }
);

export { router as authRouter };