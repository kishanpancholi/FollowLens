import { useState } from "react";

export default function UsernameCheck({ followers, following }) {
  const [q, setQ] = useState("");
  const name = q.trim().toLowerCase().replace(/^@/, "");

  return (
    <details className="mb-4 text-sm">
      <summary className="cursor-pointer">Check a username</summary>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="username"
        className="mt-2 w-full rounded-lg border border-line bg-card px-3 py-2"
      />
      {name && (
        <p className="mt-2">
          In followers file: <b>{followers.has(name) ? "yes" : "no"}</b> · In
          following file: <b>{following.has(name) ? "yes" : "no"}</b>
        </p>
      )}
    </details>
  );
}
