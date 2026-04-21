import axiosInstance from "../api/axios";

function ParallelFetchingWithPromiseAll() {
  const handleParallelFetch = () => {
    // if any one of the promises rejects, the entire Promise.all rejects with a single error object
    // if want to capture both successes and failures independently try Promise.allSettled
    Promise.all([axiosInstance.get("posts"), axiosInstance.get("users")])
      .then(([postsResponse, usersResponse]) => {
        console.log("Posts:", postsResponse.data);
        console.log("Users:", usersResponse.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <button
      onClick={handleParallelFetch}
      className="cursor-pointer font-semibold shadow-sm py-1 px-4 bg-red-100 hover:bg-[#facfcf] rounded-lg w-fit"
    >
      Parallel Fetching With <code>Promise.all()</code>
    </button>
  );
}

export default ParallelFetchingWithPromiseAll;
