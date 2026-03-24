import axios from "axios";

const getAPIClient = axios.create({
  method: "GET",
  baseURL: "https://jsonplaceholder.typicode.com/",
});

// const postAPIClient = axios.create({
//     method: "POST",
//     baseURL: "https://jsonplaceholder.typicode.com/"
// })

// there can also be userapiclient and many more for Separate concerns and to have different configs per API

const getCommentApiClient = axios.create({
  method: "GETD",
  baseURL: "https://jsonplaceholder.typicode.com/comments",
  timeout: 5000,
  headers: { Authorization: `Bearer myFirstToken` },
});

getCommentApiClient.interceptors.request.use((config) => {
  console.log("Request Interceptor No 4");
  const token = config.headers.Authorization?.toString().split(" ")[1];
  console.log("Token being sent with request:", token);
  return config;
});

let time: number;
getCommentApiClient.interceptors.request.use(async (config) => {
  console.log("Request Interceptor No 3");
  console.log("2 Seconds Delay Start...");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Delay End!");
  time = Date.now();
  const myToken = "myOveridingToken";
  config.headers.Authorization = `Bearer ${myToken}`;
  console.log("New token added!");
  return config;
});

getCommentApiClient.interceptors.request.use((config) => {
  console.log("Request Interceptor No 2");
  const token = config.headers.Authorization?.toString().split(" ")[1];
  console.log("Token being sent with request:", token);
  return config;
});

getCommentApiClient.interceptors.request.use((config) => {
  console.log("Request Interceptor No 1");
  return config;
});

getCommentApiClient.interceptors.response.use((config) => {
  console.log("Response Interceptor No 1");
  console.log(
    `Time required to fetched data was ${Math.floor((Date.now() - time) / 1000)} seconds`,
  );
  return config;
});

getCommentApiClient.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor No 2");
    console.log(
      `Time required to fetched data was ${Math.floor((Date.now() - time) / 1000)} seconds`,
    );
    return response;
  },
  (error) => {
    console.log("Global error:", (error as Error).message);
    return Promise.reject(error);
  },
);

const getUsers = async () => {
  const response = await getAPIClient("users");
  return response.data;
};

const getUserById = async (id: number) => {
  // const response = await getAPI("users", {
  //     params: { id }
  // })
  // OR
  const response = await getAPIClient(`users/${id}`);
  return response.data;
};

const getPosts = async () => {
  const response = await getAPIClient("posts");
  return response.data;
};

const getPostById = async (id: number) => {
  const response = await getAPIClient(`posts/${id}`);
  return response.data;
};

const getComments = async () => {
  const response = await getCommentApiClient("");
  return response.data;
};

const getTodos = async () => {
  const response = await getAPIClient("todos");
  return response.data;
};

export { getUsers, getUserById, getPosts, getPostById, getComments, getTodos };

// Possible Scope
// get comment by userid
// get comment by post
// get todo by userid
// get todo by post

// /posts	100 posts
// /comments	500 comments
// /albums	100 albums
// /photos	5000 photos
// /todos	200 todos
// /users	10 users

// GET	/posts
// GET	/posts/1
// GET	/posts/1/comments
// GET	/comments?postId=1
// POST	/posts
// PUT	/posts/1
// PATCH	/posts/1
// DELETE	/posts/1
