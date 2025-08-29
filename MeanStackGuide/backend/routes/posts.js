import checkAuth from "../middleware/check-auth.js";

import express from "express";

import postsController from "../controllers/posts.js";

const router = express.Router();

router.post(
  "",
  checkAuth,
  postsController.configureMulter,
  postsController.createPost
);

router.put(
  "/:id",
  checkAuth,
  postsController.configureMulter,
  postsController.editPost
);

router.get("", postsController.getPost);

router.get("/:id", postsController.getPosts);

router.delete(
  "/:id",
  checkAuth,
  postsController.deletePost
);

export default router;
