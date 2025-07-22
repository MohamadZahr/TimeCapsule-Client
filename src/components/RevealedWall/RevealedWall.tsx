import React from 'react';
import type { Capsule } from '../../utils/types';
import styles from './RevealedWall.module.css';
import CapsuleContainer from '../RevealedCapsuleContainer/CapsuleContainer';
import { useNavigate } from 'react-router-dom';

interface RevealedWallProps {
    capsules: Capsule[];
}

const RevealedWall: React.FC<RevealedWallProps> = ({ capsules }) => {
    const navigate = useNavigate();
    const handleCapsuleClick = (capsule: Capsule) => {
        localStorage.setItem('selectedCapsule', JSON.stringify(capsule));
        navigate(`/capsule/details`);
    }

    return (
        <>
            <div className={styles.capsulesGrid}>
                {capsules.map(capsule => (
                    <div key={capsule.id} onClick={() => handleCapsuleClick(capsule)}>
                        <CapsuleContainer key={capsule.id} capsule={capsule} />
                    </div>
                ))}
            </div>
        </>
    );
}
export default RevealedWall;