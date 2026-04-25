import axios from "axios";

function ResponseDataTransformation() {
  function handleResDataTransformation() {
    /**
     * NOTE: There is no `transformRequest` in request with post method - #verify.
     * But for get method requests - both the `transformRequest` and `transformResponse` is available.
     */
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1", {
        transformResponse: [
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (responseBody, _header) => {
            // Work on the data body below and then return.
            let parsedJson;
            try {
              parsedJson = JSON.parse(responseBody);
            } catch (error) {
              return {
                message: `Error parsing JSON: ${(error as Error).message}`,
              };
            }
            return parsedJson; // This will always set to the response.data
          },
        ],
      })
      .then((res) => console.log(res.data));
  }
  return (
    <button
      className=" cursor-pointer font-semibold shadow-sm py-1 px-4 bg-teal-200 hover:bg-[#7be3ce] rounded-lg mr-3 w-fit"
      onClick={handleResDataTransformation}
    >
      Response Data Transformation
    </button>
  );
}

export default ResponseDataTransformation;
