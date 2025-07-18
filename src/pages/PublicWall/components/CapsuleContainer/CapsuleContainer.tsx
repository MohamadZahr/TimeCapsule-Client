import React from 'react';
import styles from './CapsuleContainer.module.css';
import type { Capsule } from '../../../../utils/types';

interface CapsuleContainerProps {
  capsule: Capsule;
}

const CapsuleContainer: React.FC<CapsuleContainerProps> = ({ capsule }) => {
  return (
    <div className={styles.capsule}>
      <div className={styles.vibrantAccent}></div>
      <div className={styles.capsuleContent}>
        <h3 className={styles.capsuleTitle}>{capsule.title}</h3>
        <p className={styles.capsuleCreator}>
          <span className={styles.byText}>by</span> {capsule.user_name || "Anonymous"}
        </p>
      </div>
    </div>
  );
};

export default CapsuleContainer;