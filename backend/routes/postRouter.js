import express from "express";
import { createPost, DeletePost, getPosts, updatepost } from "../controller/postController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const postRouter=express.Router();

postRouter.post("/create-post",authenticate,upload.single('image'), createPost);
postRouter.get("/get-user-posts",authenticate,getPosts);
postRouter.delete("/delete-post/:id",authenticate,DeletePost);
postRouter.post("/update-post/:id",authenticate,upload.single('image'),updatepost);

export default postRouter;
