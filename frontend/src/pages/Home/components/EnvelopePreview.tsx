import SectionHeader from "../../../components/SectionHeader";
import styles from "./EnvelopePreview.module.css";

export default function EnvelopePreview() {
  return (
    <section id="envelope" className={styles.previewSection}>
      <SectionHeader
        title="Ready lesson schedule with dates"
        subtitle="Plan, schedule and deadline — all in one place"
        titleWidth="60%"
      />

      <div className={styles.envelopeWrapper}>
        <div className={styles.envelope}>
          {/* Front base of envelope */}
          <div className={styles.coverLeft} />
          <div className={styles.coverRight} />

          {/* Cards inside */}
          <div className={`${styles.card} ${styles.cardLeft}`}>
            <img src="/example-1.png" alt="Schedule example 1" className={styles.cardImg} />
          </div>
          <div className={`${styles.card} ${styles.cardRight}`}>
            <img src="/example-2.png" alt="Schedule example 2" className={styles.cardImg} />
          </div>

          {/* Central placeholder */}
          <div className={styles.placeholder} />

          {/* Back flap of envelope */}
          <div className={styles.flap} />
        </div>
      </div>
    </section>
  );
}
