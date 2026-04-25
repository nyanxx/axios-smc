import axios, { isCancel } from "axios";

export function axiosCancellationImplementation() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      cancelToken: source.token,
      timeout: 6000,
    })
    .then((req) => console.log(req))
    .catch((error) => {
      if (isCancel(error)) {
        console.error("The request was intenally cancelled", error);
        console.log("Reason:", source.token.reason?.message);
        console.log("Error Name:", error.name);
        console.log("Error Message:", error.message);
      } else {
        console.error(error);
      }
    });

  setTimeout(() => {
    source.cancel("Request cancelled by timeout!");
  }, 100);
}
