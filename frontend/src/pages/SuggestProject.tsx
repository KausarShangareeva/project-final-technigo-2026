import { useState, useEffect, useRef } from "react";
import TagIcon from "../components/TagIcon";
import { useAuth } from "../context/AuthContext";
import { ChevronLeft, Sparkles } from "lucide-react";
import { api } from "../api/client";
import styles from "./SuggestProject.module.css";

const TOPICS = [
  { value: "AI", emoji: "🤖" },
  { value: "Education", emoji: "📚" },
  { value: "Business", emoji: "💼" },
  { value: "Personal Site", emoji: "🌱" },
  { value: "Gaming", emoji: "🎮" },
];

const STATS = [
  {
    value: "6+ Years in UI Design",
    label: "UI/UX design in Figma",
    icon: "🎨",
    colorClass: "statBlue",
  },
  {
    value: "Full-Stack Developer",
    label: "React.js • Node.js • Modern Web Apps",
    icon: "💻",
    colorClass: "statYellow",
  },
  {
    value: "Open to new projects",
    label: "Looking for interesting ideas to build",
    icon: "🚀",
    colorClass: "statGreen",
  },
];

const TIMELINES = [
  { value: "Urgent", label: "1–2 weeks", badge: "Urgent" },
  { value: "Fast", label: "2–3 weeks" },
  { value: "Flexible", label: "1–2 months" },
  { value: "No rush", label: "No Date Yet" },
];

const TOPIC_TAGS: Record<string, string[]> = {
  AI: [
    "AI Chatbot",
    "AI Assistant",
    "AI Content Generator",
    "AI Automation",
    "AI Image Tool",
    "AI SaaS",
    "AI API Integration",
    "AI Productivity Tool",
  ],
  Education: [
    "Language Learning",
    "Online Courses",
    "Learning Platform",
    "Study Planner",
    "Education App",
    "Course Website",
  ],
  Business: [
    "Company Website",
    "SaaS Platform",
    "Marketplace",
    "CRM / Dashboard",
    "Booking System",
    "Online Service",
    "Startup MVP",
    "Admin Panel",
  ],
  "Personal Site": [
    "Portfolio Website",
    "Personal Blog",
    "Resume / CV Site",
    "Personal Brand",
    "Landing Page",
    "Personal Dashboard",
  ],
  Gaming: [
    "Browser Game",
    "Multiplayer Game",
    "Game Landing Page",
    "Game Community",
    "Leaderboard System",
    "Game Dashboard",
  ],
};

const TOTAL_STEPS = 5;

