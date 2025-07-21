import React, { useState, useEffect } from 'react';
import styles from './CountdownCapsule.module.css';
import type { Capsule } from '../../utils/types';

interface CountdownCapsuleContainerProps {
  capsule: Capsule;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isRevealed: boolean;
}

const CountdownCapsuleContainer: React.FC<CountdownCapsuleContainerProps> = ({ capsule }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRevealed: false
  });

  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date().getTime();
    const revealDate = new Date(capsule.revealed_at).getTime();
    const difference = revealDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isRevealed: true
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isRevealed: false
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(timer);
  }, [capsule.revealed_at]);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  const getCountdownDisplay = () => {
    if (timeRemaining.isRevealed) {
      return (
        <div className={styles.revealedText}>
          ✨ Revealed!
        </div>
      );
    }

    return (
      <div className={styles.countdown}>
        {timeRemaining.days > 0 && (
          <div className={styles.timeUnit}>
            <span className={styles.timeValue}>{formatTime(timeRemaining.days)}</span>
            <span className={styles.timeLabel}>days</span>
          </div>
        )}
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{formatTime(timeRemaining.hours)}</span>
          <span className={styles.timeLabel}>hrs</span>
        </div>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{formatTime(timeRemaining.minutes)}</span>
          <span className={styles.timeLabel}>min</span>
        </div>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{formatTime(timeRemaining.seconds)}</span>
          <span className={styles.timeLabel}>sec</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.capsule} ${timeRemaining.isRevealed ? styles.revealed : ''}`}>
      <div className={styles.vibrantAccent}></div>
      <div className={styles.capsuleContent}>
        <h3 className={styles.capsuleTitle}>{capsule.title}</h3>
        <p className={styles.capsuleCreator}>
          <span className={styles.byText}>by</span> {capsule.user?.name || "Anonymous"}
        </p>
        <div className={styles.countdownContainer}>
          {getCountdownDisplay()}
        </div>
        <div className={styles.revealDate}>
          Reveals: {new Date(capsule.revealed_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CountdownCapsuleContainer;