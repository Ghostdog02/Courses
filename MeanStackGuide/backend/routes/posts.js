import express from "express";

import PostsController from "../controllers/posts.js";

import extractFile  from "../middleware/file.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("", checkAuth, extractFile, PostsController.createPost);

router.put("/:id", checkAuth, extractFile, PostsController.editPost);

router.get("", PostsController.getPosts);

router.get("/:id", PostsController.getPost);

router.delete(
  "/:id",
  checkAuth,
  PostsController.deletePost
);

export default router;
