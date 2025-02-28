import express from "express";
import { loginUser, registerUser } from "../services/auth.service";

const router = express.Router();

router.post("/register", (req, res) => registerUser(req, res));
router.post("/login", (req, res) => loginUser(req, res));

export default router;
