import {
  getUsers,
  getUserById,
  getPosts,
  getPostById,
  getComments,
  getTodos,
} from "../services/apiServices";

export default function Services() {
  return (
    <div className="flex flex-wrap gap-3 font-semibold text-md ">
      <button
        onClick={async () => console.log(await getUsers())}
        className="cursor-pointer shadow-sm py-1 px-4 bg-indigo-100 hover:bg-[#c6d3ff] rounded-lg"
      >
        getUsers()
      </button>
      <button
        onClick={async () => console.log(await getUserById(9))}
        className="cursor-pointer shadow-sm py-1 px-4 bg-indigo-100 hover:bg-[#c6d3ff] rounded-lg"
      >
        getUserById(9)
      </button>
      <button
        onClick={async () => console.log(await getPosts())}
        className="cursor-pointer shadow-sm py-1 px-4 bg-indigo-100 hover:bg-[#c6d3ff] rounded-lg"
      >
        getPosts()
      </button>
      <button
        onClick={async () => console.log(await getPostById(4))}
        className="cursor-pointer shadow-sm py-1 px-4 bg-indigo-100 hover:bg-[#c6d3ff] rounded-lg"
      >
        getPostById(4)
      </button>
      <button
        onClick={async () => console.log(await getComments())}
        className="cursor-pointer shadow-sm py-1 px-4 bg-indigo-100 hover:bg-[#c6d3ff] rounded-lg"
      >
        getComments() (2s Delay)
      </button>
      <button
        onClick={async () => console.log(await getTodos())}
        className="cursor-pointer shadow-sm py-1 px-4 bg-indigo-100 hover:bg-[#c6d3ff] rounded-lg"
      >
        getTodos()
      </button>
    </div>
  );
}
