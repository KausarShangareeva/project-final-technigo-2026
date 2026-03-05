import { useState, useEffect } from "react";
import { useCopy } from "../../../hooks/useCopy";
import { Calendar, GraduationCap, Search, X } from "lucide-react";
import CTAButton from "../../../components/CTAButton";
import SectionHeader from "../../../components/SectionHeader";
import styles from "./StepByStepGuide.module.css";

const ET_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const ET_TIMES = ["08", "09", "10", "11", "12", "13", "14", "15", "16"];

const DEMO_COURSES = [
  {
    label: "Mathematics",
    emoji: "📐",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.15)",
  },
  {
    label: "Biology",
    emoji: "🧬",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.15)",
  },
  {
    label: "Chemistry",
    emoji: "🧪",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.15)",
  },
  {
    label: "Physics",
    emoji: "⚛️",
    color: "#ea580c",
    bg: "rgba(234,88,12,0.15)",
  },
  {
    label: "History",
    emoji: "📜",
    color: "#db2777",
    bg: "rgba(219,39,119,0.15)",
  },
];

const DEMO_DURATIONS = ["30 min", "1 hour", "2 hours"];

// Row height = 2.8rem, time col = 2.8rem, header row ≈ 2.8rem
// rows: 0=08, 1=09, 2=10, 3=11, 4=12, 5=13, 6=14, 7=15, 8=16
const TABLE_COURSES = [
  {
    day: 0,
    startRow: 1,
    endRow: 3,
    label: "Mathematics",
    emoji: "📐",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.15)",
  },
  {
    day: 1,
    startRow: 0,
    endRow: 2,
    label: "Physics",
    emoji: "⚛️",
    color: "#ea580c",
    bg: "rgba(234,88,12,0.15)",
  },
  {
    day: 3,
    startRow: 1,
    endRow: 4,
    label: "History",
    emoji: "📜",
    color: "#db2777",
    bg: "rgba(219,39,119,0.15)",
  },
  {
    day: 5,
    startRow: 2,
    endRow: 4,
    label: "Biology",
    emoji: "🧬",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.15)",
  },
  {
    day: 4,
    startRow: 6,
    endRow: 8,
    label: "Chemistry",
    emoji: "🧪",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.15)",
  },
];

const CYCLE_MS = 5000;
const SHOW_AT = 2000;
const POPUP_DURATION = 3000;

function EmptyTable() {
  return (
    <div className={styles.emptyTable}>
      <div className={styles.etCorner} />
      {ET_DAYS.map((day, i) => (
        <div key={`d${i}`} className={styles.etDayLabel}>
          {day}
        </div>
      ))}
      {ET_TIMES.map((time, row) => (
        <>
          <div key={`t${row}`} className={styles.etTimeLabel}>
            {time}
          </div>
          {ET_DAYS.map((_, col) => (
            <div key={`${col}-${row}`} className={styles.etCell} />
          ))}
        </>
      ))}
    </div>
  );
}

