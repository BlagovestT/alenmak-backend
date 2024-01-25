import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  createDocument,
  deleteDocument,
  downloadDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentByOwnerId,
  getPreviewLink,
} from "../controllers/document.controller";

const router = express.Router();

router.get("/all", validateToken, getAllDocuments);
router.get("/:id", validateToken, getDocumentById);
router.post("/owner/:id", validateToken, getDocumentByOwnerId);
router.put("/create", validateToken, createDocument);
router.delete("/delete", validateToken, deleteDocument);
router.put("/download/:fileName", validateToken, downloadDocument);
router.put("/preview/:fileName", validateToken, getPreviewLink);

export default router;
