import { useState, useRef, useEffect, type FormEvent } from "react";
import { Lightbulb, Rocket, Sparkles, ChevronDown } from "lucide-react";
import TagIcon from "../components/TagIcon";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import type { SuggestionPayload } from "../api/types";
import CTAButton from "../components/CTAButton";
import styles from "./SuggestProject.module.css";

const PROJECT_TYPES = [
  { value: "Work project", emoji: "💼" },
  { value: "Study project", emoji: "📚" },
  { value: "Personal project", emoji: "👤" },
  { value: "Client project", emoji: "🤝" },
  { value: "Other", emoji: "✏️" },
];

const initialForm: SuggestionPayload = {
  name: "",
  email: "",
  projectType: "",
  title: "",
  details: "",
};

export default function SuggestProject() {
  const { user } = useAuth();
  const [form, setForm] = useState<SuggestionPayload>({
    ...initialForm,
    name: user?.name || "",
    email: user?.email || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
    }));
  }, [user]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name) { setError("Please enter your name"); return; }
    if (!form.email) { setError("Please enter your email"); return; }
    if (!form.projectType) { setError("Please select a project type"); return; }
    if (!form.title) { setError("Please enter a project title"); return; }
    if (!form.details) { setError("Please enter project details"); return; }

    setSubmitting(true);

    try {
      await api.post("/suggestions", form);
      setSuccess("Your idea has been sent. Thank you.");
      setForm({
        ...initialForm,
        name: user?.name || "",
        email: user?.email || "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send suggestion");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.badge}><TagIcon icon="💡" size={18} /> Community ideas</div>
        <h2 className={styles.heroTitle}>
          Shape the future of <span className={styles.brand}>PlanFlow</span>
        </h2>
        <p className={styles.heroSubtitle}>
          Tell us what tool, feature, or workflow would genuinely help your learning.
        </p>
        <CTAButton
          onClick={() =>
            document.querySelector("form")?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          Share your idea
        </CTAButton>
      </header>

      <div className={styles.layout}>
        <aside className={styles.benefits}>
          <h2>What to include</h2>
          <ul>
            <li>
              <Lightbulb size={16} />
              The concrete problem you want to solve
            </li>
            <li>
              <Rocket size={16} />
              A realistic scope for the first version
            </li>
            <li>
              <Sparkles size={16} />
              Why this helps learners stay consistent
            </li>
          </ul>
        </aside>

        <form onSubmit={onSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <div className={styles.formSection}>
            <div className={styles.grid}>
              <label>
                Your name *
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </label>

              <label>
                Email *
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.grid}>
              <div className={styles.dropdownWrapper}>
                <span className={styles.dropdownLabel}>Project type *</span>
                <div className={styles.dropdown} ref={typeRef}>
                  <button
                    type="button"
                    className={`${styles.dropdownTrigger} ${!form.projectType ? styles.dropdownPlaceholder : ""}`}
                    onClick={() => setTypeOpen((o) => !o)}
                  >
                    {form.projectType ? (
                      <>
                        <TagIcon icon={PROJECT_TYPES.find((t) => t.value === form.projectType)!.emoji} size={16} />
                        {form.projectType}
                      </>
                    ) : (
                      "Choose type"
                    )}
                    <ChevronDown size={16} className={`${styles.dropdownChevron} ${typeOpen ? styles.dropdownChevronOpen : ""}`} />
                  </button>
                  {typeOpen && (
                    <ul className={styles.dropdownList}>
                      {PROJECT_TYPES.map((t) => (
                        <li key={t.value}>
                          <button
                            type="button"
                            className={`${styles.dropdownItem} ${form.projectType === t.value ? styles.dropdownItemActive : ""}`}
                            onClick={() => { setForm((prev) => ({ ...prev, projectType: t.value })); setTypeOpen(false); }}
                          >
                            <TagIcon icon={t.emoji} size={16} />
                            {t.value}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <label>
                Project title *
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </label>
            </div>

          </div>

          <div className={styles.formSection}>
            <label>
              Project details *
              <textarea
                value={form.details}
                onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                placeholder="Describe the flow, expected behavior, and why it matters."
                rows={7}
                required
              />
            </label>
          </div>

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? "Sending..." : "Send project idea"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

