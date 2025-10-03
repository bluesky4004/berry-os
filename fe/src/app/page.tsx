// src/app/page.tsx
"use client";
import Sidebar from "@/components/Sidebar";
import Timeline from "@/components/Timeline";
import { Task } from "@/types";

export default function Home() {
  // You can tweak these to see the math working
  const tasks: Task[] = [
    { id: 1, title: "Morning Routine", start: "08:00", end: "08:45", color: "bg-pink-500" },
    { id: 2, title: "Deep Work", start: "10:00", end: "12:00", color: "bg-emerald-500" },
    { id: 3, title: "Gym", start: "17:30", end: "18:30", color: "bg-amber-500" },
  ];

  return (
    <main className="h-screen w-screen grid grid-cols-[260px_1fr] bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Wednesday, Sep 17</div>
          <div className="flex gap-2">
            <button className="border rounded px-2 py-1">Today</button>
            <button className="border rounded px-2 py-1">Settings</button>
          </div>
        </header>
        <Timeline tasks={tasks} />
      </div>
    </main>
  );
}
