import express from "express";
import { createPost } from "../controller/postController.js";

const postRouter=express.Router();

postRouter.post("/crate-post",createPost);

export default postRouter;