import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";

function ResponseCachingSurfaceLevel() {
  const [userData, setUserData] = useState<string | null>(null);
  const [cache, setCache] = useState<string | null>(null);

  const getUserData = async (id: number) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/" + id,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response)
          return console.error("Check network and try again!");
        console.error("Error Message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      return null;
    }
  };

  const handleWithoutCacheClick = async () => {
    const data = await getUserData(5);
    setUserData(data);
  };

  const handleWithCacheClick = async () => {
    let data;
    if (cache) {
      data = cache;
    } else {
      data = await getUserData(6);
      setCache(data);
    }
    setUserData(data);
  };

  if (userData) {
    console.log(userData);
  }

  return (
    <>
      <div className="flex gap-3">
        <button
          className="cursor-pointer shadow-sm py-1 px-4 bg-red-900/20 hover:bg-red-900/30 rounded-lg w-fit text-red-900 font-bold"
          onClick={handleWithoutCacheClick}
        >
          Get User 5 (<em>Without In-Memory Cache</em>)
        </button>
        <button
          className="cursor-pointer shadow-sm py-1 px-4 bg-emerald-900/20 hover:bg-emerald-900/30 rounded-lg w-fit text-emerald-900 font-bold"
          onClick={handleWithCacheClick}
        >
          Get User 6 (<em>With In-Memory Cache</em>)
        </button>
      </div>
    </>
  );
}

export default ResponseCachingSurfaceLevel;
