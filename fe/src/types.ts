

export type Task = {
  id: number;
  title: string;
  // keep times as "HH:mm" for UI; we'll switch to ISO when we hit the backend
  start?: string;   // e.g. "08:30"
  end?: string;     // e.g. "09:15"
  date?: string;    // "YYYY-MM-DD"
  color?: string;   // tailwind class like "bg-indigo-500"
  kind?: "task" | "habit";
  allDay?: boolean;
};