import { useCopy } from "../../../hooks/useCopy";
import { Calendar, UserRound } from "lucide-react";
import CTAButton from "../../../components/CTAButton";
import styles from "./StepByStepGuide.module.css";

const ET_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const ET_TIMES = ["08", "09", "10", "11", "12", "13", "14", "15", "16"];

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

export default function StepByStepGuide() {
  const { get } = useCopy();

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{get("home.howItWorks.title")}</h2>
        <p className={styles.subtitle}>{get("home.howItWorks.subtitle")}</p>
      </div>

      <div className={styles.grid}>
        {/* Card 1 */}
        <div className={styles.card}>
          <div className={styles.tag}>
            <UserRound size={20} color="blue" />
            <span>{get("home.howItWorks.step1.tag")}</span>
          </div>
          <h3 className={styles.cardTitle}>
            {get("home.howItWorks.step1.main")}
          </h3>
          <div className={styles.placeholder}>
            <EmptyTable />
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
            <span className={styles.placeholderText}>Image coming soon</span>
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
