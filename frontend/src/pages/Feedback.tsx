import { useEffect, useMemo, useState, type FormEvent } from "react";
import { MapPin, MessageSquareQuote, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import CTAButton from "../components/CTAButton";
import type { FeedbackEntry, FeedbackPayload } from "../api/types";
import styles from "./Feedback.module.css";

const initialForm: FeedbackPayload = {
  name: "",
  email: "",
  rating: 5,
  message: "",
  location: "",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getReactionTag(rating: number): {
  label: string;
  emoji: string;
  className: string;
} {
  if (rating >= 5) {
    return { label: "Love it!", emoji: "😍", className: "tagLove" };
  }
  if (rating >= 3) {
    return { label: "Decent", emoji: "🙂", className: "tagDecent" };
  }
  return { label: "Bad", emoji: "😔", className: "tagBad" };
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "G";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase();
}

export default function FeedbackPage() {
  const { user } = useAuth();
  const isAuthed = Boolean(user);
  const [form, setForm] = useState<FeedbackPayload>({
    ...initialForm,
    name: user?.name || "",
    email: user?.email || "",
  });
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const reactionOptions = [
    {
      value: 1,
      emoji: "😔",
      label: "Bad",
      typeClass: styles.reactionTypeBad,
      activeClass: styles.reactionActiveBad,
    },
    {
      value: 3,
      emoji: "🙂",
      label: "Decent",
      typeClass: styles.reactionTypeDecent,
      activeClass: styles.reactionActiveDecent,
    },
    {
      value: 5,
      emoji: "😍",
      label: "Love it!",
      typeClass: styles.reactionTypeLove,
      activeClass: styles.reactionActiveLove,
    },
  ];

  const averageRating = useMemo(() => {
    if (!feedbackList.length) return 0;
    const total = feedbackList.reduce((sum, item) => sum + item.rating, 0);
    return total / feedbackList.length;
  }, [feedbackList]);
  const displayName = (user?.name || form.name || "Guest").trim();
  const avatarText = getInitials(displayName);

  useEffect(() => {
    api
      .get<FeedbackEntry[]>("/feedback")
      .then((data) => setFeedbackList(data))
      .catch(() => setFeedbackList([]))
      .finally(() => setLoadingList(false));
  }, []);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
      location: prev.location || "",
    }));
  }, [user]);

  const onDelete = async (id: string) => {
    try {
      await api.delete(`/feedback/${id}`);
      setFeedbackList((prev) => prev.filter((e) => e._id !== id));
    } catch {
      // silent
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload: FeedbackPayload = {
        ...form,
        name: user?.name || form.name,
        email: user?.email || form.email,
      };
      const created = await api.post<FeedbackEntry>("/feedback", payload);
      setFeedbackList((prev) => [created, ...prev]);
      setForm({
        ...initialForm,
        name: user?.name || "",
        email: user?.email || "",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit feedback",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.badge}>⭐ Student reviews</div>
        <h2 className={styles.heroTitle}>
          Real experiences from <span className={styles.brand}>QalamFlow</span>{" "}
          users
        </h2>
        <p className={styles.heroSubtitle}>Tried it already?</p>

        <CTAButton
          onClick={() =>
            document
              .querySelector("form")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          Share your experience
        </CTAButton>
      </header>

      <aside className={styles.feed}>
        {loadingList && <p className={styles.empty}>Loading feedback...</p>}
        {!loadingList && !feedbackList.length && (
          <p className={styles.empty}>No feedback yet. Be the first one.</p>
        )}

        <div className={styles.list}>
          {feedbackList.map((entry) => {
            const reaction = getReactionTag(entry.rating);
            return (
              <article key={entry._id} className={styles.card}>
                <div className={styles.cardAvatar}>
                  {getInitials(entry.name)}
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <div className={styles.cardInfo}>
                      <strong className={styles.cardName}>{entry.name}</strong>
                      <span className={styles.cardDate}>{formatDate(entry.createdAt)}</span>
                    </div>
                    <span className={`${styles.reactionTag} ${styles[reaction.className]}`}>
                      {reaction.emoji} {reaction.label}
                    </span>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => onDelete(entry._id)}
                      aria-label="Delete feedback"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className={styles.cardMessage}>{entry.message}</p>
                </div>
              </article>
            );
          })}
        </div>
      </aside>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.authorCard}>
          <div className={styles.authorMain}>
            <div className={styles.avatar}>{avatarText}</div>
            <div className={styles.authorMeta}>
              <div className={styles.authorNameRow}>
                <h2>{displayName}</h2>
                <span className={styles.authorDate}>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date())}
                </span>
              </div>
              <p className={styles.locationText}>
                <MapPin size={14} />
                Студентка
              </p>
            </div>
          </div>

          <div className={styles.authorActions}>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() =>
                setForm({
                  ...initialForm,
                  name: user?.name || "",
                  email: user?.email || "",
                })
              }
              aria-label="Clear form"
            >
              <Trash2 size={15} />
            </button>
            <p className={styles.rateTitle}>Rate your experience</p>
            <div className={styles.reactionGroup}>
              {reactionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, rating: option.value }))
                  }
                  className={`${styles.reactionButton} ${option.typeClass} ${form.rating === option.value ? option.activeClass : ""}`}
                >
                  <span>{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}

        {!isAuthed && (
          <div className={styles.row}>
            <label>
              Name *
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </label>
            <label>
              Email *
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </label>
          </div>
        )}

        <label className={styles.message}>
          <textarea
            className={styles.messageArea}
            value={form.message}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={6}
            placeholder="Share your thoughts..."
            required
          />
        </label>

        <div className={styles.submitRow}>
          <button className={styles.submit} type="submit" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish feedback"}
          </button>
        </div>
      </form>
    </section>
  );
}
