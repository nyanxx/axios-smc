import axiosInstance from "./api/axios"
import { AxiosError, type AxiosRequestConfig } from "axios"
import { axiosButtons } from "./data"
import { useState } from "react"

const App = () => {

  const [responseData, setResposneData] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (options: AxiosRequestConfig) => {
    try {
      setIsLoading(true)
      setResposneData("")
      setError("")
      const res = await axiosInstance({ ...options })
      // if the request failed the below code will not event execute
      console.log("Request Method:", res.config.method)
      console.log("Request Header:", res.headers)
      console.log("Response Status Code:", res.status) // 200
      console.log("Response:", res)
      // data is available in res.data
      console.log("Data:", res.data)
      setResposneData(JSON.stringify(res.data, null, 2))

      // no need to use the .json() axios automatically converts JSON for you
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message)
        console.log("Error Message:", error.message)
        console.log("Error Config:", error.config)
        if (!error.response) { return console.error("Check network and try again!") }
        console.log("Error Status Code:", error.status)
        if (error.status === 400) { console.error("Bad Request") }
        if (error.status === 401) { console.error("Unauthorized") }
        if (error.status === 404) { console.error("Resource not found") }
      } else {
        console.error("Unexpected Error:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }


  const handleParallelFetch = () => {
    // if any one of the promises rejects, the entire Promise.all rejects with a single error object
    // if want to capture both successes and failures independently try Promise.allSettled 
    Promise.all([
      axiosInstance.get("posts"),
      axiosInstance.get("users")
    ]).then(([postsResponse, usersResponse]) => {
      console.log("Posts:", postsResponse.data);
      console.log("Users:", usersResponse.data);
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <main className="py-10 px-20 md:py-25 md:px-30">
      <h1 className="text-3xl font-bold mb-4">Axios SMC</h1>
      <div className="flex flex-wrap gap-3 font-semibold text-md mb-5">
        {
          axiosButtons.map((el) => (
            <button
              key={el.btnName}
              className="cursor-pointer shadow-sm py-1 px-4 bg-amber-100 hover:bg-[#fdeeb5] rounded-lg"
              type="button"
              onClick={() => handleClick({
                method: el.method,
                url: el.url,
                params: el.params,
                data: el.data,
                // headers: {
                //   Authorization: "Bearer token-three" // this overides the earlier defualt
                // }
              })}
            >
              {el.btnName}
            </button>
          ))
        }
        <button
          onClick={handleParallelFetch}
          className="cursor-pointer shadow-sm py-1 px-4 bg-red-100 hover:bg-[#facfcf] rounded-lg"
        >
          Parallel (see console)
        </button>
      </div>
      <section className="border rounded-lg py-5 px-10 font-semibold border-dashed bg-white shadow-sm">
        {/* scope for optimization */}
        {isLoading && "Loading...."}
        {!responseData && !error && !isLoading && "Click the above buttons to see the respective response"}
        {responseData && !error && <pre className="text-wrap">{responseData}</pre>}
        {error && error}
      </section>
    </main >
  )
}

export default App