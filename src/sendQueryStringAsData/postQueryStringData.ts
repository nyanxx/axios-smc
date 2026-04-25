import axios, { AxiosError } from "axios";
import qs from "qs";

export async function postQueryStringDataService() {
  const data = {
    title: "foo",
    body: "bar",
    userId: 1,
  };
  const queryStringifiedData = qs.stringify(data);
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      queryStringifiedData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) {
        return console.error("Check network and try again!");
      }
      console.log("Error Status Code:", error.status);
    } else {
      console.error("Unexpected Error:", error);
    }
  }
}
