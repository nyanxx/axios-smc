import { ROUTES, type RequestMethod } from "../config";
import type { PostData, PostObject } from "../types/PostData";

type FetchButtonMeta = {
    btnName: string;
    method: RequestMethod;
    url: string;
    params?: Record<string, unknown>
    data?: unknown
};

const postData: PostObject = {
    title: "Learning Request Body",
    body: "Practice sending body data",
    userId: 3
}

const replaceData: PostData = {
    id: 1,
    title: "New Title",
    body: "New Body",
    userId: 1
}


type UpdateData = Pick<PostObject, "title">
const updateData: UpdateData = {
    title: "Patched Title"
}

export const axiosButtons: FetchButtonMeta[] = [
    {
        btnName: "GET",
        method: "GET",
        url: "posts/5",
        params: { postId: 12 }
    },
    {
        btnName: "POST",
        method: "POST",
        url: ROUTES.INVALID_ROUTE,
        data: postData
    },
    {
        btnName: "PUT(replace entire resource)",
        method: "PUT",
        // url: ROUTES.POST_1,
        url: "posts/2",
        data: replaceData
    },
    {
        btnName: " PATCH (partial update)",
        method: "PATCH",
        url: ROUTES.POST_1,
        data: updateData
    },
    {
        btnName: "DELETE",
        method: "DELETE",
        url: ROUTES.POST_1,

    },
];


