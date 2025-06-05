import express from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, addCategoriesToProduct, removeCategoriesFromProduct } from "../controllers/ProductController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllProducts); // GET /api/products
router.get("/:id", getProductById); // GET /api/products/:id
router.post("/", isAuthenticated, isAdmin, addProduct); // POST /api/products
router.put("/:id", isAuthenticated, isAdmin, updateProduct); // PUT /api/products/:id
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct); // DELETE /api/products/:id
router.post("/:id/categories", isAuthenticated, isAdmin, addCategoriesToProduct); // POST /api/products/:id/categories
router.delete("/:id/categories", isAuthenticated, isAdmin, removeCategoriesFromProduct); // DELETE /api/products/:id/categories

export default router;