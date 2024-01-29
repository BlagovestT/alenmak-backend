"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviewLink = exports.downloadDocument = exports.deleteDocument = exports.createDocument = exports.getDocumentByOwnerId = exports.getDocumentById = exports.getAllDocuments = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const document_model_1 = __importDefault(require("../models/document.model"));
const fileStorageHelpers_1 = require("../helpers/FileStorage/fileStorageHelpers");
const busboy_1 = __importDefault(require("busboy"));
//@desc Get all documents
//?@route GET /api/document/all
//@access private
exports.getAllDocuments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield document_model_1.default.find({});
    res.status(200).json({
        success: true,
        data: documents,
    });
}));
//@desc Get document by id
//?@route GET /api/document/:id
//@access private
exports.getDocumentById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield document_model_1.default.findById(req.params.id);
    if (document) {
        res.status(200).json({
            success: true,
            data: document,
        });
    }
    else {
        res.status(404);
        throw new Error("Document not found");
    }
}));
//@desc Get document by owner id
//?@route GET /api/document/owner/:id
//@access private
exports.getDocumentByOwnerId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield document_model_1.default.find({ owner: req.params.id });
    if (documents) {
        res.status(200).json({
            success: true,
            data: documents,
        });
    }
    else {
        res.status(404);
        throw new Error("Document not found");
    }
}));
//@desc Create a document
//!@route POST /api/document/:owner/create
//@access private
exports.createDocument = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner } = req.params;
    const bb = (0, busboy_1.default)({ headers: req.headers });
    let fileAdded = false;
    bb.on("file", (name, file, info) => __awaiter(void 0, void 0, void 0, function* () {
        const { filename, mimeType } = info;
        fileAdded = true;
        const document = new document_model_1.default({
            owner: owner,
            file_name: filename,
            file_size: 0.1,
            file_type: mimeType,
        });
        try {
            const savedDocument = yield document.save();
            const formattedFileName = `${owner}-${filename}`;
            yield (0, fileStorageHelpers_1.uploadFileToGoogleDrive)(formattedFileName, mimeType, file);
            res.status(200).json({ success: true, data: savedDocument });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                error: `Failed to save document ${filename}`,
            });
            throw new Error("Error: " + err.message);
        }
    }));
    bb.on("finish", () => {
        if (!fileAdded) {
            res.status(400);
            throw new Error("No file added");
        }
    });
    req.pipe(bb);
}));
//@desc Delete a document
//!@route DELETE /api/document/delete/:id
//@access private
exports.deleteDocument = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield document_model_1.default.findById(req.params.id);
    if (!document) {
        res.status(404);
        throw new Error("Document not found");
    }
    yield document_model_1.default.findByIdAndDelete(req.params.id);
    const formattedFileName = `${document.owner}-${document.file_name}`;
    console.log(formattedFileName);
    yield (0, fileStorageHelpers_1.deleteFileFromDrive)(formattedFileName);
    res.status(200).json({ success: true, message: "Document deleted" });
}));
//@desc Download a document
//?@route GET /api/document/download/:id
//@access private
exports.downloadDocument = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield document_model_1.default.findById(req.params.id);
    if (!document) {
        res.status(404);
        throw new Error("Document not found");
    }
    const fileName = `${document.owner}-${document.file_name}`;
    const downloadedFile = yield (0, fileStorageHelpers_1.downloadFileFromDrive)(fileName);
    const sanitizedFileName = encodeURIComponent(fileName);
    res.setHeader("Content-Disposition", `attachment; filename=${sanitizedFileName}`);
    res.setHeader("Content-Type", "application/octet-stream");
    downloadedFile.pipe(res);
    downloadedFile.on("error", (err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
}));
//@desc Get document link from google drive
//?@route GET /api/document/preview/:id
//@access private
exports.getPreviewLink = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield document_model_1.default.findById(req.params.id);
    if (!document) {
        res.status(404);
        throw new Error("Document not found");
    }
    const fileName = `${document.owner}-${document.file_name}`;
    const previewLink = yield (0, fileStorageHelpers_1.getDocumentPreviewLink)(fileName);
    res.status(200).json({
        success: true,
        data: previewLink,
    });
}));
//# sourceMappingURL=document.controller.js.map