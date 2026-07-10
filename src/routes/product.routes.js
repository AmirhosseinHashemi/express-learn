import express from "express";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send("Get all product");
});

productRouter.get("/:id", (req, res) => {
  res.send(`Get product ${req.params.id} data.`);
});

productRouter.post("/", (req, res) => {
  res.send("New product created!");
});

export default productRouter;
