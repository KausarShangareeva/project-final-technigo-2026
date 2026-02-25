import { useCopy } from "../../../hooks/useCopy";
import SectionHeader from "../../../components/SectionHeader";
import CTAButton from "../../../components/CTAButton";
import {
  TrendingUp,
  CheckCircle,
  Calendar,
  MessageCircle,
  Download,
  Zap,
  ArrowLeftRight,
  FileText,
  Trash2,
  Printer,
} from "lucide-react";

import styles from "./FeaturesSection.module.css";

const HIGHLIGHTED_COURSES = [
  {
    name: "Math",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
    icon: "📘",
    rows: 3,
  },
  {
    name: "English",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    icon: "📒",
    rows: 5,
  },
  {
    name: "History",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    icon: "📕",
    rows: 4,
  },
];

function HighlightedCourses() {
  return (
    <div className={styles.courseBricks}>
      {HIGHLIGHTED_COURSES.map((course) => (
        <div key={course.name} className={styles.courseColumn}>
          {Array.from({ length: course.rows }).map((_, i) => (
            <div
              key={i}
              className={styles.courseBrick}
              style={{
                background: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${course.color}10 4px, ${course.color}10 7px), ${course.bg}`,
                borderLeft: `3px solid ${course.color}`,
              }}
            >
              {i === 0 && (
                <>
                  <span className={styles.courseBrickIcon}>{course.icon}</span>
                  <span className={styles.courseBrickName}>{course.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const MINI_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MINI_ROWS = 9; // 08:00–16:00

const MINI_SCHEDULE: Record<string, string> = {
  "0-1": "#6366f1",
  "0-2": "#6366f1", // Mon: Math
  "1-0": "#f59e0b",
  "1-1": "#f59e0b", // Tue: Physics
  "2-3": "#22c55e",
  "2-4": "#22c55e", // Wed: Literature
  "3-1": "#ec4899",
  "3-2": "#ec4899",
  "3-3": "#ec4899", // Thu: History
  "4-6": "#a855f7",
  "4-7": "#a855f7", // Fri: Chemistry
  "5-2": "#0ea5e9",
  "5-3": "#0ea5e9", // Sat: Biology
  "6-5": "#f97316",
  "6-6": "#f97316", // Sun: English
};

function MiniSchedule() {
  return (
    <div className={styles.miniSchedule}>
      {/* Corner */}
      <div className={styles.miniCorner} />
      {/* Day headers */}
      {MINI_DAYS.map((day, i) => (
        <div key={`d${i}`} className={styles.miniDayLabel}>
          {day}
        </div>
      ))}
      {/* Rows */}
      {Array.from({ length: MINI_ROWS }).map((_, row) => (
        <>
          <div key={`t${row}`} className={styles.miniTimeLabel}>
            {String(8 + row).padStart(2, "0")}
          </div>
          {MINI_DAYS.map((_, col) => {
            const color = MINI_SCHEDULE[`${col}-${row}`];
            return (
              <div
                key={`${col}-${row}`}
                className={styles.miniCell}
                style={
                  color
                    ? {
                        background: `repeating-linear-gradient(-45deg, transparent, transparent 3px, ${color}15 3px, ${color}15 5px), ${color}18`,
                        borderLeft: `2px solid ${color}`,
                      }
                    : undefined
                }
              />
            );
          })}
        </>
      ))}
    </div>
  );
}

function PDFFormat() {
  return (
    <div className={styles.pdfWrap}>
      {/* Landscape */}
      <div className={`${styles.pdfPage} ${styles.pdfLandscape}`}>
        <div className={styles.pdfImgPlaceholder}>
          <FileText size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.pdfLines}>
          <div className={styles.pdfLine} style={{ width: "80%" }} />
          <div className={styles.pdfLine} style={{ width: "60%" }} />
        </div>
        <div className={styles.pdfBtn} />
      </div>

      {/* Swap icon */}
      <div className={styles.pdfSwap}>
        <ArrowLeftRight size={18} strokeWidth={2} />
      </div>

      {/* Portrait */}
      <div className={`${styles.pdfPage} ${styles.pdfPortrait}`}>
        <div className={styles.pdfImgPlaceholder}>
          <FileText size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.pdfLines}>
          <div className={styles.pdfLine} style={{ width: "75%" }} />
          <div className={styles.pdfLine} style={{ width: "50%" }} />
        </div>
        <div className={styles.pdfBtn} />
      </div>
    </div>
  );
}

function DownloadPDF() {
  return (
    <div className={styles.dlWrap}>
      <div className={styles.dlBox}>
        {/* PDF file icon */}
        <div className={styles.dlFile}>
          <div className={styles.dlFileCorner} />
          <div className={styles.dlFileBadge}>PDF</div>
        </div>

        {/* Spinner (loading phase) */}
        <svg className={styles.dlSpinner} viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" strokeWidth="3" />
        </svg>

        {/* Checkmark (done phase) */}
        <div className={styles.dlCheck}>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r="10" fill="#22c55e" />
            <polyline
              points="6,11 9.5,14.5 16,8"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className={styles.dlBtnWrap}>
        <button className={styles.dlBtn}>
          <Printer size={15} strokeWidth={2.5} />
          Print PDF
        </button>

        {/* Cursor with username */}
        <div className={styles.dlCursor}>
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path
              d="M1 1l5.5 16 3-5.5 5.5-3L1 1z"
              fill="#5b21b6"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.dlCursorLabel}>Michael</span>
        </div>
      </div>
    </div>
  );
}

function SavedPlans() {
  return (
    <div className={styles.savedStack}>
      {/* Back cards for stack effect */}
      <div className={`${styles.savedCard} ${styles.savedCardBack2}`} />
      <div className={`${styles.savedCard} ${styles.savedCardBack1}`} />

      {/* Front card */}
      <div className={`${styles.savedCard} ${styles.savedCardFront}`}>
        <div className={styles.savedCardTop}>
          <div className={styles.savedCardIcon}>
            <FileText size={20} strokeWidth={2} />
          </div>
          <button className={styles.savedCardTrash} aria-label="Delete">
            <Trash2 size={18} strokeWidth={1.8} />
          </button>
        </div>
        <div className={styles.savedCardTitle}>Week of Feb 25</div>
        <div className={styles.savedCardDesc}>
          3 sessions this week <br />
          Wed – Fri <br />4 study hours
        </div>
        <button className={styles.savedCardOpen}>Open</button>
      </div>
    </div>
  );
}

const featureIcons = [
  TrendingUp,
  CheckCircle,
  Calendar,
  MessageCircle,
  Download,
  Zap,
];

export default function FeaturesSection() {
  const { getArray, get } = useCopy();
  const features = getArray("home.features.items");

  return (
    <section id="features" className={styles.features}>
      <SectionHeader
        title={get("home.features.title")}
        subtitle={get("home.features.subtitle")}
      />
      <div className={styles.cardGrid}>
        {features.map((feature, index) => {
          const Icon = featureIcons[index];
          return (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
              </div>
              <div className={styles.cardBody}>
                {index === 0 ? (
                  <HighlightedCourses />
                ) : index === 1 ? (
                  <MiniSchedule />
                ) : index === 2 ? (
                  <PDFFormat />
                ) : index === 3 ? (
                  <DownloadPDF />
                ) : index === 4 ? (
                  <SavedPlans />
                ) : (
                  <span className={styles.comingSoon}>coming soon</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CTAButton to="/register">Get Started Free</CTAButton>
    </section>
  );
}
