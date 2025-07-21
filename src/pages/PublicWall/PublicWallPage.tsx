import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PublicWallPage.module.css';
import type { Capsule } from '../../utils/types';
import RevealedWall from '../../components/RevealedWall/RevealedWall';
import UpcomingWall from '../../components/UpcomingWall/UpcomingWall';
import { api } from '../../api/axiosInstance';

const PublicWallPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [capsules, setCapsules] = useState<Capsule[]>([]);
    const [upcomingCapsules, setUpcomingCapsules] = useState<Capsule[]>([]);
    const [filterCountry, setFilterCountry] = useState('');
    const [filterMood, setFilterMood] = useState('');
    const [filterTimeRange, setFilterTimeRange] = useState('');
    const [activeWall, setActiveWall] = useState<'revealed' | 'upcoming'>('revealed');

    const moods = ['happy', 'sad', 'reflective', 'nostalgic', 'serious', 'funny', 'romantic', 'inspirational'];

    const fetchCapsules = async () => {
        try {
          const response = await api.get('/public/revealed');
          setCapsules(response.data.payload || []);
        } catch (error) {
          console.error('Failed to fetch capsules:', error);
        }
    };

    const fetchUpcomingCapsules = async () => {
        try {
          const response = await api.get('/public/upcoming');
          setUpcomingCapsules(response.data.payload || []);
        } catch (error) {
          console.error('Failed to fetch upcoming capsules:', error);
        }
    };

    useEffect(() => {
        fetchCapsules();
        fetchUpcomingCapsules();
    }, []);

    const getTimeRangeFilter = (capsule: Capsule) => {
        const revealDate = new Date(capsule.revealed_at || capsule.created_at);
        const now = new Date();
        const diffTime = now.getTime() - revealDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) return 'week';
        if (diffDays <= 30) return 'month';
        if (diffDays <= 365) return 'year';
        return 'older';
    };

    const filteredCapsules = capsules.filter(capsule => {
        const matchesSearch = capsule.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCountry = filterCountry ?
            capsule.location?.country?.toLowerCase().includes(filterCountry.toLowerCase()) :
            true;

        const matchesMood = filterMood ?
            capsule.tags?.some(tag => tag.mood?.toLowerCase() === filterMood.toLowerCase()) :
            true;

        const matchesTimeRange = filterTimeRange ?
            getTimeRangeFilter(capsule) === filterTimeRange :
            true;

        return matchesSearch && matchesCountry && matchesMood && matchesTimeRange;
    });

    const filteredUpcomingCapsules = upcomingCapsules.filter(capsule => {
        const matchesSearch = capsule.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCountry = filterCountry ?
            capsule.location?.country?.toLowerCase().includes(filterCountry.toLowerCase()) :
            true;

        const matchesMood = filterMood ?
            capsule.tags?.some(tag => tag.mood?.toLowerCase() === filterMood.toLowerCase()) :
            true;

        return matchesSearch && matchesCountry && matchesMood;
    });

    return (
        <div className={styles.container}>
            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.pageTitle}>Public Time Capsules</h1>
                        <p className={styles.pageSubtitle}>Explore capsules shared by our community</p>
                    </div>
                    <button 
                        className={styles.createButton}
                        onClick={() => navigate('/CreateCapsule')}
                    >
                        Create Capsule
                    </button>
                </div>

                {/* Wall Toggle */}
                <div className={styles.wallToggle}>
                    <button
                        className={`${styles.toggleButton} ${activeWall === 'revealed' ? styles.active : ''}`}
                        onClick={() => setActiveWall('revealed')}
                    >
                        Revealed Capsules
                    </button>
                    <button
                        className={`${styles.toggleButton} ${activeWall === 'upcoming' ? styles.active : ''}`}
                        onClick={() => setActiveWall('upcoming')}
                    >
                        Upcoming Capsules
                    </button>
                </div>

                {/* Search and Filters */}
                <div className={styles.searchSection}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search capsules..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className={styles.filterButton}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <div className={styles.filtersPanel}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Country:</label>
                                <input
                                    type="text"
                                    placeholder="Filter by country..."
                                    className={styles.filterInput}
                                    value={filterCountry}
                                    onChange={(e) => setFilterCountry(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Mood:</label>
                                <select
                                    className={styles.filterSelect}
                                    value={filterMood}
                                    onChange={(e) => setFilterMood(e.target.value)}
                                >
                                    <option value="">All moods</option>
                                    {moods.map(mood => (
                                        <option key={mood} value={mood}>
                                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Time Range:</label>
                                <select
                                    className={styles.filterSelect}
                                    value={filterTimeRange}
                                    onChange={(e) => setFilterTimeRange(e.target.value)}
                                >
                                    <option value="">All time</option>
                                    <option value="week">Past week</option>
                                    <option value="month">Past month</option>
                                    <option value="year">Past year</option>
                                    <option value="older">Older than a year</option>
                                </select>
                            </div>
                            <button
                                className={styles.clearFilters}
                                onClick={() => {
                                    setFilterCountry('');
                                    setFilterMood('');
                                    setFilterTimeRange('');
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Capsules Grid */}
                {activeWall === 'revealed' ? (
                    <RevealedWall capsules={filteredCapsules} />
                ) : (
                    <UpcomingWall capsules={filteredUpcomingCapsules} />
                )}
            </main>
        </div>
    );
};

export default PublicWallPage;