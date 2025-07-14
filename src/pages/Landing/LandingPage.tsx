import React from 'react';
import styles from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/SignIn');
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <h1 className={styles.title}>
                        Welcome to Your Digital <span className={styles.highlight}>Time Capsule</span>
                    </h1>
                    <h2 className={styles.subtitle}>
                        Leave a message for the future: for yourself or the world.
                    </h2>

                    <button className={styles.ctaButton} onClick={handleGetStarted}>
                        Get Started
                    </button>
                </div>

                <div className={styles.featuresContainer}>
                    <div className={styles.features}>
                        <div className={styles.featureCard}>
                            <p>Create personal or public capsules</p>
                        </div>
                        <div className={styles.featureCard}>
                            <p>Add text, images, audio, and memories</p>
                        </div>
                        <div className={styles.featureCard}>
                            <p>Locked away until the moment is right</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;