const FILE_NAMES = [
  "not-following-you-back",
  "you-dont-follow-back",
  "mutuals",
];

export function buildCsv(names) {
  const rows = names.map((n) => `${n},https://instagram.com/${n}`);
  return ["username,profile_url", ...rows].join("\r\n");
}

export function downloadCsv(names, tabIndex, exportDate) {
  // The BOM (\uFEFF) makes Excel read the file correctly.
  const blob = new Blob(["\uFEFF" + buildCsv(names)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${FILE_NAMES[tabIndex]}${exportDate ? "-" + exportDate : ""}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
