import express from "express";
import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// CREATE USER
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { name, age } = req.body;
    if (!name || !age) {
      const error = new Error("name and age are required in req.body");
      error.statuscode = 400;
      throw error;
    }
    const user = await User.create(req.body);
    res.status(200).json({
      message: "User created successfully",
      data: user,
    });
  }),
);

// READ ALL USERS FORM .GET
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const userlist = await User.find();
    if (!userlist) {
      const error = new Error("Users does not exist");
      error.statuscode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched all users",
      data: userlist,
    });
  }),
);

// GET SINGLE USER BY ID
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User not exist here!!");
      error.statuscode = 404;
      throw error;
    }
    res.status(200).json({
      message: "User founded",
      data: user,
    });
  }),
);

//UPDATE USER
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const updatedata = req.body;
    if (!updatedata) {
      const error = new Error("req.body is empty");
      error.statuscode = 400;
      throw error;
    }
    const user = await User.findByIdAndUpdate(id, updatedata, {
      returnDocument: "after",
    });
    if (!user) {
      const error = new Error("User not exist!!");
      error.statuscode = 404;
      throw error;
    }

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  }),
);

// DELETE
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const error = new Error("User not found@!!");
      error.statuscode = 404;
      throw error;
    }
    res.status(200).json({
      message: "User has been Deleted!",
      data: user,
    });
  }),
);

export default router;
