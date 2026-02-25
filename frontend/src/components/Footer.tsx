import { useCopy } from "../hooks/useCopy";
import Logo from "./Logo";
import {
  MessageCircle,
  GithubIcon,
  Coffee,
  Sparkles,
  MessagesSquare,
} from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const { get } = useCopy();

  return (
    <footer className={styles.footer}>
      {/* Main columns */}
      <div className={styles.main}>
        <div className={styles.brand}>
          <Logo size="medium" />
          <p className={styles.tagline}>{get("app.tagline")}</p>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{get("footer.quickLinks")}</h4>
            <nav className={styles.links}>
              <a href="#hero">Home</a>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#envelope">Envelope</a>
              <a href="#pdf-export">PDF Export</a>
              <a href="#notifications">Notifications</a>
            </nav>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{get("footer.connect")}</h4>
            <nav className={styles.links}>
              <a
                href="https://t.me/kausarsh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={15} />
                Message the Author
              </a>
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee size={15} />
                Buy Me a Coffee
              </a>
              <a
                href="https://t.me/kausarsh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Sparkles size={15} />
                Suggest a Project
              </a>
              <a
                href="https://t.me/kausarsh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessagesSquare size={15} />
                Leave Feedback
              </a>
              <a
                href="https://github.com/KausarShangareeva/qalamflow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Divider with centered logo */}
      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerIcon}>Q</span>
        <span className={styles.dividerLine} />
      </div>

      {/* Quote */}
      <div className={styles.quote}>
        <p className={styles.quoteText}>
          &ldquo;{get("home.testimonial.quote")}&rdquo;
        </p>
        <span className={styles.quoteAuthor}>
          &mdash; {get("home.testimonial.author")}
        </span>
      </div>

      <p className={styles.madeWith}>Made with 🧠</p>
    </footer>
  );
}
