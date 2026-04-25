import axiosInstance from "./api/axios";
import { AxiosError, type AxiosRequestConfig } from "axios";
import { axiosButtons } from "./data";
import { useState } from "react";
import Services from "./components/Services";
import {
  downloadFile,
  manualDownloadFile,
  uploadFile,
} from "./uploadingFiles/serverCommunication";
import DragAndDropForUpload from "./uploadingFiles/components/DragAndDropForUpload";
import DownloadButtonWithProgress from "./uploadingFiles/components/DownloadButtonWithProgress";
import {
  RequestDataTransformation,
  ResponseDataTransformation,
} from "./transformation";
import {
  ParallelFetchingWithPromiseAll,
  ParallelFetchingWithAxiosAll,
} from "./parallelFetching/";
import FieldSet from "./components/FieldSet";
import {
  ProtectionAgainstDuplicateRequest,
  RateLimitingAndRetries,
  ResponseCachingSurfaceLevel,
} from "./generalPatterns";
// import { postQueryStringDataService } from "./sendQueryStringAsData/postQueryStringData";
// import "./services/getNewToken";
// import { abortControllerImplementationWithAxios } from "./cancellation/abortController";
// import { axiosCancellationImplementation } from "./cancellation/cancelToken";

const App = () => {
  const [responseData, setResposneData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (options: AxiosRequestConfig) => {
    try {
      setIsLoading(true);
      setResposneData("");
      setError("");
      const res = await axiosInstance({ ...options });
      // if the request failed the below code will not event execute
      console.log("Request Method:", res.config.method);
      console.log("Request Header:", res.headers);
      console.log("Response Status Code:", res.status); // 200
      console.log("Response:", res);
      // data is available in res.data
      console.log("Data:", res.data);
      setResposneData(JSON.stringify(res.data, null, 2));

      // no need to use the .json() axios automatically converts JSON for you
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
        console.log("Error Message:", error.message);
        console.log("Error Config:", error.config);
        if (!error.response) {
          return console.error("Check network and try again!");
        }
        console.log("Error Status Code:", error.status);
        if (error.status === 400) {
          console.error("Bad Request");
        }
        if (error.status === 401) {
          console.error("Unauthorized");
        }
        if (error.status === 404) {
          console.error("Resource not found");
        }
      } else {
        console.error("Unexpected Error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // axiosCancellationImplementation()
  // abortControllerImplementationWithAxios();

  return (
    <>
      <header className="text-3xl font-bold mb-4">
        <h1>Axios SMC</h1>
      </header>
      <main>
        <FieldSet className="mb-10">
          <FieldSet.Title>API Requests</FieldSet.Title>
          <div className="flex flex-wrap gap-3 font-semibold text-md mb-5">
            {axiosButtons.map((el) => (
              <button
                key={el.btnName}
                className="cursor-pointer shadow-sm py-1 px-4 bg-amber-100 hover:bg-[#fdeeb5] rounded-lg"
                type="button"
                onClick={() =>
                  handleClick({
                    method: el.method,
                    url: el.url,
                    params: el.params,
                    data: el.data,
                    // headers: {
                    //   Authorization: "Bearer token-three" // this overides the earlier defualt
                    // }
                  })
                }
              >
                {el.btnName}
              </button>
            ))}
            <br />
          </div>
          <section className="border rounded-lg py-5 px-10 font-semibold border-dashed bg-white shadow-sm">
            {/* scope for optimization */}
            {isLoading && "Loading...."}
            {!responseData &&
              !error &&
              !isLoading &&
              "Click the above buttons to see the respective response (if nothing is visible see console)"}
            {responseData && !error && (
              <pre className="text-wrap">{responseData}</pre>
            )}
            {error && error}
          </section>
        </FieldSet>

        <FieldSet>
          <FieldSet.Title>
            Services Layer API (<em>See Console</em>)
          </FieldSet.Title>
          <Services />
        </FieldSet>

        <FieldSet className="bg-blue-50">
          <FieldSet.Title className="bg-blue-50">
            File Uploading and Downloading (Make sure to have the backend
            express server running to test these features){" "}
          </FieldSet.Title>
          <FieldSet className="flex mt-5">
            <FieldSet.Title>
              Upload and Download a File (<em>See Console</em>)
            </FieldSet.Title>
            <button
              className="cursor-pointer font-semibold shadow-sm py-1 px-4 bg-green-200 hover:bg-[#85dba3] rounded-lg mr-3 w-fit"
              type="button"
              onClick={() => uploadFile()}
              title="Upload an in-memory file to backend express server"
            >
              Upload
            </button>
            <button
              className="cursor-pointer font-semibold shadow-sm py-1 px-4 bg-green-200 hover:bg-[#85dba3] rounded-lg mr-3 w-fit"
              type="button"
              onClick={() => manualDownloadFile()}
              title="Download file as blob and programmatically convert and download that to downloadable file"
            >
              Manual Download
            </button>

            <button
              className="cursor-pointer font-semibold shadow-sm py-1 px-4 bg-green-200 hover:bg-[#85dba3] rounded-lg mr-3 w-fit"
              type="button"
              onClick={() => downloadFile()}
              title="Download file by hitting the download serving endpoint"
            >
              Download
            </button>
          </FieldSet>

          <FieldSet className="flex flex-col">
            <FieldSet.Title>
              (Upload With Drag & Drop) - (Download with percentage shown)
            </FieldSet.Title>
            <DragAndDropForUpload />
            <DownloadButtonWithProgress />
          </FieldSet>
        </FieldSet>

        <FieldSet className="flex">
          <FieldSet.Title>
            Request & Response Data Transformation (<em>See Console</em>)
          </FieldSet.Title>
          <RequestDataTransformation />
          <ResponseDataTransformation />
        </FieldSet>
        <FieldSet className="flex gap-3">
          <FieldSet.Title>
            Parallel Fetching (<em>See Console</em>)
          </FieldSet.Title>
          <ParallelFetchingWithPromiseAll />
          <ParallelFetchingWithAxiosAll />
        </FieldSet>

        <FieldSet className="bg-emerald-50 flex flex-col gap-8">
          <FieldSet.Title>General Patterns</FieldSet.Title>

          <FieldSet className="flex gap-3 flex-col mt-3">
            <FieldSet.Title>
              Protection Against Duplicate Request (<em>See Console</em>)
            </FieldSet.Title>
            <p className="font-medium">
              Try to tap multipe times but only one request will be send (there
              is a 2 seconds delay attached to buttons) —
            </p>
            <ProtectionAgainstDuplicateRequest />
          </FieldSet>

          <FieldSet className="flex gap-3 flex-col pt-5 mt-3">
            <FieldSet.Title>
              Response Caching at Surface Level (<em>See Network Tab</em>)
            </FieldSet.Title>
            <p className="font-medium"></p>
            <ResponseCachingSurfaceLevel />
          </FieldSet>

          <FieldSet className="flex gap-3 flex-col mt-3">
            <FieldSet.Title>
              Rate Limiting and Retries (<em>See Console</em>)
            </FieldSet.Title>
            <RateLimitingAndRetries />
          </FieldSet>
        </FieldSet>
      </main>

      <footer className="bg-gray-200 text-center text-gray-700 py-5 text-sm font-semibold rounded-lg mt-10">
        <p>
          💖 API -{" "}
          <a
            className="hover:underline text-orange-900"
            href="https://jsonplaceholder.typicode.com"
            target="_blank"
            rel="noopener noreferrer"
          >{`JSONPlaceholder by typicode`}</a>
        </p>
      </footer>
    </>
  );
};

export default App;
