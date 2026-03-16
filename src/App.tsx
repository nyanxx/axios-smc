import { useEffect, useRef } from "react"
import {
  // METHOD,
  URL
} from "./config"
import axios from "axios"

const App = () => {

  // console.log(axios)

  const getData = () => {
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


    type ResponseData = {
      id: number,
      name: string,
      username: string,
      email: string,
      address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
          lat: string,
          lng: string
        }
      },
      phone: string,
      website: string,
      company: {
        name: string,
        catchPhrase: string,
        bs: string
      }
    }


    try {
      axios.get<ResponseData[]>(URL).then(res => {
        // if the request failed the below code will not event execute
        console.log("Response Status Code:", res.status)
        console.log("Request Method:", res.config.method)
        console.log(res.data.map(e => e.name))
        // res.data.forEach(element => {
        //   console.log(element.name)
        // });
      })
      // no need to use the .json() axios automatically converts JSON for you
      // data is available in res.data
    } catch (error) {
      console.log(error)
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
        Fetch
      </button>
    </main>
  )
}

export default App