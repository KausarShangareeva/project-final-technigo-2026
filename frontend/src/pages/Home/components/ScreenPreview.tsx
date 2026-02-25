import { Save, Printer } from "lucide-react";
import styles from "./ScreenPreview.module.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const DEMO_SCHEDULE: Record<
  string,
  { name: string; color: string; bg: string; icon: string }
> = {
  "Mon-09:00": {
    name: "Math",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
    icon: "📘",
  },
  "Mon-10:00": {
    name: "Math",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
    icon: "📘",
  },
  "Tue-08:00": {
    name: "Physics",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    icon: "📙",
  },
  "Tue-09:00": {
    name: "Physics",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    icon: "📙",
  },
  "Wed-11:00": {
    name: "Literature",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    icon: "📗",
  },
  "Wed-12:00": {
    name: "Literature",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    icon: "📗",
  },
  "Thu-09:00": {
    name: "History",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    icon: "📕",
  },
  "Thu-10:00": {
    name: "History",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    icon: "📕",
  },
  "Thu-11:00": {
    name: "History",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    icon: "📕",
  },
  "Fri-14:00": {
    name: "Chemistry",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    icon: "📓",
  },
  "Fri-15:00": {
    name: "Chemistry",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    icon: "📓",
  },
  "Sat-10:00": {
    name: "Biology",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.12)",
    icon: "📔",
  },
  "Sat-11:00": {
    name: "Biology",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.12)",
    icon: "📔",
  },
  "Sun-13:00": {
    name: "English",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    icon: "📒",
  },
  "Sun-14:00": {
    name: "English",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    icon: "📒",
  },
};

// Track which cells are "start" vs "continuation"
function isStart(day: string, time: string, times: string[]): boolean {
  const idx = times.indexOf(time);
  if (idx === 0) return true;
  const prevKey = `${day}-${times[idx - 1]}`;
  const curKey = `${day}-${time}`;
  return (
    !DEMO_SCHEDULE[prevKey] ||
    DEMO_SCHEDULE[prevKey].name !== DEMO_SCHEDULE[curKey]?.name
  );
}

function getSpan(day: string, time: string, times: string[]): number {
  const entry = DEMO_SCHEDULE[`${day}-${time}`];
  if (!entry) return 1;
  let span = 1;
  const idx = times.indexOf(time);
  for (let i = idx + 1; i < times.length; i++) {
    const nextEntry = DEMO_SCHEDULE[`${day}-${times[i]}`];
    if (nextEntry && nextEntry.name === entry.name) span++;
    else break;
  }
  return span;
}

export default function ScreenPreview() {
  // Build a set of continuation cells to skip
  const skipCells = new Set<string>();
  for (const day of DAYS) {
    for (let i = 0; i < TIMES.length; i++) {
      const key = `${day}-${TIMES[i]}`;
      if (DEMO_SCHEDULE[key] && isStart(day, TIMES[i], TIMES)) {
        const span = getSpan(day, TIMES[i], TIMES);
        for (let j = 1; j < span; j++) {
          skipCells.add(`${day}-${TIMES[i + j]}`);
        }
      }
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.screen}>
        {/* Browser chrome */}
        <div className={styles.toolbar}>
          <div className={styles.dots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <div className={styles.addressBar} />
        </div>

        {/* Action buttons */}
        <div className={styles.actionBar}>
          <button className={styles.saveBtn}>
            <Save size={18} />
            Save Plan
          </button>
          <button className={styles.printBtn}>
            <Printer size={18} />
            Print PDF
          </button>
          <div className={styles.hintGroup}>
            <span className={styles.actionHint}>
              Try to <br />
              print 😄
            </span>
            <svg
              className={styles.hintArrow}
              width="60"
              height="50"
              viewBox="0 0 60 50"
              fill="none"
            >
              <path
                d="M10 4 C20 4, 40 8, 46 24 C52 40, 54 44, 56 48"
                stroke="var(--color-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 4"
                fill="none"
              />
              <path
                d="M58 40 L56 48 L48 46"
                stroke="var(--color-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Schedule table */}
        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.timeHeader} />
                {DAYS.map((day) => (
                  <th key={day} className={styles.dayHeader}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMES.map((time) => (
                <tr key={time}>
                  <td className={styles.timeCell}>{time}</td>
                  {DAYS.map((day) => {
                    const key = `${day}-${time}`;
                    if (skipCells.has(key)) return null;
                    const entry = DEMO_SCHEDULE[key];
                    if (entry && isStart(day, time, TIMES)) {
                      const span = getSpan(day, time, TIMES);
                      return (
                        <td
                          key={key}
                          rowSpan={span}
                          className={styles.bookedCell}
                          style={{
                            background: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${entry.color}10 4px, ${entry.color}10 7px), ${entry.bg}`,
                            borderLeft: `3px solid ${entry.color}`,
                          }}
                        >
                          <span className={styles.courseIcon}>
                            {entry.icon}
                          </span>
                          <span className={styles.courseName}>
                            {entry.name}
                          </span>
                        </td>
                      );
                    }
                    return <td key={key} className={styles.emptyCell} />;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
