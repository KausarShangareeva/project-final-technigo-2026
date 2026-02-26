import { useCopy } from "../hooks/useCopy";
import Logo from "./Logo";
import {
  MessageCircle,
  GithubIcon,
  LinkedinIcon,
  Coffee,
  Sparkles,
  MessagesSquare,
  ClipboardList,
  GraduationCap,
  Heart,
  Users,
  BookMarked,
  Baby,
  Lightbulb,
  Key,
  Shirt,
  Library,
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

          <a
            href="https://t.me/kausar_coding"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.authorCard}
          >
            <div className={styles.avatarWrapper}>
              <img
                src="/avatar.png"
                alt="Kausar"
                className={styles.authorAvatar}
              />
              <img
                src="/telegram.svg"
                alt="Telegram"
                className={styles.avatarBadge}
              />
            </div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>Kausar</span>
              <span className={styles.authorEmail}>kausyarsh@gmail.com</span>
            </div>
          </a>
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
                href="https://t.me/kausar_coding"
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
                href="https://t.me/kausar_coding"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Sparkles size={15} />
                Suggest a Project
              </a>
              <a
                href="https://t.me/kausar_coding"
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
              <a
                href="https://linkedin.com/in/kausar-shangareeva-312a8b27a"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={15} />
                LinkedIn
              </a>
            </nav>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Projects</h4>
            <nav className={styles.links}>
              <span className={styles.projectItem}>
                <ClipboardList size={15} style={{ color: "#22c55e" }} />
                <span className={styles.projectName}>DeenPlanner</span>
                <span className={styles.projectDesc}>– Student checklists</span>
              </span>
              <span className={styles.projectItem}>
                <GraduationCap size={15} style={{ color: "#3b82f6" }} />
                <span className={styles.projectName}>UstazFlow</span>
                <span className={styles.projectDesc}>
                  – Teacher’s daily tracker
                </span>
              </span>
              <span className={styles.projectItem}>
                <Heart size={15} style={{ color: "#f43f5e" }} />
                <span className={styles.projectName}>UmmaFlow</span>
                <span className={styles.projectDesc}>
                  – Mom’s daily tracker
                </span>
              </span>
              <span className={styles.projectItem}>
                <Users size={15} style={{ color: "#a855f7" }} />
                <span className={styles.projectName}>UsraFlow</span>
                <span className={styles.projectDesc}>
                  – Family daily tracker
                </span>
              </span>
              <span className={styles.projectItem}>
                <BookMarked size={15} style={{ color: "#14b8a6" }} />
                <span className={styles.projectName}>HifzFlow</span>
                <span className={styles.projectDesc}>
                  – Quran memorization tracker
                </span>
              </span>
              <span className={styles.projectItem}>
                <Baby size={15} style={{ color: "#f59e0b" }} />
                <span className={styles.projectName}>LittleUmmah</span>
                <span className={styles.projectDesc}>
                  – Stories for children
                </span>
              </span>
              <span className={styles.projectItem}>
                <Lightbulb size={15} style={{ color: "#f97316" }} />
                <span className={styles.projectName}>NoorRoom</span>
                <span className={styles.projectDesc}>
                  – Your Arabic learning space
                </span>
              </span>
              <span className={styles.projectItem}>
                <Key size={15} style={{ color: "#06b6d4" }} />
                <span className={styles.projectName}>Madrasa Key</span>
                <span className={styles.projectDesc}>
                  – Arabic study solutions
                </span>
              </span>
              <span className={styles.projectItem}>
                <Shirt size={15} style={{ color: "#6366f1" }} />
                <span className={styles.projectName}>HijabPlanner</span>
                <span className={styles.projectDesc}>
                  – Modest wardrobe planner
                </span>
              </span>
              <span className={styles.projectItem}>
                <Library size={15} style={{ color: "#84cc16" }} />
                <span className={styles.projectName}>ShelfMind</span>
                <span className={styles.projectDesc}>– Your home library</span>
              </span>
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

      <p className={styles.madeWith}>
        Made with 🧠 by{" "}
        <a
          href="https://shanstudio.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.madeWithLink}
        >
          ShanStudio
        </a>
      </p>
    </footer>
  );
}
