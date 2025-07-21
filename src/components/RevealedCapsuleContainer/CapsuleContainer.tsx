import React from 'react';
import styles from './CapsuleContainer.module.css';
import type { Capsule } from '../../utils/types';

interface CapsuleContainerProps {
  capsule: Capsule;
}

const CapsuleContainer: React.FC<CapsuleContainerProps> = ({ capsule }) => {
  return (
    <div
      className={styles.capsule}
      style={{
        '--accent-color': capsule.color,
      } as React.CSSProperties}
    >
      <div className={styles.vibrantAccent}></div>
      <div className={styles.capsuleContent}>
        <h3 className={styles.capsuleTitle}>{capsule.title}</h3>
        <p className={styles.capsuleCreator}>
          <span className={styles.byText}>by</span> {capsule.user?.name || "Anonymous"}
        </p>

      </div>
    </div>
  );
};

export default CapsuleContainer;