import axios from "./api/axios"
import { AxiosError, type AxiosRequestConfig } from "axios"
import { axiosButtons } from "./data"

const App = () => {

  const handleClick = async (options: AxiosRequestConfig) => {
    try {
      const res = await axios({ ...options })

      // if the request failed the below code will not event execute
      console.log("Response Status Code:", res.status) // 200
      console.log("Request Method:", res.config.method)
      console.log("Request Header:", res.headers)
      // data is available in res.data
      if (res.status === 200) {
        console.log("Data:", res.data)
      }
      // no need to use the .json() axios automatically converts JSON for you
    } catch (error) {
      if (error instanceof AxiosError) {
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
    }
  }

  return (
    <main className="py-10 px-20 md:py-25 md:px-30">
      <h1 className="text-3xl font-bold mb-4">Axios SMC</h1>
      <div className="flex flex-wrap gap-3 font-semibold text-md mb-5">
        {
          axiosButtons.map((el) => (
            <button
              key={el.btnName}
              className="cursor-pointer shadow-sm py-1 px-4  bg-amber-100 hover:bg-[#fdeeb5] rounded-lg"
              type="button"
              onClick={() => handleClick({
                method: el.method,
                url: el.url,
                params: el.params,
                data: el.data
              })}
            >
              {el.btnName}
            </button>
          ))
        }
      </div>
      <section className="border rounded-lg py-5 px-10 font-semibold border-dashed">
        nil...
      </section>
    </main >
  )
}

export default App