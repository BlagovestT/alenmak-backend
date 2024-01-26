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
router.get("/owner/:id", validateToken, getDocumentByOwnerId);
router.post("/:owner/create", validateToken, createDocument);
router.delete("/delete/:id", validateToken, deleteDocument);
router.get("/download/:fileName", validateToken, downloadDocument);
router.get("/preview/:fileName", validateToken, getPreviewLink);

export default router;
