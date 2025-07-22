import React, { useEffect, useState } from 'react';
import styles from './CreateCapsulePage.module.css';
import { useNavigate } from 'react-router';
import { api } from '../../api/axiosInstance';

interface Tag {
  id: number;
  name: string;
  mood: string;
}

interface FormData {
  title: string;
  message: string;
  private: boolean;
  surprise: boolean;
  color: string;
  revealed_at: string;
  image: File | null;
  audio: File | null;
  tags: number[];
}

const CreateCapsulePage: React.FC = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    message: '',
    private: false,
    surprise: false,
    color: '#5e8b7e',
    revealed_at: '',
    image: null,
    audio: null,
    tags: [],
  });

  const fetchTags = async () => {
    try {
      const response = await api.get('/tags');
      setTags(response.data.payload || []);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : value;

    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.files![0]
      }));
    }
  };

  const handleTagToggle = (tagId: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        title: formData.title,
        message: formData.message,
        private: formData.private,
        surprise: formData.surprise,
        color: formData.color,
        revealed_at: formData.revealed_at,
        tag_ids: formData.tags,
      };

      if (formData.image) {
        payload.image_base64 = await convertFileToBase64(formData.image);
      }

      if (formData.audio) {
        payload.audio_base64 = await convertFileToBase64(formData.audio);
      }

      const response = await api.post('/create_capsule', payload);
      console.log('Capsule created successfully:', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Failed to create capsule:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Create Time Capsule</h1>
          <p className={styles.pageSubtitle}>Preserve memories for the future</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.capsuleForm}>
          <div className={styles.formColumns}>
            {/* Left Column */}
            <div className={styles.formColumn}>
              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Basic Information</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="title">Title*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Share your thoughts, memories, or message to the future..."
                  />
                </div>
              </section>

              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Tags</h2>
                <p className={styles.sectionDescription}>
                  Select tags that describe your capsule
                </p>

                <div className={styles.tagsContainer}>
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      className={`${styles.tagButton} ${formData.tags.includes(tag.id) ? styles.tagSelected : ''
                        }`}
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Column */}
            <div className={styles.formColumn}>
              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Reveal Date & Time</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="revealed_at">Reveal Date*</label>
                  <input
                    type="datetime-local"
                    id="revealed_at"
                    name="revealed_at"
                    value={formData.revealed_at}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </section>

              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Multimedia Attachments</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="image">Image (optional)</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                  {formData.image && (
                    <p className={styles.fileName}>Selected: {formData.image.name}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="audio">Audio (optional)</label>
                  <input
                    type="file"
                    id="audio"
                    name="audio"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                  {formData.audio && (
                    <p className={styles.fileName}>Selected: {formData.audio.name}</p>
                  )}
                </div>
              </section>

              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Appearance & Privacy</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="color">Capsule Color</label>
                  <div className={styles.colorPicker}>
                    <input
                      type="color"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                    <span className={styles.colorValue}>{formData.color}</span>
                  </div>
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="private"
                      checked={formData.private}
                      onChange={handleInputChange}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxText}>Private Capsule</span>
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
                      onChange={handleInputChange}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxText}>Surprise Capsule</span>
                  </label>
                  <p className={styles.checkboxHint}>
                    Don't show capsule in Upcoming section
                  </p>
                </div>
              </section>

            </div>
          </div>

          <footer className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Capsule'}
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default CreateCapsulePage;