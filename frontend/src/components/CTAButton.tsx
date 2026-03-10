import { Link } from "react-router-dom";
import styles from "./CTAButton.module.css";

interface CTAButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  align?: "left" | "center" | "right";
}

export default function CTAButton({ children, to, onClick, className, align = "center" }: CTAButtonProps) {
  const containerClass = `${styles.ctaContainer} ${styles[`align_${align}`]}`;
  const btnClass = `${styles.ctaButton} ${className ?? ""}`;

  if (to) {
    return (
      <div className={containerClass}>
        <Link to={to} className={btnClass}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <button className={btnClass} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