function FilledTable() {
  return (
    <div className={styles.filledTableWrap}>
      {/* Grid без margin (обнуляем инлайн-стилем) */}
      <div className={styles.emptyTable} style={{ margin: 0 }}>
        <div className={styles.etCorner} />
        {ET_DAYS.map((day, i) => (
          <div key={`d${i}`} className={styles.etDayLabel}>
            {day}
          </div>
        ))}
        {ET_TIMES.map((time, row) => (
          <>
            <div key={`t${row}`} className={styles.etTimeLabel}>
              {time}
            </div>
            {ET_DAYS.map((_, col) => (
              <div key={`${col}-${row}`} className={styles.etCell} />
            ))}
          </>
        ))}
      </div>

      {TABLE_COURSES.map((c, i) => (
        <div
          key={i}
          className={styles.tableBlock}
          style={{
            left: `calc(1px + 2.8rem + ${c.day} * (100% - 2px - 2.8rem) / 7)`,
            top: `calc(6rem + ${c.startRow} * 2.8rem)`,
            height: `calc(${c.endRow - c.startRow} * 2.9rem - 1px)`,
            width: `calc((100% - 2px - 2.8rem) / 7 - 1px)`,
            background: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${c.color}18 4px, ${c.color}18 7px), ${c.bg}`,
            borderLeft: `2.5px solid ${c.color}`,
          }}
        >
          <span className={styles.tableBlockEmoji}>{c.emoji}</span>
          <span className={styles.tableBlockLabel}>{c.label}</span>
        </div>
      ))}
    </div>
  );
}

function DemoPopup({ visible }: { visible: boolean }) {
  return (
    <div
      className={`${styles.demoPopup} ${visible ? styles.demoPopupVisible : ""}`}
    >
      <div className={styles.demoPopupHeader}>
        <span className={styles.demoPopupTitle}>Add Course</span>
        <span className={styles.demoPopupClose}>
          <X size={16} />
        </span>
      </div>

      <p className={styles.demoPopupLabel}>Select a course</p>

      <div className={styles.demoSearchBar}>
        <Search size={14} className={styles.demoSearchIcon} />
        <span className={styles.demoSearchPlaceholder}>
          Can't find a course? Type the name...
        </span>
      </div>

      <div className={styles.demoChips}>
        {DEMO_COURSES.map((c) => (
          <span
            key={c.label}
            className={styles.demoChip}
            style={{
              background: c.bg,
              color: c.color,
              border: `1px solid ${c.color}`,
            }}
          >
            <span>{c.emoji}</span> {c.label}
          </span>
        ))}
      </div>

      <p className={styles.demoPopupLabel}>Duration</p>

      <div className={styles.demoDurations}>
        {DEMO_DURATIONS.map((d) => (
          <span key={d} className={styles.demoDuration}>
            {d}
          </span>
        ))}
      </div>

      <div className={styles.demoAddBtn}>Add to Schedule</div>
    </div>
  );
}

export default function StepByStepGuide() {
  const { get } = useCopy();
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      showTimer = setTimeout(() => {
        setPopupVisible(true);
        hideTimer = setTimeout(() => setPopupVisible(false), POPUP_DURATION);
      }, SHOW_AT);
    };

    cycle();
    const interval = setInterval(cycle, CYCLE_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="how-it-works" className={styles.section}>
      <SectionHeader
        title={get("home.howItWorks.title")}
        subtitle={get("home.howItWorks.subtitle")}
      />

      <div className={styles.grid}>
        {/* Card 1 */}
        <div className={styles.card}>
          <div className={styles.tag}>
            <GraduationCap size={20} color="blue" />
            <span>{get("home.howItWorks.step1.tag")}</span>
          </div>
          <h3 className={styles.cardTitle}>
            {get("home.howItWorks.step1.main")}
          </h3>
          <div className={styles.placeholder}>
            <EmptyTable />

            {/* Animated cursor */}
            <div className={styles.guideCursor}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path
                  d="M1 1l5.5 16 3-5.5 5.5-3L1 1z"
                  fill="#0d9488"
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.guideCursorLabel}>Aisha</span>
            </div>

            <DemoPopup visible={popupVisible} />
          </div>
          <p className={styles.cardBottom}>
            {get("home.howItWorks.step1.bottom")}
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.tag}>
            <Calendar size={20} color="blue" />
            <span>{get("home.howItWorks.step2.tag")}</span>
          </div>
          <h3 className={styles.cardTitle}>
            {get("home.howItWorks.step2.main")}
          </h3>
          <div className={styles.placeholder}>
            <FilledTable />
          </div>
          <p className={styles.cardBottom}>
            {get("home.howItWorks.step2.bottom")}
          </p>
        </div>
      </div>

      <CTAButton to="/register">{get("home.howItWorks.cta")}</CTAButton>
    </section>
  );
}
