import JSZip from "jszip";

export function normalizeUsername(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/^@/, "");
}

// Instagram uses different JSON shapes, so find the list of entries safely.
function getEntries(json) {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object") {
    for (const key of ["relationships_following", "relationships_followers"]) {
      if (Array.isArray(json[key])) return json[key];
    }
    const firstArray = Object.values(json).find(Array.isArray);
    if (firstArray) return firstArray;
  }
  return [];
}

// The username can be in value, in title, or only inside the profile link.
function getUsername(entry) {
  const item = entry?.string_list_data?.[0] || {};
  let name = item.value || entry?.title || "";
  if (!name && item.href) {
    name = item.href.split("/").filter(Boolean).pop() || "";
  }
  return normalizeUsername(name);
}

export function extractUsernames(json) {
  const names = getEntries(json).map(getUsername).filter(Boolean);
  return [...new Set(names)];
}

// Decide from the file name which list a file belongs to.
export function detectFileType(fileName) {
  const n = fileName.toLowerCase();
  const ignore = ["pending", "recent", "request", "hashtag"];
  if (ignore.some((word) => n.includes(word))) return null;
  if (n.includes("followers")) return "followers";
  if (n.includes("following")) return "following";
  return null;
}

async function filesFromZip(file) {
  const zip = await JSZip.loadAsync(file);
  const out = [];
  for (const entry of Object.values(zip.files)) {
    if (entry.dir || !entry.name.toLowerCase().endsWith(".json")) continue;
    out.push({
      name: entry.name.split("/").pop(),
      text: await entry.async("string"),
    });
  }
  return out;
}

// Accepts the user's selected files (.json and/or .zip).
// Throws 'MISSING_FILES' or 'NO_USERNAMES' so the screen can show a clear message.
export async function loadFiles(fileList) {
  const raw = [];
  let exportDate = "";
  for (const file of Array.from(fileList)) {
    if (file.name.toLowerCase().endsWith(".zip")) {
      const m = file.name.match(/(\d{4}-\d{2}-\d{2})/);
      if (m) exportDate = m[1];
      raw.push(...(await filesFromZip(file)));
    } else {
      raw.push({ name: file.name, text: await file.text() });
    }
  }

  const followers = new Set();
  const report = [];
  const following = new Set();
  let hasFollowers = false;
  let hasFollowing = false;

  for (const { name, text } of raw) {
    const type = detectFileType(name);
    if (!type) continue;
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      continue;
    }
    const entries = getEntries(json);
    const names = extractUsernames(json);
    report.push({
      file: name,
      type,
      entries: entries.length,
      unique: names.length,
    });
    if (type === "followers") {
      hasFollowers = true;
      names.forEach((n) => followers.add(n));
    } else {
      hasFollowing = true;
      names.forEach((n) => following.add(n));
    }
  }

  if (!hasFollowers || !hasFollowing) throw new Error("MISSING_FILES");
  if (!followers.size || !following.size) throw new Error("NO_USERNAMES");
  return { followers, following, report, exportDate };
}
