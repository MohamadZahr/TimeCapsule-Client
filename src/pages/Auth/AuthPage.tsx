// src/components/AuthPage/AuthPage.tsx
import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axiosInstance';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await api.post('/guest/login', { email, password });
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data.payload));
        navigate('/PublicWall');
      } else {
        if (password !== password2) {
          return alert('Passwords do not match');
        }

        const response = await api.post('/guest/signup', { name, email, password });
        localStorage.setItem('user', JSON.stringify(response.data.payload));
        navigate('/PublicWall');
      }
    } catch (error) {
      console.error('Auth error:', error);
      //alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>TimeLock</div>
          <p className={styles.tagline}>Your Digital Time Capsule</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            {!isLogin && (
              <>
                <label>Repeat Password</label>
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Login to Your Account' : 'Create Account'}
          </button>
        </form>

        <div className={styles.footer}>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className={styles.link}>
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className={styles.link}>
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;