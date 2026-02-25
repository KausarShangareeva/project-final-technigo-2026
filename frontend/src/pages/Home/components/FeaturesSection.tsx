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
} from "lucide-react";

import styles from "./FeaturesSection.module.css";

const HIGHLIGHTED_COURSES = [
  { name: "Math", color: "#6366f1", bg: "rgba(99,102,241,0.12)", icon: "📘", rows: 3 },
  { name: "English", color: "#f97316", bg: "rgba(249,115,22,0.12)", icon: "📒", rows: 5 },
  { name: "History", color: "#ec4899", bg: "rgba(236,72,153,0.12)", icon: "📕", rows: 4 },
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
  "0-1": "#6366f1", "0-2": "#6366f1",           // Mon: Math
  "1-0": "#f59e0b", "1-1": "#f59e0b",           // Tue: Physics
  "2-3": "#22c55e", "2-4": "#22c55e",           // Wed: Literature
  "3-1": "#ec4899", "3-2": "#ec4899", "3-3": "#ec4899", // Thu: History
  "4-6": "#a855f7", "4-7": "#a855f7",           // Fri: Chemistry
  "5-2": "#0ea5e9", "5-3": "#0ea5e9",           // Sat: Biology
  "6-5": "#f97316", "6-6": "#f97316",           // Sun: English
};

function MiniSchedule() {
  return (
    <div className={styles.miniSchedule}>
      {/* Corner */}
      <div className={styles.miniCorner} />
      {/* Day headers */}
      {MINI_DAYS.map((day, i) => (
        <div key={`d${i}`} className={styles.miniDayLabel}>{day}</div>
      ))}
      {/* Rows */}
      {Array.from({ length: MINI_ROWS }).map((_, row) => (
        <>
          <div key={`t${row}`} className={styles.miniTimeLabel}>{String(8 + row).padStart(2, "0")}</div>
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
