import { Link } from "react-router-dom";
import { useCopy } from "../hooks/useCopy";
import { ArrowUpRight } from "lucide-react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const { get } = useCopy();

  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <section className={styles.card} aria-label="Not found page">
        <h1 className={styles.title}>Oops! {get("notFound.title")}</h1>
        <p className={styles.description}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className={styles.cta}>
          GO BACK HOME
          <span className={styles.ctaIcon}>
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </section>
    </div>
  );
}
