const App = () => {
  const URL = "https://jsonplaceholder.typicode.com/posts/1"

  fetch(URL).then(res => res.json()).then(data => console.log(data))

  return <h1>Axios SMC</h1>
}

export default App