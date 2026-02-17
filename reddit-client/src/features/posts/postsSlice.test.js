import { describe, it, expect, vi, afterEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer, { fetchPosts } from "./postsSlice";

function createPostsTestStore(preloadedState) {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState,
  });
}

describe("postsSlice - fetchPosts Thunk", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("baut die richtige URL ohne searchTerm und ohne after", async () => {
    const fakeResponse = {
      data: {
        children: [],
        after: null,
      },
    };

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => fakeResponse,
    });

    const store = createPostsTestStore();

    await store.dispatch(
      fetchPosts({ filter: "r/reactjs", searchTerm: "", after: null }),
    );

    expect(fetchMock).toHaveBeenCalledWith("/api/r/reactjs.json?limit=10");
  });

  it("baut die richtige URL mit searchTerm", async () => {
    const fakeResponse = {
      data: {
        children: [],
        after: null,
      },
    };

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => fakeResponse,
    });

    const store = createPostsTestStore();

    await store.dispatch(
      fetchPosts({ filter: "hot", searchTerm: "react", after: null }),
    );

    expect(fetchMock).toHaveBeenCalledWith("/api/search.json?q=react&limit=10");
  });

  it("hängt den after-Parameter an die URL an, wenn vorhanden", async () => {
    const fakeResponse = {
      data: {
        children: [],
        after: "t3_123",
      },
    };

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => fakeResponse,
    });

    const store = createPostsTestStore();

    await store.dispatch(
      fetchPosts({
        filter: "hot",
        searchTerm: "",
        after: "t3_123",
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/hot.json?limit=10&after=t3_123",
    );
  });

  it("mappt die API-Response korrekt", async () => {
    const fakeResponse = {
      data: {
        children: [
          {
            data: {
              id: "abc123",
              title: "Ein Test-Post",
              author: "testuser",
              subreddit: "reactjs",
              ups: 42,
              num_comments: 7,
              preview: {
                images: [
                  {
                    source: {
                      url: "https://example.com/image&amp;test.jpg",
                    },
                  },
                ],
              },
              is_video: true,
              media: {
                reddit_video: {
                  fallback_url: "https://example.com/video.mp4",
                },
              },
            },
          },
        ],
        after: "t3_after",
      },
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => fakeResponse,
    });

    const store = createPostsTestStore();

    await store.dispatch(
      fetchPosts({ filter: "hot", searchTerm: "", after: null }),
    );

    const state = store.getState().posts;

    expect(state.status).toBe("succeeded");
    expect(state.after).toBe("t3_after");
    expect(state.posts).toHaveLength(1);

    expect(state.posts[0]).toEqual({
      id: "abc123",
      title: "Ein Test-Post",
      author: "testuser",
      subreddit: "reactjs",
      upvotes: 42,
      comments: 7,
      image: "https://example.com/image&test.jpg",
      video: "https://example.com/video.mp4",
    });
  });

  it("setzt Status auf failed bei Fehler", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
    });

    const store = createPostsTestStore();

    await store.dispatch(
      fetchPosts({ filter: "hot", searchTerm: "", after: null }),
    );

    const state = store.getState().posts;

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Fehler beim Laden der Posts");
  });
});

describe("postsSlice - initialer State", () => {
  it("hat den erwarteten Initialzustand", () => {
    const store = createPostsTestStore();
    const state = store.getState().posts;

    expect(state).toEqual({
      posts: [],
      status: "idle",
      error: null,
      after: null,
    });
  });
});
