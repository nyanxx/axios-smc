import { METHOD, URL } from "./config"

const App = () => {

  const getData = () => {
    fetch(URL, {
      method: METHOD
    })
      .then(res => {
        console.log("Response:", res)
        console.log("Request Method:", METHOD)
        console.log("Response Status Code:", res.status)
        return res.json()

      })
      .then(data => console.log("Data:", data))
      .catch(error => console.log(error))
  }

  return (
    <main>
      <h1>Axios SMC</h1>
      <button type="button" onClick={() => getData()}>Fetch</button>
    </main>
  )
}

export default App