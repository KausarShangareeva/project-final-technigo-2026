import { useState } from "react";
import CTAButton from "../../../components/CTAButton";
import styles from "./PDFExport.module.css";

const tabs = [
  { key: "vertical", label: "Portrait", icon: "/virtical.svg" },
  { key: "horizontal", label: "Landscape", icon: "/horizontal.svg" },
] as const;

type Tab = (typeof tabs)[number]["key"];

// ── Schedule data ────────────────────────────────────────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const START_HOUR = 6;
const TOTAL_HOURS = 16; // 06:00 – 22:00 (used for block positioning)
const SLOT_MIN = 30; // 30-minute slots
const TOTAL_SLOTS = (TOTAL_HOURS * 60) / SLOT_MIN; // 32 slots

const TIME_COL_PCT = 10;
const DAY_COL_PCT = (100 - TIME_COL_PCT) / DAYS.length;

const COURSES = [
  // Monday
  { day: 0, start: 9,    end: 11,   label: "Math",       color: "#6366f1", bg: "rgba(99,102,241,0.12)",  icon: "📘" },
  { day: 0, start: 13,   end: 14.5, label: "Art",        color: "#e11d48", bg: "rgba(225,29,72,0.12)",   icon: "🎨" },
  // Tuesday
  { day: 1, start: 8,    end: 10,   label: "Physics",    color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  icon: "📙" },
  { day: 1, start: 12,   end: 13.5, label: "Geography",  color: "#0d9488", bg: "rgba(13,148,136,0.12)",  icon: "🌍" },
  // Wednesday
  { day: 2, start: 7,    end: 8.5,  label: "Music",      color: "#7c3aed", bg: "rgba(124,58,237,0.12)",  icon: "🎵" },
  { day: 2, start: 11,   end: 13,   label: "Literature", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   icon: "📗" },
  // Thursday
  { day: 3, start: 9,    end: 12,   label: "History",    color: "#ec4899", bg: "rgba(236,72,153,0.12)",  icon: "📕" },
  { day: 3, start: 14,   end: 16,   label: "P.E.",       color: "#65a30d", bg: "rgba(101,163,13,0.12)",  icon: "⚽" },
  // Friday
  { day: 4, start: 9,    end: 11,   label: "Comp. Sci.", color: "#0891b2", bg: "rgba(8,145,178,0.12)",   icon: "💻" },
  { day: 4, start: 14,   end: 16,   label: "Chemistry",  color: "#a855f7", bg: "rgba(168,85,247,0.12)",  icon: "📓" },
  // Saturday
  { day: 5, start: 10,   end: 12,   label: "Biology",    color: "#0ea5e9", bg: "rgba(14,165,233,0.12)",  icon: "📔" },
  { day: 5, start: 13.5, end: 15,   label: "Economics",  color: "#d97706", bg: "rgba(217,119,6,0.12)",   icon: "📊" },
  // Sunday
  { day: 6, start: 11,   end: 12.5, label: "Drama",      color: "#be185d", bg: "rgba(190,24,93,0.12)",   icon: "🎭" },
  { day: 6, start: 14,   end: 15.5, label: "English",    color: "#f97316", bg: "rgba(249,115,22,0.12)",  icon: "📒" },
];

// ── Mini schedule preview ────────────────────────────────────────────────────
function MiniSchedulePreview({ orientation }: { orientation: Tab }) {
  return (
    <div className={styles.previewPaper}>
      <div className={styles.paper}>
        <div className={styles.schedGrid}>
          {/* Day headers */}
          <div className={styles.schedHeader}>
            <div className={styles.schedCorner} />
            {DAYS.map((day, i) => (
              <div key={i} className={styles.schedDayLabel}>
                {day}
              </div>
            ))}
          </div>

          {/* Body: background grid + course blocks */}
          <div className={styles.schedBody}>
            {/* Grid rows — 30-min slots */}
            <div className={styles.schedRows}>
              {Array.from({ length: TOTAL_SLOTS }).map((_, slot) => {
                const totalMins = slot * SLOT_MIN;
                const hour = START_HOUR + Math.floor(totalMins / 60);
                const min = totalMins % 60;
                return (
                  <div key={slot} className={styles.schedRow}>
                    <div className={styles.schedTimeLabel}>
                      {String(hour).padStart(2, "0")}:
                      {String(min).padStart(2, "0")}
                    </div>
                    {DAYS.map((_, col) => (
                      <div key={col} className={styles.schedCell} />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Course blocks */}
            {COURSES.map((course, i) => {
              const left = TIME_COL_PCT + course.day * DAY_COL_PCT;
              const top = ((course.start - START_HOUR) / TOTAL_HOURS) * 100;
              const height = ((course.end - course.start) / TOTAL_HOURS) * 100;
              return (
                <div
                  key={i}
                  className={styles.schedBlock}
                  style={{
                    left: `calc(${left}% + 1px)`,
                    top: `${top}%`,
                    width: `calc(${DAY_COL_PCT}% - 2px)`,
                    height: `${height}%`,
                    background: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${course.color}10 4px, ${course.color}10 7px), ${course.bg}`,
                    borderLeft: `2.5px solid ${course.color}`,
                  }}
                >
                  <span className={styles.schedBlockIcon}>{course.icon}</span>
                  <span className={styles.schedBlockLabel}>{course.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function PDFExport() {
  const [active, setActive] = useState<Tab>("vertical");

  return (
    <section id="pdf-export" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.first}>
          <h2 className={styles.title}>Print </h2>
          <img src="/pdf-svg.svg" alt="" className={styles.titleIcon} />
        </div>
        <h2 className={styles.title}>your plan in PDF format</h2>
      </div>

      <div className={styles.toggle}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.toggleBtn} ${active === tab.key ? styles.toggleBtnActive : ""}`}
            onClick={() => setActive(tab.key)}
          >
            <img src={tab.icon} alt="" className={styles.toggleIcon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.cardWrapper}>
        <div
          className={`${styles.card} ${
            active === "horizontal" ? styles.cardLandscape : styles.cardPortrait
          }`}
        >
          <MiniSchedulePreview orientation={active} />
        </div>
      </div>

      <CTAButton to="/register">Try It Free</CTAButton>
    </section>
  );
}
