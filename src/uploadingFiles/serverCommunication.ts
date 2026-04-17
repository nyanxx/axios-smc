import axios from "axios";
import { createDownloadLink, createFile as createFileToSend } from "./utils";
// import { startMirageServer } from "./uploadAndDownloadMirageServer";

// startMirageServer();

const _udServerClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

const uploadFile = () => {
  const file = createFileToSend();

  const formData = new FormData();

  formData.append("myFile", file); // you get this with request.file when send a form data.
  formData.append("userID", "9238"); // you get this with request.body when send as form data.

  _udServerClient
    .post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};

const manualDownloadFile = () => {
  _udServerClient
    .get("/download", {
      responseType: "blob",
    })
    .then((res) => {
      console.log(res.data);
      const filename = res.headers["x-filename"];
      createDownloadLink(res.data, {
        autoClick: true,
        filename: filename || "manualDownload.txt",
      });
    })
    .catch((err) => console.error(err));
};

const downloadFile = () => {
  window.location.href = "http://localhost:3001/api/download";
};

export { uploadFile, manualDownloadFile, downloadFile };
