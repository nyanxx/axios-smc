import { useEffect, useRef } from "react"
import {
  ROUTES,
} from "./config"
import axios from "./api/axios"
import type { PostData, PostObject } from "./types/PostData"
import { AxiosError } from "axios"
// import type { ResponseData } from "./types/ResponseData"

const App = () => {

  const getData = async (): Promise<void> => {
    try {
      // const res = await axios.get<ResponseData[]>("posts?id=12") // OR
      // const res = await axios.get<ResponseData[]>("posts", { params: { userId: 12 } })
      // const res = await axios.get<PostData>("posts/5", { params: { postId: 12 } })
      const res = await axios.get<PostData>("posts/5", { params: { postId: 12 } })


      // if the request failed the below code will not event execute
      console.log("Response Status Code:", res.status) // 200
      console.log("Request Method:", res.config.method)
      console.log("Request Header:", res.headers)
      // data is available in res.data
      if (res.status === 200) console.log("Data:", res.data)


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

  const postData = async (): Promise<void> => {

    const postData: PostObject = {
      title: "Learning Request Body",
      body: "Practice sending body data",
      userId: 3
    }

    try {
      const res = await axios.post<PostData>(
        ROUTES.POSTS,
        postData
      )

      console.log("Response Status Code:", res.status) // 201
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)
      console.log(res.data.id)

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


  const putData = async (): Promise<void> => {

    const replaceData: PostData = {
      id: 1,
      title: "New Title",
      body: "New Body",
      userId: 1
    }

    try {
      const res = await axios.put(
        // PARAMS.POST_1,
        "posts/2",
        replaceData
      )
      console.log("Response Status Code:", res.status) // 201
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)
      console.log(res.data.id)

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

  const patchData = async (): Promise<void> => {

    type UpdateData = Pick<PostObject, "title">
    const updateData: UpdateData = {
      title: "Patched Title"
    }

    try {
      const res = await axios.patch(
        ROUTES.POST_1,
        updateData
      )
      console.log("Response Status Code:", res.status)
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)
      console.log(res.data.id)

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

  const deleteData = async (): Promise<void> => {
    try {
      const res = await axios.delete(
        ROUTES.POST_1,
      )
      console.log("Response Status Code:", res.status) //200
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)

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

  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    btnRef.current?.focus()
  }, [])

  return (
    <main>
      <h1>Axios SMC</h1>
      <button
        ref={btnRef}
        type="button"
        onClick={() => getData()}
      >
        GET
      </button>
      <button
        type="button"
        onClick={() => postData()}
      >
        POST
      </button>
      <button
        type="button"
        onClick={() => putData()}
      >
        PUT(replace entire resource)
      </button>
      <button
        type="button"
        onClick={() => patchData()}
      >
        PATCH (partial update)
      </button>
      <button
        type="button"
        onClick={() => deleteData()}
      >
        DELETE
      </button>
    </main>
  )
}

export default App