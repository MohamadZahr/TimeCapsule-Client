import React, { useState } from 'react';
import styles from './CreateCapsulePage.module.css';
import { useNavigate } from 'react-router';

const CreateCapsulePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    title: '',
    message: '',
    private: false,
    surprise: false,
    color: '#5e8b7e',
    revealed_at: '',
    image: null as File | null,
    audio: null as File | null,
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.files![0]
      }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Capsule Data:', formData);
    // In a real app: API call to create capsule
    navigate('/public-wall');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Create Time Capsule</h1>
        <p className={styles.pageSubtitle}>Preserve memories for the future</p>

        <form onSubmit={handleSubmit} className={styles.capsuleForm}>
          <div className={styles.formColumns}>
            {/* Left Column */}
            <div className={styles.formColumn}>
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Basic Information</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="title">Title*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Appearance & Privacy</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="color">Capsule Color</label>
                  <div className={styles.colorPicker}>
                    <input
                      type="color"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                    />
                    <span>{formData.color}</span>
                  </div>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="private"
                      checked={formData.private}
                      onChange={handleChange}
                      className={styles.checkboxInput}
                    />
                    Private Capsule
                  </label>
                  <p className={styles.checkboxHint}>
                    Private capsules are only visible to you
                  </p>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="surprise"
                      checked={formData.surprise}
                      onChange={handleChange}
                      className={styles.checkboxInput}
                    />
                    Surprise Capsule
                  </label>
                  <p className={styles.checkboxHint}>
                    Don't show capsule in Upcoming section
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.formColumn}>
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Reveal Date & Time</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="revealed_at">Reveal Date*</label>
                  <input
                    type="datetime-local"
                    id="revealed_at"
                    name="revealed_at"
                    value={formData.revealed_at}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Multimedia Attachments</h2>
                
                <div className={styles.formGroup}>
                  <label htmlFor="image">Image (optional)</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Audio (optional)</label>
                  <div className={styles.audioOptions}>
                    {/* Upload audio */}
                    <div className={styles.audioOption}>
                      <label htmlFor="audio">Upload Audio</label>
                      <input
                        type="file"
                        id="audio"
                        name="audio"
                        accept="audio/*"
                        onChange={handleFileChange}
                      />
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => navigate('/public-wall')}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Create Capsule
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateCapsulePage;