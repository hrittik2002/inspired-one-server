import mongoose from "mongoose";
import { UserInterface } from "../interface/User.interface";

const UserSchema = new mongoose.Schema<UserInterface>({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;
