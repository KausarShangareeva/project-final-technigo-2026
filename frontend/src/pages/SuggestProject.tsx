import { useState, type FormEvent } from "react";
import { Lightbulb, Rocket, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import type { SuggestionPayload } from "../api/types";
import CTAButton from "../components/CTAButton";
import styles from "./SuggestProject.module.css";

const initialForm: SuggestionPayload = {
  name: "",
  email: "",
  projectType: "",
  title: "",
  goal: "",
  details: "",
  timeline: "",
  budget: "",
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

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
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
        <div className={styles.badge}>💡 Community ideas</div>
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
              <label>
                Project type *
                <select
                  value={form.projectType}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, projectType: e.target.value }))
                  }
                  required
                >
                  <option value="">Choose type</option>
                  <option value="Feature">Feature</option>
                  <option value="Integration">Integration</option>
                  <option value="Template">Template</option>
                  <option value="Automation">Automation</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Project title *
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </label>
            </div>

            <label>
              Main goal *
              <input
                value={form.goal}
                onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))}
                placeholder="One sentence outcome"
                required
              />
            </label>
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

          <div className={styles.formSection}>
            <div className={styles.grid}>
              <label>
                Preferred timeline
                <input
                  value={form.timeline}
                  onChange={(e) => setForm((prev) => ({ ...prev, timeline: e.target.value }))}
                  placeholder="e.g. 2-4 weeks"
                />
              </label>

              <label>
                Budget range
                <input
                  value={form.budget}
                  onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
                  placeholder="Optional"
                />
              </label>
            </div>
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

