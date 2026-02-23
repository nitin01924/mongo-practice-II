import express from "express";
import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({
        error: "Name and age are required",
      });
    }
    const user = await User.create({ name, age });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

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
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    res.status(200).json({
      message: "User Deleted.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "invalid uder id",
    });
  }
});

export default router;
