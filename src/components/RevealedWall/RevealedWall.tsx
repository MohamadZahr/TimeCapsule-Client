import React from 'react';
import type { Capsule } from '../../utils/types';
import styles from './RevealedWall.module.css';
import CapsuleContainer from '../RevealedCapsuleContainer/CapsuleContainer';

interface RevealedWallProps {
  capsules: Capsule[];
}

const RevealedWall: React.FC<RevealedWallProps> = ({ capsules }) => {
    return (
        <>
            <div className={styles.capsulesGrid}>
                {capsules.map(capsule => (
                    <CapsuleContainer key={capsule.id} capsule={capsule} />
                ))}
            </div>
        </>
    );
}
export default RevealedWall;