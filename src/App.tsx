import { useEffect, useRef } from "react"
import {
  PARAMS,
} from "./config"
import axios from "./api/axios"
import type { PostObject } from "./types/PostData"
import { AxiosError } from "axios"
import type { ResponseData } from "./types/ResponseData"

const App = () => {

  const getData = async (): Promise<void> => {
    // fetch(URL, {
    //   method: METHOD
    // })
    //   .then(res => {
    //     console.log("Response:", res)
    //     console.log("Request Method:", METHOD)
    //     console.log("Response Status Code:", res.status)
    //     return res.json()

    //   })
    //   .then(data => console.log("Data:", data))
    //   .catch(error => console.log(error))

    try {
      const res = await axios.get<ResponseData[]>(PARAMS.INVALID_ROUTE)
      // if the request failed the below code will not event execute
      console.log("Response Status Code:", res.status)
      console.log("Request Method:", res.config.method)
      // data is available in res.data
      console.log("Data:", res.data)
      console.log(res.data.forEach(e => e.name))
      // no need to use the .json() axios automatically converts JSON for you
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Status Code:", error.status)
        if (!error.response) { console.error("Check network and try again!") }
        if (error.status === 400) { console.error("Bad Request") }
        if (error.status === 401) { console.error("Unauthorized") }
        if (error.status === 404) { console.error("Not Found") }
      } else {
        console.error("Unexpected Error:", error)
      }
    }

  }

  const postData = async (): Promise<void> => {

    const postData: PostObject = {
      title: "Axios Practice",
      body: "Posting data",
      userId: 5
    }

    try {
      const res = await axios.post<PostObject & { id: number }>(
        PARAMS.POSTS,
        postData
      )

      console.log("Response Status Code:", res.status)
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)
      console.log(res.data.id)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Status Code:", error.status)
        if (!error.response) { console.error("Check network and try again!") }
        if (error.status === 400) { console.error("Bad Request") }
        if (error.status === 401) { console.error("Unauthorized") }
        if (error.status === 404) { console.error("Not Found") }
      } else {
        console.error("Unexpected Error:", error)
      }
    }
  }


  const putData = async (): Promise<void> => {

    const replaceData: PostObject & { id: number } = {
      id: 1,
      title: "Updated Title",
      body: "Updated body",
      userId: 1
    }

    try {
      const res = await axios.put(
        // PARAMS.POST_1,
        "post/10",
        replaceData
      )
      console.log("Response Status Code:", res.status)
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)
      console.log(res.data.id)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Status Code:", error.status)
        if (!error.response) { console.error("Check network and try again!") }
        if (error.status === 400) { console.error("Bad Request") }
        if (error.status === 401) { console.error("Unauthorized") }
        if (error.status === 404) { console.error("Not Found") }
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
        PARAMS.POST_1,
        updateData
      )
      console.log("Response Status Code:", res.status)
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)
      console.log(res.data.id)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Status Code:", error.status)
        if (!error.response) { console.error("Check network and try again!") }
        if (error.status === 400) { console.error("Bad Request") }
        if (error.status === 401) { console.error("Unauthorized") }
        if (error.status === 404) { console.error("Not Found") }
      } else {
        console.error("Unexpected Error:", error)
      }
    }
  }

  const deleteData = async (): Promise<void> => {
    try {
      const res = await axios.delete(
        PARAMS.POST_1,
      )
      console.log("Response Status Code:", res.status) //200
      console.log("Request Method:", res.config.method)
      console.log("Data:", res.data)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Status Code:", error.status)
        if (!error.response) { console.error("Check network and try again!") }
        if (error.status === 400) { console.error("Bad Request") }
        if (error.status === 401) { console.error("Unauthorized") }
        if (error.status === 404) { console.error("Not Found") }
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