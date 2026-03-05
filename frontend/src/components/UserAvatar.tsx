import { useAvatar } from "../hooks/useAvatar";
import { useAuth } from "../context/AuthContext";
import styles from "./UserAvatar.module.css";

function dicebearUrl(seed: string) {
  return `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`;
}

interface Props {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  showEditOverlay?: boolean;
  /** Pass true only for the current user's avatar (enables custom upload override) */
  isCurrentUser?: boolean;
  /** Explicit avatar URL to show (overrides dicebear) */
  avatarUrl?: string;
}

function AvatarImage({
  src,
  name,
  size,
  className,
  onClick,
  showEditOverlay,
}: {
  src: string;
  name: string;
  size: number;
  className?: string;
  onClick?: () => void;
  showEditOverlay: boolean;
}) {
  return (
    <button
      type="button"
      className={`${styles.avatarBtn} ${className ?? ""}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      title={showEditOverlay ? "Change avatar" : undefined}
      disabled={!onClick}
    >
      <img src={src} alt={name} className={styles.img} />
      {showEditOverlay && <span className={styles.overlay}>✏️</span>}
    </button>
  );
}

export default function UserAvatar({
  name,
  size = 44,
  className,
  onClick,
  showEditOverlay = false,
  isCurrentUser = false,
  avatarUrl,
}: Props) {
  const { customAvatar } = useAvatar();
  const { user } = useAuth();

  const src =
    isCurrentUser && customAvatar
      ? customAvatar
      : avatarUrl || (isCurrentUser && user?.avatar) || dicebearUrl(name);

  return (
    <AvatarImage
      src={src}
      name={name}
      size={size}
      className={className}
      onClick={onClick}
      showEditOverlay={showEditOverlay}
    />
  );
}
