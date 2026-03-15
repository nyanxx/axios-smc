import { URL } from "./config"

const App = () => {

  const getData = () => {    
    fetch(URL)
      .then(res => {
        console.log("Response:", res)
        console.log("Response Status Code:", res.status)
        return res.json()

      })
      .then(data => console.log("Data:", data))
      .catch(error => console.log(error))
  }

  /**
   * 200 - success
   * 201 - success and something created
   * 204 - success but no content created or sent in response
   * 404 - not found
   * 401 - unauthorized
   * 500 - internal server erro
   */

  return (
    <main>
      <h1>Axios SMC</h1>
      <button type="button" onClick={() => getData()}>Fetch</button>
    </main>
  )
}

export default App