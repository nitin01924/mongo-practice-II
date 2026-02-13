import express from "express";
import User from "../models/user.js";

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
router.get("/", async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      message: "All User data.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// GET SINGLE USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid user ID",
    });
  }
});

//UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User Updated Successfully.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid user",
    });
  }
});

export default router;
