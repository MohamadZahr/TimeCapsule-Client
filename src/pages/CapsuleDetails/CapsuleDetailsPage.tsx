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
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Back
        </button>
      </div>

      <div className={styles.capsuleCard}>
        <div 
          className={styles.colorStrip} 
          style={{ backgroundColor: capsule.color }}
        />
        
        <div className={styles.capsuleHeader}>
          <h1 className={styles.title}>{capsule.title}</h1>
          <div className={styles.metadata}>
            <span className={styles.author}>
              by {capsule.user?.name || 'Unknown'}
            </span>
            <span className={styles.date}>
              Created: {formatDate(capsule.created_at)}
            </span>
          </div>
        </div>

        <div className={styles.content}>
            <div className={styles.revealedContent}>
              <div className={styles.contentColumns}>
                <div className={styles.leftColumn}>
                  <div className={styles.messageContainer}>
                    <h3>Message</h3>
                    <p className={styles.message}>{capsule.message}</p>
                  </div>
                </div>

                <div className={styles.rightColumn}>
                  {capsule.image_path && (
                    <div className={styles.imageContainer}>
                      <h3>Photo</h3>
                      <img 
                        src={getMediaUrl(capsule.image_path)} 
                        alt="Capsule Image" 
                        className={styles.capsuleImage}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {capsule.audio_path && (
                    <div className={styles.audioContainer}>
                      <h3>Audio Recording</h3>
                      <audio controls className={styles.audioPlayer}>
                        {getMediaUrl(capsule.audio_path) && (
                          <>
                            <source src={getMediaUrl(capsule.audio_path)} type="audio/mpeg" />
                            <source src={getMediaUrl(capsule.audio_path)} type="audio/wav" />
                            <source src={getMediaUrl(capsule.audio_path)} type="audio/ogg" />
                          </>
                        )}
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailSection}>
            <h3>Location</h3>
            <div className={styles.location}>
              <div>
                <div className={styles.locationText}>
                  {capsule.location.address}, {capsule.location.city}
                </div>
                <div className={styles.locationSubtext}>
                  {capsule.location.country}
                </div>
              </div>
            </div>
          </div>

          {capsule.tags.length > 0 && (
            <div className={styles.detailSection}>
              <h3>Tags</h3>
              <div className={styles.tags}>
                {capsule.tags.map((tag) => (
                  <span 
                    key={tag.id} 
                    className={`${styles.tag} ${styles[`tag-${tag.mood}`]}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.detailSection}>
            <div className={styles.properties}>
              <div className={styles.property}>
                <span className={styles.propertyLabel}>Reveal Date:</span>
                <span className={styles.propertyValue}>
                  {formatDate(capsule.revealed_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleDetailsPage;