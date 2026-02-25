import { CircleStar, Bell } from "lucide-react";
import SectionHeader from "../../../components/SectionHeader";
import CTAButton from "../../../components/CTAButton";
import styles from "./Features.module.css";

export default function Features() {
  return (
    <section id="notifications" className={styles.section}>
      <SectionHeader
        title="Get notifications and track your progress"
        titleWidth="90%"
        subtitle="Visualize your success in percentages"
      />

      <div className={styles.grid}>
        {/* Card 1 */}
        <div className={styles.card}>
          <div className={styles.tag}>
            <Bell size={20} color="blue" />
            <span>Reminders</span>
          </div>
          <h3 className={styles.cardTitle}>
            Get lesson reminders 15 minutes before and stay motivated
          </h3>
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>
              Image coming soon
            </span>
          </div>
          <p className={styles.cardBottom}>
            Choose a course, set your dates — and get a ready lesson schedule
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.tag}>
            <CircleStar size={20} color="blue" />
            <span>Progress</span>
          </div>
          <h3 className={styles.cardTitle}>
            Mark completed lessons and track your achievements
          </h3>
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>
              Image coming soon
            </span>
          </div>
          <p className={styles.cardBottom}>
            Visual stats and reminders will help you stay on track
          </p>
        </div>
      </div>

      <CTAButton to="/register">Start Planning</CTAButton>
    </section>
  );
}
