import { URL } from "./config"

const App = () => {

  const getData = () => {
    fetch(URL)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  // getData()

  return <h1>Axios SMC</h1>
}

export default App