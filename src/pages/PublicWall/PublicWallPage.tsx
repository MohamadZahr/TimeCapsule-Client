import React, { useState, useEffect } from 'react';
import styles from './PublicWallPage.module.css';
import type { Capsule } from '../../utils/types';
import CapsuleContainer from './components/CapsuleContainer/CapsuleContainer';

const PublicWallPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [capsules, setCapsules] = useState<Capsule[]>([]);
    const [filterDate, setFilterDate] = useState('');
    const [filterCreator, setFilterCreator] = useState('');


    // Sample data - in a real app this would come from an API
    useEffect(() => {
        const mockCapsules: Capsule[] = [
            {
                id: 1,
                user_id: 101,
                user_name: "Alex Johnson",
                title: "College Graduation Memories",
                message: "",
                private: false,
                surprise: false,
                color: "#5e8b7e",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                user_id: 102,
                user_name: "Sam Rivera",
                title: "Trip to Japan",
                message: "",
                private: false,
                surprise: true,
                color: "#a27b5c",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                user_id: 103,
                user_name: "Taylor Kim",
                title: "First Job Experience",
                message: "",
                private: false,
                surprise: false,
                color: "#3f72af",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4,
                user_id: 104,
                user_name: "Jordan Smith",
                title: "30th Birthday Reflections",
                message: "",
                private: false,
                surprise: true,
                color: "#2c786c",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5,
                user_id: 105,
                user_name: "Morgan Lee",
                title: "2023 Tech Predictions",
                message: "",
                private: false,
                surprise: false,
                color: "#ff9a76",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 6,
                user_id: 106,
                user_name: "Casey Brown",
                title: "Family Reunion",
                message: "",
                private: false,
                surprise: true,
                color: "#6a67ce",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        setCapsules(mockCapsules);
    }, []);

    const filteredCapsules = capsules.filter(capsule => {
        const matchesSearch = capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            capsule.user_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = filterDate ?
            new Date(capsule.revealed_at || capsule.createdAt).toISOString().split('T')[0] === filterDate :
            true;

        const matchesCreator = filterCreator ?
            capsule.user_name?.toLowerCase().includes(filterCreator.toLowerCase()) :
            true;

        return matchesSearch && matchesDate && matchesCreator;
    });

    return (
        <div className={styles.container}>
            {/* Main Content */}
            <main className={styles.main}>
                <h1 className={styles.pageTitle}>Public Time Capsules</h1>
                <p className={styles.pageSubtitle}>Explore capsules shared by our community</p>

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
                                <label>Reveal Date:</label>
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <label>Creator:</label>
                                <input
                                    type="text"
                                    placeholder="Filter by creator..."
                                    value={filterCreator}
                                    onChange={(e) => setFilterCreator(e.target.value)}
                                />
                            </div>
                            <button
                                className={styles.clearFilters}
                                onClick={() => {
                                    setFilterDate('');
                                    setFilterCreator('');
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Capsules Grid */}
                <div className={styles.capsulesGrid}>
                    {filteredCapsules.length > 0 ? (
                        filteredCapsules.map(capsule => (
                            <CapsuleContainer key={capsule.id} capsule={capsule} />
                        ))
                    ) : (
                        <div className={styles.noResults}>
                            <p>No capsules found matching your search</p>
                            <button
                                className={styles.clearSearch}
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterDate('');
                                    setFilterCreator('');
                                }}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PublicWallPage;