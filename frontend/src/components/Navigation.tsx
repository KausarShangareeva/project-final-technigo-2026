import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useCopy } from "../hooks/useCopy";
import Logo from "./Logo";
import {
  LogOut,
  Sun,
  Moon,
  ArrowUpRight,
  Sparkles,
  MessagesSquare,
  Menu,
  X,
  Home,
  LayoutDashboard,
  BookOpen,
  Zap,
  Printer,
} from "lucide-react";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { get } = useCopy();
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Left: Logo */}
          <Link to={user ? "/workspace" : "/"} className={styles.logoLink}>
            <Logo size="medium" />
          </Link>

          {/* Center: Nav links */}
          <nav className={styles.nav}>
            <div className={styles.links}>
              {user ? (
                <>
                  <Link to="/" className={styles.navLink}>
                    Home
                  </Link>
                  <Link to="workspace" className={styles.navLink}>
                    My study plan
                  </Link>
                  <div className={styles.dropdownWrapper}>
                    <button className={styles.contactLink}>
                      <span className={styles.onlineIndicator} />
                      {get("nav.contact")}
                    </button>
                    <div className={styles.dropdown}>
                      <a
                        href="https://t.me/kausar_code"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.dropdownItem}
                      >
                        <img src="/avatar_logo.png" alt="" className={styles.navAvatar} />
                        Message the Author
                      </a>
                      <a
                        href="https://buymeacoffee.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.dropdownItem}
                      >
                        <img src="/buymeacoffee.png" alt="" className={styles.navAvatar} />
                        Buy Me a Coffee
                      </a>
                      <Link to="/suggest-project" className={styles.dropdownItem}>
                        <Sparkles size={16} />
                        Suggest a Project
                      </Link>
                      <Link to="/feedback" className={styles.dropdownItem}>
                        <MessagesSquare size={16} />
                        Leave Feedback
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button className={styles.navLink} onClick={() => scrollToSection("hero")}>
                    Home
                  </button>
                  <button className={styles.navLink} onClick={() => scrollToSection("features")}>
                    Features
                  </button>
                  <button className={styles.navLink} onClick={() => scrollToSection("how-it-works")}>
                    How It Works
                  </button>
                  <button className={styles.navLink} onClick={() => scrollToSection("pdf-export")}>
                    PDF Export
                  </button>
                  <div className={styles.dropdownWrapper}>
                    <button className={styles.contactLink}>
                      <span className={styles.onlineIndicator} />
                      {get("nav.contact")}
                    </button>
                    <div className={styles.dropdown}>
                      <a
                        href="https://t.me/kausar_code"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.dropdownItem}
                      >
                        <img src="/avatar_logo.png" alt="" className={styles.navAvatar} />
                        Message the Author
                      </a>
                      <a
                        href="https://buymeacoffee.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.dropdownItem}
                      >
                        <img src="/buymeacoffee.png" alt="" className={styles.navAvatar} />
                        Buy Me a Coffee
                      </a>
                      <Link to="/suggest-project" className={styles.dropdownItem}>
                        <Sparkles size={16} />
                        Suggest a Project
                      </Link>
                      <Link to="/feedback" className={styles.dropdownItem}>
                        <MessagesSquare size={16} />
                        Leave Feedback
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right: CTA + Theme + Burger */}
          <div className={styles.rightActions}>
            {user ? (
              <>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                  <LogOut size={18} />
                </button>
                <span className={styles.divider} />
              </>
            ) : (
              <>
                <Link to="/login" className={styles.contactBtn}>
                  {localStorage.getItem("hasAccount")
                    ? "Log in"
                    : "Get Started"}
                  <ArrowUpRight size={16} />
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className={styles.themeBtn}
              title={theme === "dark" ? "Light theme" : "Dark theme"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className={styles.burgerBtn}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayOpen : ""}`}
        onClick={closeMenu}
      />
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileMenuHeader}>
          <Logo size="medium" showText={false} />
          <button className={styles.mobileCloseBtn} onClick={closeMenu} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {user ? (
          <>
            <Link to="/" className={styles.mobileNavLink} onClick={closeMenu}>
              <Home size={18} />
              Home
            </Link>
            <Link
              to="/workspace"
              className={styles.mobileNavLink}
              onClick={closeMenu}
            >
              <LayoutDashboard size={18} />
              My study plan
            </Link>

            <div className={styles.mobileDivider} />

            <a
              href="https://t.me/kausar_code"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileNavLink}
            >
              <img src="/avatar_logo.png" alt="" className={styles.navAvatar} />
              Message the Author
            </a>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileNavLink}
            >
              <img src="/buymeacoffee.png" alt="" className={styles.navAvatar} />
              Buy Me a Coffee
            </a>
            <Link to="/suggest-project" className={styles.mobileNavLink} onClick={closeMenu}>
              <Sparkles size={18} />
              Suggest a Project
            </Link>
            <Link to="/feedback" className={styles.mobileNavLink} onClick={closeMenu}>
              <MessagesSquare size={18} />
              Leave Feedback
            </Link>

            <div className={styles.mobileDivider} />

            <button
              className={styles.mobileNavLink}
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {theme === "dark" ? "Light theme" : "Dark theme"}
            </button>

            <button
              className={styles.mobileLogoutBtn}
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <button className={styles.mobileNavLink} onClick={() => scrollToSection("hero")}>
              <Home size={18} />
              Home
            </button>
            <button className={styles.mobileNavLink} onClick={() => scrollToSection("features")}>
              <Zap size={18} />
              Features
            </button>
            <button className={styles.mobileNavLink} onClick={() => scrollToSection("how-it-works")}>
              <BookOpen size={18} />
              How It Works
            </button>
            <button className={styles.mobileNavLink} onClick={() => scrollToSection("pdf-export")}>
              <Printer size={18} />
              PDF Export
            </button>

            <div className={styles.mobileDivider} />

            <a
              href="https://t.me/kausar_code"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileNavLink}
            >
              <img src="/avatar_logo.png" alt="" className={styles.navAvatar} />
              Message the Author
            </a>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileNavLink}
            >
              <img src="/buymeacoffee.png" alt="" className={styles.navAvatar} />
              Buy Me a Coffee
            </a>
            <Link to="/suggest-project" className={styles.mobileNavLink} onClick={closeMenu}>
              <Sparkles size={18} />
              Suggest a Project
            </Link>
            <Link to="/feedback" className={styles.mobileNavLink} onClick={closeMenu}>
              <MessagesSquare size={18} />
              Leave Feedback
            </Link>

            <div className={styles.mobileDivider} />

            <button
              className={styles.mobileNavLink}
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {theme === "dark" ? "Light theme" : "Dark theme"}
            </button>

            <Link
              to="/login"
              className={styles.mobileNavLink}
              onClick={closeMenu}
            >
              <ArrowUpRight size={18} />
              {localStorage.getItem("hasAccount") ? "Log in" : "Get Started"}
            </Link>
          </>
        )}
      </div>
    </>
  );
}
