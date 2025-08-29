import console from "console";
import multer from "multer";

import Post from "../models/post.js";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

export const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }

    cb(error, "../backend/images");
  },
  filename: (_req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

export const configureMulter = () => {
    multer({ storage: storage }).single("image");
};

export const createPost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Creating a post failed",
      });
    });
};

export const editPost = (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  console.log(post);
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful" });
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Could not update post!",
      });
    });
};

export const getPosts = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  //If not undefined
  if (currentPage && pageSize) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res
        .status(200)
        .json({
          message: "Posts fetched successfully",
          posts: fetchedPosts,
          maxPosts: count,
        })
        .catch(() => {
          res.status(500).json({
            message: "Fetching posts failed",
          });
        });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed",
      });
    });
};

export const deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful" });
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: `Deleting a post with ${req.params.id} failed`,
      });
    });
};

export default {
    storage,
    configureMulter,
    createPost,
    editPost,
    getPosts,
    getPost,
    deletePost
};
