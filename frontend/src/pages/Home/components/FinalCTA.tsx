import SectionHeader from "../../../components/SectionHeader";
import CTAButton from "../../../components/CTAButton";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section id="cta" className={styles.section}>
      <SectionHeader
        title="Sounds great? 😊"
        subtitle="Try it yourself - it's really simple"
      />
      <div className={styles.card}>
        <div className={styles.illustration}>
          <span className={styles.placeholderText}>
            Image coming soon
          </span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>Start Planning</h3>
          <p className={styles.description}>
            Create your study plan from scratch in just a few minutes and work
            towards your goal systematically.
          </p>
          <CTAButton to="/register">Learn More</CTAButton>
        </div>
      </div>
    </section>
  );
}
