import express from "express";
import { createPost, DeletePost, getPosts } from "../controller/postController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const postRouter=express.Router();

postRouter.post("/create-post",authenticate,upload.single('image'), createPost);
postRouter.get("/get-user-posts",authenticate,getPosts);
postRouter.delete("/delete-post/:id",authenticate,DeletePost);

export default postRouter;
