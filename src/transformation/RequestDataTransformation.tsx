import axios from "axios";

function RequestDataTransformation() {
  function handleReqDataTransformation() {
    /**
     * NOTE: There is no `transformRequest` in request with POST method - #verify.
     * But for GET method requests - both the `transformRequest` and `transformResponse` is available.
     */

    axios
      .post(
        "https://jsonplaceholder.typicode.com/posts/",
        { title: "hello title" },
        {
          // transformRequest: [(data) => {
          // const data.title = data.title.toUpperCase();
          // return JSON.stringify(data);
          // }]
        },
      )
      .then((res) => console.log(res));
  }
  return (
    <button
      disabled={true}
      // hover:bg-[#7be3ce]
      title="Not woking for me -- check obs"
      className="opacity-60 cursor-not-allowed font-semibold shadow-sm py-1 px-4 bg-teal-200  rounded-lg mr-3 w-fit"
      onClick={handleReqDataTransformation}
    >
      Request Data Transformation
    </button>
  );
}

export default RequestDataTransformation;
