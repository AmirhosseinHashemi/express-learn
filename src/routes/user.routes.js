import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Get all users");
});

userRouter.get("/:id", (req, res) => {
  res.send(`Get user ${req.params.id} data.`);
});

userRouter.post("/", (req, res) => {
  res.send("New user created !");
});

export default userRouter;
