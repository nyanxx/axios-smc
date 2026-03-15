type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
const SITE = "jsonplaceholder.typicode.com"

/**
 * https://jsonplaceholder.typicode.com/posts/1
 * https://jsonplaceholder.typicode.com/invalid-route
 * https://jsonplaceholder.typicode.com/posts
 * https://jsonplaceholder.typicode.com/users
*/

/**
 * 200 - success
 * 201 - success and something created
 * 204 - success but no content created or sent in response
 * 404 - not found
 * 401 - unauthorized
 * 500 - internal server erro
 */

const METHOD: RequestMethod = "POST"

const PARAMS = "users" // POST->201 and GET->200(return 10 users)
// const PARAMS = "posts" // POST->201 and GET->200(returns 100 objects)
// const PARAMS = "posts/1" // 200
// const PARAMS = "posasdfadf" // 404


const URL = `https://${SITE}/${PARAMS}`
export { URL, METHOD }