import React from 'react';
import styles from './Header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Signin');
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>TimeLock</div>
      <nav className={styles.nav}>
        <button 
          onClick={() => navigate('/publicwall')}
          className={`${styles.navButton} ${isActive('/publicwall') ? styles.active : ''}`}
        >
          Public Capsules
        </button>
        <button 
          onClick={() => navigate('/privatewall')}
          className={`${styles.navButton} ${isActive('/privatewall') ? styles.active : ''}`}
        >
          Your Capsules
        </button>
      </nav>
      <div className={styles.headerActions}>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </header>
  );
};

export default Header;