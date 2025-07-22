import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CapsuleDetailsPage.module.css';
import type { Capsule } from '../../utils/types';

const CapsuleDetailsPage: React.FC = () => {
  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCapsule = () => {
      try {
        const storedCapsule = localStorage.getItem('selectedCapsule');
        if (storedCapsule) {
          const parsedCapsule: Capsule = JSON.parse(storedCapsule);
          parsedCapsule.revealed_at = new Date(parsedCapsule.revealed_at);
          parsedCapsule.created_at = new Date(parsedCapsule.created_at);
          parsedCapsule.updated_at = new Date(parsedCapsule.updated_at);
          setCapsule(parsedCapsule);
        } else {
          navigate(-1);
        }
      } catch (error) {
        console.error('Error loading capsule:', error);
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadCapsule();
  }, [navigate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMediaUrl = (path: string | null): string | undefined => {
    if (!path) return undefined;
    return `http://127.0.0.1:8000/${path}`;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>Capsule not found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Back
      </button>

      <div className={styles.capsuleCard}>
        <div className={styles.colorStrip} style={{ backgroundColor: capsule.color }} />

        <div className={styles.header}>
          <h1 className={styles.title}>{capsule.title}</h1>
          <div className={styles.metadata}>
            <span>by {capsule.user?.name || 'Unknown'}</span>
            <span>Created: {formatDate(capsule.created_at)}</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            <div className={styles.leftColumn}>
              <div className={styles.messageSection}>
                <h3>Message</h3>
                <p className={styles.message}>{capsule.message}</p>
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <h4>Location</h4>
                  <div>
                    <div>{capsule.location.address}, {capsule.location.city}</div>
                    <div className={styles.subtext}>{capsule.location.country}</div>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <h4>Reveal Date</h4>
                  <div>{formatDate(capsule.revealed_at)}</div>
                </div>

                {capsule.tags.length > 0 && (
                  <div className={styles.detailItem}>
                    <h4>Tags</h4>
                    <div className={styles.tags}>
                      {capsule.tags.map((tag) => (
                        <span key={`${tag.id}-${tag.pivot.capsule_id}`} className={`${styles.tag} ${styles[`tag-${tag.mood}`]}`}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.rightColumn}>
              {(capsule.image_path || capsule.audio_path) && (
                <div className={styles.mediaSection}>
                  {capsule.image_path && (
                    <div className={styles.mediaItem}>
                      <h3>Photo</h3>
                      <img
                        src={getMediaUrl(capsule.image_path)}
                        alt="Capsule"
                        className={styles.image}
                        onError={(e) => e.currentTarget.style.display = 'none'}
                      />
                    </div>
                  )}

                  {capsule.audio_path && (
                    <div className={styles.mediaItem}>
                      <h3>Audio Recording</h3>
                      <audio controls className={styles.audio}>
                        <source src={getMediaUrl(capsule.audio_path)} type="audio/mpeg" />
                        <source src={getMediaUrl(capsule.audio_path)} type="audio/wav" />
                        Your browser does not support audio.
                      </audio>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleDetailsPage;