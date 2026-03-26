import axios, { AxiosError, CanceledError } from "axios";

export function abortControllerImplementationWithAxios() {
  const abort = new AbortController();
  axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      signal: abort.signal,
    })
    .then((res) => console.log(res))
    .catch((err) => {
      if (err instanceof AxiosError) {
        if (!err.request)
          return console.error("Check network connection.", err);
        if (err instanceof CanceledError) {
          console.log("Reason:", abort.signal.reason);
          return console.error("Canceled by user!", err);
        }
        return console.error(err);
      } else {
        return console.error("UnexpectedError:", err);
      }
    });

  setTimeout(() => {
    abort.abort("Manually aborted");
  }, 20);
}
