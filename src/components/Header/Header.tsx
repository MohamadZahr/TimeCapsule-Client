import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>TimeLock</div>
      <button 
        className={styles.logoutButton}
        onClick={onLogout}
        aria-label="Logout"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;