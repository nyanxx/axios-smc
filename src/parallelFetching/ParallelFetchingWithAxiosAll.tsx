// Parallel Fetching With `axios.all()`; `axios.spread()` to Spread the Responses

import axios from "axios";

function ParallelFetchingWithAxiosAll() {
  function handleClick() {
    /** Sending two request separately */
    // axios
    //   .get("https://jsonplaceholder.typicode.com/posts/1")
    //   .then((res) => console.log({ time: Date.now(), data: res.data }));
    // axios
    //   .get("https://jsonplaceholder.typicode.com/posts/2")
    //   .then((res) => console.log({ time: Date.now(), data: res.data }));

    /** Sending two request aith axios.all */
    // axios
    //   .all([
    //     axios.get("https://jsonplaceholder.typicode.com/posts/1"),
    //     axios.get("https://jsonplaceholder.typicode.com/posts/2"),
    //   ])
    //   .then(([post1, post2]) => {
    //     console.log({ time: Date.now(), data: post1 });
    //     console.log({ time: Date.now(), data: post2 });
    //   });

    /** Sending two request aith axios.all and using axios.spread(cb(...res) => void) to spread response*/
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/posts/1"),
        axios.get("https://jsonplaceholder.typicode.com/posts/2"),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log({ time: Date.now(), data: res1.data });
          console.log({ time: Date.now(), data: res2.data });
        }),
      )
      .catch((err) => console.error(err));
  }

  return (
    <button
      className="cursor-pointer font-semibold shadow-sm py-1 px-4 bg-red-100 hover:bg-[#facfcf] rounded-lg w-fit"
      onClick={handleClick}
    >
      Parallel Fetching With <code>axios.all()</code>
    </button>
  );
}

export default ParallelFetchingWithAxiosAll;
