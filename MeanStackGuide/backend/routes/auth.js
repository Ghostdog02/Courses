import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user.save()
          .then(result => {
            res.status(201).json({
                message: 'User has been created',
                result: result
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
    })
  
});

router.post("/login", (req, res) => {
  
});

export default router;
