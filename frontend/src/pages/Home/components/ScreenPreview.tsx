import { Save, Printer } from "lucide-react";
import TAGS from "../../../json/tags.json";
import WEEKDAYS from "../../../json/weekdays.json";
import TagIcon from "../../../components/TagIcon";
import styles from "./ScreenPreview.module.css";

const DAYS = WEEKDAYS.days.map((d) => d.short);
const TIMES = WEEKDAYS.hours
  .filter((h) => h.value >= 8 && h.value <= 16)
  .map((h) => h.full);

function tag(name: string) {
  const t = TAGS.find((t) => t.name === name);
  if (!t) { console.warn(`[ScreenPreview] Course not found in tags.json: "${name}"`); return { name, color: "#888", bg: "rgba(136,136,136,0.12)", icon: "📚" }; }
  return { name: t.name, color: t.color, bg: t.bg, icon: t.icon };
}

const DEMO_SCHEDULE: Record<
  string,
  { name: string; color: string; bg: string; icon: string }
> = {
  "Mon-09:00": tag("Math"),
  "Mon-10:00": tag("Math"),
  "Tue-08:00": tag("Physics"),
  "Tue-09:00": tag("Physics"),
  "Wed-11:00": tag("Literature"),
  "Wed-12:00": tag("Literature"),
  "Thu-09:00": tag("History"),
  "Thu-10:00": tag("History"),
  "Thu-11:00": tag("History"),
  "Fri-14:00": tag("Chemistry"),
  "Fri-15:00": tag("Chemistry"),
  "Sat-10:00": tag("Biology"),
  "Sat-11:00": tag("Biology"),
  "Sun-13:00": tag("English"),
  "Sun-14:00": tag("English"),
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
                            background: `repeating-linear-gradient(-45deg, transparent, transparent 4px, color-mix(in srgb, ${entry.color} 10%, transparent) 4px, color-mix(in srgb, ${entry.color} 10%, transparent) 7px), ${entry.bg}`,
                            borderLeft: `3px solid ${entry.color}`,
                          }}
                        >
                          <span className={styles.courseContent}>
                            <span className={styles.courseIcon}>
                              <TagIcon icon={entry.icon} size={12} />
                            </span>
                            <span className={styles.courseName}>
                              {entry.name}
                            </span>
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
