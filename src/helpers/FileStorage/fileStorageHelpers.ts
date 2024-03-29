import { google } from "googleapis";
import { error, info } from "../logger";
import { Readable } from "stream";

const SCOPE = ["https://www.googleapis.com/auth/drive"];

const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    SCOPE
  );

  await jwtClient.authorize();

  return jwtClient;
};

export const uploadFileToGoogleDrive = async (
  filename: string,
  mimeType: string,
  file: any
) => {
  try {
    const authClient = await authorize();

    const drive = google.drive({ version: "v3", auth: authClient });

    let fileStream;
    if (Buffer.isBuffer(file)) {
      fileStream = Readable.from(file);
    } else {
      fileStream = file;
    }

    const uploadFile = await drive.files.create({
      fields: "id",
      media: {
        body: fileStream,
        mimeType: mimeType,
      },
      requestBody: {
        name: filename,
        parents: ["1HKz12Ey9e2e3vw_65QBlNLDYwMT1UBno"],
      },
    });

    if (uploadFile) {
      info(`File ${filename} uploaded successfully`);
    }
  } catch (err) {
    error(err);
  }
};

export const getDocumentPreviewLink = async (fileName: string) => {
  const authClient = await authorize();
  const drive = google.drive({ version: "v3", auth: authClient });

  const file = await drive.files.list({
    q: `name='${fileName}'`,
    fields: "files(webViewLink)",
  });

  if (file.data.files.length === 0) {
    error("Google Drive: File not found");
    throw new Error("Google Drive: File not found");
  }

  const fileId = file.data.files[0].webViewLink;

  return fileId;
};

export const deleteFileFromDrive = async (fileName: string) => {
  const authClient = await authorize();
  const drive = google.drive({ version: "v3", auth: authClient });

  const file = await drive.files.list({
    q: `name='${fileName}'`,
    fields: "files(id)",
  });

  if (file.data.files.length === 0) {
    error("Google Drive: File not found");
    throw new Error("Google Drive: File not found");
  }

  const fileId = file.data.files[0].id;

  try {
    await drive.files.delete({ fileId });
    info("File deleted successfully.");
  } catch (err) {
    error("Error deleting file: " + err);
  }
};

export const downloadFileFromDrive = async (fileName: string) => {
  const authClient = await authorize();
  const drive = google.drive({ version: "v3", auth: authClient });

  const file = await drive.files.list({
    q: `name='${fileName}'`,
    fields: "files(id)",
  });

  if (file.data.files.length === 0) {
    throw new Error("File not found");
  }

  const fileId = file.data.files[0].id;

  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  if (response.data) {
    info("File downloaded successfully");
    return response.data;
  } else {
    error("Error downloading file");
    throw new Error("Error downloading file");
  }
};
