import { describe, it, expect } from "vitest";
import { extractUsernames, detectFileType } from "./parser";
import { compareLists } from "./compare";

const followersJson = [
  {
    string_list_data: [
      { value: "Sara_123", href: "https://www.instagram.com/Sara_123" },
    ],
  },
  {
    string_list_data: [
      { value: "amit", href: "https://www.instagram.com/amit" },
    ],
  },
];
const followingJson = {
  relationships_following: [
    {
      title: "sara_123",
      string_list_data: [{ href: "https://www.instagram.com/sara_123" }],
    },
    {
      title: "raj",
      string_list_data: [{ href: "https://www.instagram.com/raj" }],
    },
  ],
};

describe("parser", () => {
  it("reads the followers format and ignores case", () => {
    expect(extractUsernames(followersJson)).toEqual(["sara_123", "amit"]);
  });
  it("reads the following format (name in title)", () => {
    expect(extractUsernames(followingJson)).toEqual(["sara_123", "raj"]);
  });
  it("detects file types and ignores unrelated files", () => {
    expect(detectFileType("followers_1.json")).toBe("followers");
    expect(detectFileType("following.json")).toBe("following");
    expect(detectFileType("following_hashtags.json")).toBe(null);
    expect(detectFileType("pending_follow_requests.json")).toBe(null);
  });
});

describe("compare", () => {
  it("finds the correct lists", () => {
    const followers = new Set(extractUsernames(followersJson));
    const following = new Set(extractUsernames(followingJson));
    const r = compareLists(followers, following);
    expect(r.mutuals).toEqual(["sara_123"]);
    expect(r.notFollowingBack).toEqual(["raj"]);
    expect(r.youDontFollowLens).toEqual(["amit"]);
  });
});
