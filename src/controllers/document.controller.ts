import expressAsyncHandler from "express-async-handler";
import Document from "../models/document.model";
import {
  deleteFileFromDrive,
  downloadFileFromDrive,
  getDocumentPreviewLink,
  uploadFileToGoogleDrive,
} from "../helpers/FileStorage/fileStorageHelpers";
import busboy from "busboy";

//@desc Get all documents
//?@route GET /api/document/all
//@access private
export const getAllDocuments = expressAsyncHandler(async (req, res) => {
  const documents = await Document.find({});

  res.status(200).json({
    success: true,
    data: documents,
  });
});

//@desc Get document by id
//?@route GET /api/document/:id
//@access private
export const getDocumentById = expressAsyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (document) {
    res.status(200).json({
      success: true,
      data: document,
    });
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

//@desc Get document by owner id
//?@route GET /api/document/owner/:id
//@access private
export const getDocumentByOwnerId = expressAsyncHandler(async (req, res) => {
  const documents = await Document.find({ owner: req.params.id });

  if (documents) {
    res.status(200).json({
      success: true,
      data: documents,
    });
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

//@desc Create a document
//!@route POST /api/document/:owner/create
//@access private
export const createDocument = expressAsyncHandler(async (req, res) => {
  const { owner } = req.params;
  const bb = busboy({ headers: req.headers });

  let fileAdded = false;

  bb.on("file", async (name, file, info) => {
    const { filename, mimeType } = info;

    fileAdded = true;

    const document = new Document({
      owner: owner,
      file_name: filename,
      file_size: 0.1,
      file_type: mimeType,
    });

    try {
      const savedDocument = await document.save();

      const formattedFileName = `${owner}-${filename}`;

      await uploadFileToGoogleDrive(formattedFileName, mimeType, file);

      res.status(200).json({ success: true, data: savedDocument });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: `Failed to save document ${filename}`,
      });
      throw new Error("Error: " + err.message);
    }
  });

  bb.on("finish", () => {
    if (!fileAdded) {
      res.status(400);
      throw new Error("No file added");
    }
  });

  req.pipe(bb);
});

//@desc Delete a document
//!@route DELETE /api/document/delete/:id
//@access private
export const deleteDocument = expressAsyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    res.status(404);
    throw new Error("Document not found");
  }

  await Document.findByIdAndDelete(req.params.id);

  const formattedFileName = `${document.owner}-${document.file_name}`;
  console.log(formattedFileName);

  await deleteFileFromDrive(formattedFileName);

  res.status(200).json({ success: true, message: "Document deleted" });
});

//@desc Download a document
//?@route GET /api/document/download/:id
//@access private
export const downloadDocument = expressAsyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    res.status(404);
    throw new Error("Document not found");
  }

  const fileName = `${document.owner}-${document.file_name}`;

  const downloadedFile = await downloadFileFromDrive(fileName);

  const sanitizedFileName = encodeURIComponent(fileName);

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${sanitizedFileName}`
  );
  res.setHeader("Content-Type", "application/octet-stream");

  downloadedFile.pipe(res);

  downloadedFile.on("error", (err) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  });
});

//@desc Get document link from google drive
//?@route GET /api/document/preview/:id
//@access private
export const getPreviewLink = expressAsyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    res.status(404);
    throw new Error("Document not found");
  }

  const fileName = `${document.owner}-${document.file_name}`;

  const previewLink = await getDocumentPreviewLink(fileName);

  res.status(200).json({
    success: true,
    data: previewLink,
  });
});
