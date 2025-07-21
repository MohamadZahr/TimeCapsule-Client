import React from 'react';
import type { Capsule } from '../../utils/types';
import styles from './UpcomingWall.module.css';
import CountdownCapsuleContainer from '../UpcomingCapsuleContainer/CountdownCapsule';

interface UpcomingWallProps {
  capsules: Capsule[];
}

const UpcomingWall: React.FC<UpcomingWallProps> = ({ capsules }) => {
    return (
        <>
            <div className={styles.capsulesGrid}>
                {capsules.map(capsule => (
                    <CountdownCapsuleContainer key={capsule.id} capsule={capsule} />
                ))}
            </div>
        </>
    );
}
export default UpcomingWall;