export default function SuggestProject() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [timeline, setTimeline] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [name, setName] = useState(user?.name.split(" ")[0] ?? "");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function handleSubmit() {
    setIsSubmitting(true);
    setProgress(0);

    // Start visual progress bar
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          clearInterval(intervalRef.current!);
          return 95;
        }
        return p + 1;
      });
    }, 30);

    try {
      await api.post("/suggestions", {
        name,
        email: contact,
        projectType: topic,
        title: selectedTags.join(", ") || topic,
        details: `Timeline: ${timeline}\nContact: ${contact}\nTags: ${selectedTags.join(", ")}`,
      });
    } catch {
      // notification still shows even if request fails silently
    } finally {
      clearInterval(intervalRef.current!);
      setProgress(100);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 600);
    }
  }

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    [],
  );

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.badge}>
          <TagIcon icon="💡" size={18} /> Community ideas
        </div>
        <p className={styles.heroMention}>
          {user ? (
            <>
              Hi,{" "}
              <span className={styles.brand}>{user.name.split(" ")[0]}</span>{" "}
              <TagIcon icon="👋" size={20} />
              <TagIcon icon="😁" size={20} />
            </>
          ) : (
            <>
              Hello there <TagIcon icon="👋" size={20} />
            </>
          )}
        </p>
        <h2 className={styles.heroTitle}>
          Got an idea for a <br />
          <span className={styles.brand}>new project?</span>
        </h2>
        <p className={styles.heroSubtitle}>
          {user ? "I'd love to hear them!" : "Share it with us!"}
        </p>
      </header>

      <div className={styles.cardCenter}>
        <div className={styles.surveyCard}>
          {/* Loading screen */}
          {isSubmitting && (
            <div className={styles.loadingScreen}>
              <div className={styles.loadingIconWrap}>
                <Sparkles size={32} strokeWidth={1.5} />
              </div>
              <h3 className={styles.loadingTitle}>
                {name ? (
                  <>
                    <span className={styles.brand}>{name}</span>, your project
                    idea looks great 🙂
                  </>
                ) : (
                  "Your project idea looks great 🙂"
                )}
              </h3>

              <div className={styles.progressTrackBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressPct}>{progress}%</span>
            </div>
          )}

          {/* Success screen */}
          {isSuccess && (
            <div className={styles.loadingScreen}>
              <div className={styles.successIconWrap}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className={styles.loadingTitle}>Got it! 🎉</h3>
              <p className={styles.loadingSub}>
                I'll review your request and get back to you soon
              </p>
            </div>
          )}

          {/* Survey steps */}
          {!isSubmitting && !isSuccess && (
            <>
              {/* Progress + back */}
              <div className={styles.surveyTop}>
                {step > 1 && (
                  <button
                    className={styles.backBtn}
                    onClick={() => setStep((s) => s - 1)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div className={styles.progressTrack}>
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.progressDot} ${i < step ? styles.progressDotActive : ""}`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1 — topic */}
              {step === 1 && (
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>
                    What topic interests you?
                  </h3>
                  <p className={styles.stepSub}>Choose your main interest</p>
                  <ul className={styles.optionList}>
                    {TOPICS.map((t) => (
                      <li key={t.value}>
                        <button
                          className={`${styles.optionBtn} ${topic === t.value ? styles.optionBtnActive : ""}`}
                          onClick={() => {
                            setTopic(t.value);
                            setTimeout(() => setStep(2), 180);
                          }}
                        >
                          <span className={styles.optionIcon}>
                            <TagIcon icon={t.emoji} size={20} />
                          </span>
                          <span className={styles.optionLabel}>{t.value}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step 2 — You're in the right place */}
              {step === 2 && (
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>
                    You're in the right place
                  </h3>
                  <div className={styles.statList}>
                    {STATS.map((s) => (
                      <div
                        key={s.value}
                        className={`${styles.statCard} ${styles[s.colorClass]}`}
                      >
                        <span className={styles.flex}>
                          <TagIcon icon={s.icon} size={20} />
                          <strong className={styles.statValue}>
                            {s.value}
                          </strong>
                        </span>
                        <p className={styles.statLabel}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    className={styles.continueBtn}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 3 — Timeline */}
              {step === 3 && (
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>
                    When do you need the project ready?
                  </h3>
                  <p className={styles.stepSub}>Choose your timeline</p>
                  <ul className={styles.optionList}>
                    {TIMELINES.map((t) => (
                      <li key={t.value}>
                        <button
                          className={`${styles.optionBtn} ${styles.timelineBtn} ${timeline === t.value ? styles.optionBtnActive : ""}`}
                          onClick={() => {
                            setTimeline(t.value);
                            setTimeout(() => setStep(4), 180);
                          }}
                        >
                          <span className={styles.optionLabel}>
                            {t.value}
                            <span className={styles.optionSub}>{t.label}</span>
                          </span>
                          {t.badge && (
                            <span className={styles.urgentBadge}>
                              {t.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step 4 — Tags */}
              {step === 4 && (
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>
                    What is your project about?
                  </h3>
                  <p className={styles.stepSub}>You can select a few topics</p>
                  <div className={styles.tagGrid}>
                    {(TOPIC_TAGS[topic] ?? []).map((tag) => (
                      <button
                        key={tag}
                        className={`${styles.tagPill} ${selectedTags.includes(tag) ? styles.tagPillActive : ""}`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <button
                    className={styles.continueBtn}
                    style={{ marginTop: "var(--space-xl)" }}
                    disabled={selectedTags.length === 0}
                    onClick={() => setStep(5)}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 5 — Contact */}
              {step === 5 && (
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>Almost there!</h3>
                  <p className={styles.stepSub}>Tell me how to reach you</p>
                  <div className={styles.contactForm}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel} htmlFor="sp-name">
                        Your name
                      </label>
                      <input
                        id="sp-name"
                        type="text"
                        className={styles.fieldInput}
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel} htmlFor="sp-contact">
                        Email or Telegram
                      </label>
                      <input
                        id="sp-contact"
                        type="text"
                        className={styles.fieldInput}
                        placeholder="email@example.com or @username"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    <button
                      className={styles.submitIdeaBtn}
                      disabled={!name.trim() || !contact.trim()}
                      onClick={handleSubmit}
                    >
                      Let's bring your idea to life 🚀
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
