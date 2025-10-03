// src/components/Sidebar.tsx
"use client";

export default function Sidebar() {
  return (
    <aside className="bg-white border-r p-4 flex flex-col gap-3 min-w-[220px]">
      <div className="text-lg font-semibold">Inbox</div>
      <div className="flex gap-2">
        <input className="border rounded px-2 py-1 flex-1" placeholder="Add a new inbox task…" />
        <button className="rounded bg-black text-white px-3">+</button>
      </div>
      <div className="text-xs text-gray-500">Inbox items will show here soon.</div>
    </aside>
  );
}
