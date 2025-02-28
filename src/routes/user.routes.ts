import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getProfile } from "../services/user.service";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => await getProfile(req, res)
);

export default router;
