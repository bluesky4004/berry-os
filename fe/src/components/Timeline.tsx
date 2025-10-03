// src/components/Timeline.tsx
"use client";
import { Task } from "@/types";
import { parseHM, durationBetween, toMinutesSince, hourLabels, DEFAULT_START_HOUR, DEFAULT_END_HOUR } from "@/lib/time";

type Props = { tasks: Task[]; startHour?: number; endHour?: number };

export default function Timeline({ tasks, startHour = DEFAULT_START_HOUR, endHour = DEFAULT_END_HOUR }: Props) {
  const totalMinutes = (endHour - startHour) * 60;

  return (
    <section className="relative bg-white overflow-y-auto">
      {/* Hour lines + labels */}
      <div className="grid grid-cols-[80px_1fr]">
        <div className="bg-white border-r">
          {hourLabels(startHour, endHour).map((h) => (
            <div key={h} className="h-[60px] flex items-start justify-end pr-3 text-xs text-gray-500">
              {h % 12 === 0 ? 12 : h % 12}{h < 12 ? " AM" : " PM"}
            </div>
          ))}
        </div>

        {/* Ruler + events */}
        <div className="relative bg-white">
          {/* hour rules */}
          {Array.from({ length: endHour - startHour }).map((_, i) => (
            <div key={i} className="border-t border-gray-100 absolute left-0 right-0" style={{ top: `${i * 60}px` }} />
          ))}

          {/* Blocks */}
          <div style={{ position: "relative", height: `${totalMinutes}px` }}>
            {tasks.filter(t => t.start && t.end).map((t) => {
              const top = toMinutesSince(startHour, t.start!);
              const height = durationBetween(t.start!,t.end!);
              return (
                <div
                  key={t.id}
                  className={`${t.color ?? "bg-indigo-500"} absolute left-6 right-6 text-white rounded-xl shadow p-2`}
                  style={{ top, height }}
                  title={`${t.start}–${t.end}`}
                >
                  <div className="text-[10px] opacity-80">{t.start}–{t.end}</div>
                  <div className="font-semibold">{t.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
