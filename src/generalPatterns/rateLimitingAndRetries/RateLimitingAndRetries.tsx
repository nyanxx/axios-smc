import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";

function RateLimitingAndRetries() {
  const [todoData, setTodoData] = useState<string | null>(null);

  const getTodoById = async (id: number, retry: number = 3) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todoss/" + id, // incorrect endpoint to trigger error and retry mechanism
      );
      return response.data;
    } catch (error) {
      if (retry > 0) {
        console.log("Retrying...", retry);
        return getTodoById(id, retry - 1);
      }
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

  const handleClick = async () => {
    const data = await getTodoById(32);
    setTodoData(data);
  };

  if (todoData) {
    console.log(todoData);
  }

  return (
    <>
      <div className="flex gap-3">
        <button
          className="cursor-pointer shadow-sm py-1 px-4 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg w-fit text-amber-900 font-bold"
          onClick={handleClick}
        >
          Get Todo of Id 32 (<em>Retry 3 Times</em>)
        </button>
      </div>
    </>
  );
}

export default RateLimitingAndRetries;
