import {mongoose,  Schema } from "mongoose";

const postSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

export default Post;