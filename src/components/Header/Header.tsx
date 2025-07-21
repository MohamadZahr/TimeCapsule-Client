import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Signin');
  }
  return (
    <header className={styles.header}>
      <div className={styles.logo}>TimeLock</div>
      <div className={styles.headerActions}>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </header >
  );
};

export default Header;