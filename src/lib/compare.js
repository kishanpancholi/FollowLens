export function compareLists(followers, following) {
  const notFollowingBack = [];
  const youDontInstaTrack = [];
  const mutuals = [];

  for (const name of following) {
    if (followers.has(name)) mutuals.push(name);
    else notFollowingBack.push(name);
  }
  for (const name of followers) {
    if (!following.has(name)) youDontInstaTrack.push(name);
  }

  const sort = (list) => list.sort((a, b) => a.localeCompare(b));
  return {
    notFollowingBack: sort(notFollowingBack),
    youDontInstaTrack: sort(youDontInstaTrack),
    mutuals: sort(mutuals),
  };
}
