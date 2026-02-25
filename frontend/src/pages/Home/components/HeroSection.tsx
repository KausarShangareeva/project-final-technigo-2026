import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useCopy } from "../../../hooks/useCopy";
import CTAButton from "../../../components/CTAButton";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const { user } = useAuth();
  const { get } = useCopy();

  const phrases = [
    { emoji: "🎯", text: "complete your course." },
    { emoji: "✍️", text: "create a study plan" },
    { emoji: "📄", text: "download your schedule as PDF" },
    { emoji: "🔔", text: "stay on top of your lessons" },
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3500); // Change phrase every 3.5 seconds

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section id="hero" className={styles.heroSection}>
    <div className={styles.wrapper}>
      <div className={styles.badge}>✨ Your Arabic Learning Companion</div>

      <h1 className={styles.mainTitle}>
        Learning Arabic?
        <br />
        Do it systematically
      </h1>

      <h2 className={styles.animatedTitle}>
        We'll help you{" "}
        <span className={styles.changingPhraseWrapper} key={currentPhraseIndex}>
          <span className={styles.phraseEmoji}>
            {phrases[currentPhraseIndex].emoji}
          </span>
          <span className={styles.changingPhrase}>
            {phrases[currentPhraseIndex].text}
          </span>
        </span>
      </h2>

      {/* <p className={styles.subtitle}>{get("home.subtitle")}</p> */}
      {user ? (
        <CTAButton to="/dashboard">{get("home.cta.dashboard")}</CTAButton>
      ) : (
        <CTAButton to="/register">{get("home.cta.register")} ✨</CTAButton>
      )}
    </div>
    </section>
  );
}
