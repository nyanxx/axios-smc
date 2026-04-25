import axios from "axios";
import { useState } from "react";
import { getPercentage } from "../ud_server/src/utils";
import { roundDecimalPart } from "../utils";

function DragAndDropForUpload() {
  const [uploadPercentage, setUploadPercentage] = useState(0);

  return (
    <section id="drag-and-drop-section" className="relative">
      <div
        className="h-30 bg-gray-200 rounded-xl w-full border border-dashed p-1 inline-flex justify-center items-center font-medium text-gray-800"
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          if (event.dataTransfer.items.length > 0) {
            for (const item of event.dataTransfer.items) {
              if (item.kind === "file") {
                const file = item.getAsFile();

                // Prep file
                if (!file)
                  return console.log(
                    "Upload file error: file is null / not processable",
                  );
                const formData = new FormData();
                formData.set("myFile", file);

                // Send file in formData to the server
                setUploadPercentage(0);
                axios
                  .post("http://localhost:3001/api/upload", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },

                    onUploadProgress: (progressEvent) => {
                      const total = progressEvent.total;
                      if (total) {
                        const percent = getPercentage(
                          progressEvent.loaded,
                          total,
                        );
                        console.log(`Percent: ${uploadPercentage}%`);
                        setUploadPercentage(roundDecimalPart(percent));
                      }
                    },
                  })
                  .then((res) => console.log(res.data))
                  .catch((err) => console.error((err as Error).message));
              }
            }
          }
        }}
      >
        Select or Drop File
      </div>
      {uploadPercentage !== 0 && (
        <p className="absolute top-5 right-3 bg-green-800 py-1 px-2 rounded-2xl font-semibold text-white">{`${uploadPercentage != 100 ? `${uploadPercentage}%` : "Upload Successful!"}`}</p>
      )}
    </section>
  );
}

export default DragAndDropForUpload;
