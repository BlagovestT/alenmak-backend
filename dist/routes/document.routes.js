"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const document_controller_1 = require("../controllers/document.controller");
const router = express_1.default.Router();
router.get("/all", validateTokenHandler_1.validateToken, document_controller_1.getAllDocuments);
router.get("/:id", validateTokenHandler_1.validateToken, document_controller_1.getDocumentById);
router.get("/owner/:id", validateTokenHandler_1.validateToken, document_controller_1.getDocumentByOwnerId);
router.post("/:owner/create", validateTokenHandler_1.validateToken, document_controller_1.createDocument);
router.delete("/delete/:id", validateTokenHandler_1.validateToken, document_controller_1.deleteDocument);
router.get("/download/:fileName", validateTokenHandler_1.validateToken, document_controller_1.downloadDocument);
router.get("/preview/:fileName", validateTokenHandler_1.validateToken, document_controller_1.getPreviewLink);
exports.default = router;
//# sourceMappingURL=document.routes.js.map