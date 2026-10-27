import express from "express";
import { createPost } from "../controller/postController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const postRouter=express.Router();

postRouter.post("/create-post",authenticate,upload, createPost);

export default postRouter;