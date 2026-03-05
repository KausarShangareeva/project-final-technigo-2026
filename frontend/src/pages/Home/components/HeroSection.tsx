import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useCopy } from "../../../hooks/useCopy";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CTAButton from "../../../components/CTAButton";
import TagIcon from "../../../components/TagIcon";
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
        <div className={styles.badge}><TagIcon icon="✏️" size={18} /> Your study plan</div>

        <h1 className={styles.mainTitle}>
          Study with a plan,
          <br />
          not by mood
        </h1>

        <h2 className={styles.animatedTitle}>
          We'll help you{" "}
          <span
            className={styles.changingPhraseWrapper}
            key={currentPhraseIndex}
          >
            <span className={styles.phraseEmoji}>
              <TagIcon icon={phrases[currentPhraseIndex].emoji} size={28} />
            </span>
            <span className={styles.changingPhrase}>
              {phrases[currentPhraseIndex].text}
            </span>
          </span>
        </h2>

        <div className={styles.heroActions}>
          {user ? (
            <CTAButton to="/workspace">{get("home.cta.dashboard")}</CTAButton>
          ) : (
            <CTAButton to="/register">{get("home.cta.register")} ✨</CTAButton>
          )}
          <Link to="#screen-preview" className={styles.exploreBtn}>
            Explore
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
