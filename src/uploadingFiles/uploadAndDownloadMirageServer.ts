import { createServer, Response } from "miragejs";
import { createFile as createFileForClient } from "./utils";

export function startMirageServer() {
  createServer({
    routes() {
      this.logging = false;
      this.namespace = "api";
      this.post("/upload", async (_schema, request) => {
        console.log(request);
        // NOTE: In Express you wont receive FormData like below! you get parsed data - file in req.file and object in req.body.
        const formData: unknown = request.requestBody;
        if (!(formData instanceof FormData))
          return new Response(
            400,
            {},
            { message: "Invalid request body: not a FormData" },
          );
        const [myFile, userId] = formData;
        const file = myFile[1] as File;
        const id = userId[1] as string;
        const content = await file.text();
        return new Response(
          200,
          {},
          {
            fileName: file.name,
            fileType: file.type,
            fileContent: content,
            userId: id,
          },
        );
      });

      this.get("/download", async () => {
        const file = createFileForClient();
        /**
         *
         * NOTE: We actually need to send or stream the file, but as we are working with browser side javascript we can utilize such features.
         * All we could do is mimic if woking with mock server like miragejs
         * The fundamental are same -
         * Have read a file to be send:
         * - Send it as you did here by send the raw response with metadata and then assembling and generating the file on backed.
         * - Send the file with ".sendFile()" or ".download()" (of express) like methods provided by server frameworks
         * - Set the response header with:
         *      - "Content-Type": tells the browser what kind of file or data you are sending (e.g., "application/pdf", "image/png", "text/plain").
         *      - "Content-Disposition" with `attachment; filename=${fileName}` or "inline"
         *      - "Content-Length"  for the size of the file, so the browser knows how much data to expect.
         *
         */

        return new Response(
          200,
          {
            // This is ignored as this is mock server
            "Content-Disposition": `attachment; filename=${file.name}`,
            "Content-Type": "text/plain",
          },
          {
            // Sending dissembled file with file metadata because that the only work around of browser / vanilla js
            fileName: file.name,
            fileType: file.type,
            fileContent: await file.text(),
          },
        );
      });
    },
  });
}
