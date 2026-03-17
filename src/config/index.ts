type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
const BASEURL = "https://jsonplaceholder.typicode.com/"

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
 * 400 - bad request - server cannot or will not process the request
 * 404 - not found
 * 401 - unauthorized
 * 422 - uprocessable content or entity due to semantic error or failed validation 
 * 402 - payment reqired
 * 409 - conflict or duplicate data
 * 500 - internal server error
 */

const METHOD: RequestMethod = "GET"

const ROUTES = {
    USERS: "users", // POST->201 | GET->200(return 10 users)
    POSTS: "posts", // POST->201 | GET->200(returns 100 objects)
    POST_1: "posts/1", // GET->200 
    INVALID_ROUTE: "posasdfadf", // 404
}


// const URL = `https://${SITE}/${PARAMS}`


export { METHOD, BASEURL, ROUTES }