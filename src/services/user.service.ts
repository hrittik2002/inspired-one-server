import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User.model";

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
