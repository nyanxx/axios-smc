import axios from "axios";
import { useState } from "react";
import { getPercentage } from "../ud_server/src/utils";
import {
  createDownloadLink,
  mimeToExtension,
  roundDecimalPart,
} from "../utils";

function DownloadButtonWithProgress() {
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const handleClick = () => {
    const manualDownloadFile = () => {
      setDownloadPercentage(0);
      axios
        .get("http://localhost:3001/api/download", {
          responseType: "blob",
          onDownloadProgress(progressEvent) {
            const total = progressEvent.total;
            if (total) {
              const percent = getPercentage(progressEvent.loaded, total);
              console.log();
              setDownloadPercentage(roundDecimalPart(percent));
            }
          },
        })
        .then((res) => {
          console.log(res.data);
          const ext = mimeToExtension(res.data.type);
          const filename = res.headers["x-filename"];
          createDownloadLink(res.data, {
            autoClick: true,
            filename: filename || `manualDownload.${ext}`,
          });
        })
        .catch((err) => console.error(err));
    };
    manualDownloadFile();
  };

  return (
    <div>
      <button
        className="mt-3 cursor-pointer font-semibold shadow-sm py-1 px-4 bg-green-200 hover:bg-[#85dba3] rounded-lg mr-3"
        type="button"
        onClick={handleClick}
      >
        Download With Percentage{" "}
        {downloadPercentage === 0 ? (
          ""
        ) : (
          <span>{downloadPercentage + "%"}</span>
        )}
      </button>
    </div>
  );
}

export default DownloadButtonWithProgress;
