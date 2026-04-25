vi.mock("axios");
import { it, expect, vi, describe } from "vitest";
import { postQueryStringDataService } from "../../src/sendQueryStringAsData/postQueryStringData";
import axios from "axios";

describe("postQueryStringDataService", () => {
  it("Should return success equals true in response", async () => {
    // axios.post.mockResolvedValue({ data: { success: true } }); // ✅ This works but typeScript complain about this
    // vi.mocked(axios.post).mockResolvedValue({ data: { success: true } }); // ✅ This works and typeScript is happy with this
    const mockedAxios = vi.mocked(axios);
    mockedAxios.post.mockResolvedValue({ data: { success: true } }); // ✅ Another way — this aswell works and typeScript is happy with this
    const response = await postQueryStringDataService();

    // You can either be explicit here.
    expect(axios.post).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      "title=foo&body=bar&userId=1",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    // Or you can be less specific and just check the query stringified data.
    expect(axios.post).toHaveBeenCalledWith(
      expect.anything(),
      "title=foo&body=bar&userId=1",
      expect.anything(),
    );
    expect(response).toEqual({ success: true });
  });
});
