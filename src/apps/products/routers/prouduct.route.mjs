import express from "express";
import { ProductController } from "../controllers/product.controller.mjs";
import authMiddleware from "../../../middlewares/auth.middleware.mjs";
import roleMiddleware from "../../../middlewares/role.middleware.mjs";

const router = express.Router();
const controller = new ProductController();

router.get("/", controller.getAllProducts);
router.post("/", authMiddleware, roleMiddleware("admin"), controller.addProduct);
router.put("/:id", authMiddleware, roleMiddleware("admin"), controller.updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), controller.deleteProduct);

export default router;
