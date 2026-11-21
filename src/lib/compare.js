export function compareLists(followers, following) {
  const notFollowingBack = [];
  const youDontFollowBack = [];
  const mutuals = [];

  for (const name of following) {
    if (followers.has(name)) mutuals.push(name);
    else notFollowingBack.push(name);
  }
  for (const name of followers) {
    if (!following.has(name)) youDontFollowBack.push(name);
  }

  const sort = (list) => list.sort((a, b) => a.localeCompare(b));
  return {
    notFollowingBack: sort(notFollowingBack),
    youDontFollowBack: sort(youDontFollowBack),
    mutuals: sort(mutuals),
  };
}
