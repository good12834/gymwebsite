import React, { useState } from 'react';
import { FaFilter, FaStar, FaCalendarAlt, FaClock, FaUserTie, FaVideo, FaCheck } from 'react-icons/fa';

function Classes() {
    // Sample class data
    const allClasses = [{
        id: 1, name: "Spin Blast", category: "Cardio", duration: "45 min", difficulty: "Intermediate", description: "High-energy cycling with music-driven intensity.", days: ["Monday", "Wednesday"],
        time: "6:00 PM", video: "https://cdn.pixabay.com/video/2020/02/27/32937-395456375_tiny.mp4", instructorId: 1
    },
    {
        id: 2, name: "Yoga Flow", category: "Mind & Body", duration: "60 min", difficulty: "Beginner", description: "Gentle poses to boost flexibility and calm the mind.", days: ["Tuesday", "Thursday"], time: "7:00 AM", video: "https://cdn.pixabay.com/video/2020/06/11/41724-430090688_tiny.mp4", instructorId: 2
    },
    {
        id: 3, name: "HIIT Power", category: "Strength", duration: "30 min", difficulty: "Advanced", description: "Explosive intervals for maximum calorie burn.", days: ["Monday", "Friday"], time: "5:30 PM", video: "https://cdn.pixabay.com/video/2019/12/20/30417-381526052_tiny.mp4", instructorId: 3
    },
    {
        id: 4, name: "Aerial Yoga", category: "Mind & Body", duration: "60 min", difficulty: "Intermediate", description: "Defy gravity with hammock-supported stretches.", days: ["Wednesday", "Saturday"], time: "10:00 AM", video: "https://cdn.pixabay.com/video/2020/05/28/40401-425442542_tiny.mp4", instructorId: 2
    },
    {
        id: 5, name: "Core Crusher", category: "Strength", duration: "45 min", difficulty: "Intermediate", description: "Targeted ab and core strength training.", days: ["Tuesday", "Thursday"], time: "6:30 PM", video: "https://cdn.pixabay.com/video/2017/12/01/13139-245530647_tiny.mp4", instructorId: 1
    },
    ];

    // Instructor data
    const instructors = [{ id: 1, name: "Jake Miller", bio: "Certified Spin and Strength coach with 8 years of experience.", photo: "https://cdn.pixabay.com/photo/2019/06/02/04/36/man-4245628_640.jpg" },
    { id: 2, name: "Sara Chen", bio: "Yoga expert with a passion for mindfulness and aerial arts.", photo: "https://cdn.pixabay.com/photo/2022/04/20/06/09/woman-7144386_640.jpg" },
    { id: 3, name: "Mike Torres", bio: "HIIT specialist focused on pushing limits safely.", photo: "https://cdn.pixabay.com/photo/2016/03/31/03/23/fitness-1291997_640.jpg" },];

    // Filter state
    const [filters, setFilters] = useState({ category: "All", difficulty: "All", day: "All" });
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [bookingClass, setBookingClass] = useState(null);

    // Filter options
    const categories = ["All", "Cardio", "Strength", "Mind & Body"];
    const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
    const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Apply filters
    const filteredClasses = allClasses.filter(cls => {
        return (
            (filters.category === "All" || cls.category === filters.category) &&
            (filters.difficulty === "All" || cls.difficulty === filters.difficulty) &&
            (filters.day === "All" || cls.days.includes(filters.day))
        );
    });

    // Featured class
    const featuredClass = allClasses[0];

    // Video modal controls
    const openVideo = (video) => setSelectedVideo(video);
    const closeVideo = () => setSelectedVideo(null);

    // Booking controls
    const bookClass = (cls) => setBookingClass(cls);
    const confirmBooking = () => {
        console.log(`Booked: ${bookingClass.name} on ${filters.day !== "All" ? filters.day : bookingClass.days[0]} at ${bookingClass.time}`);
        setBookingClass(null); // Simulate booking success
    };
    const cancelBooking = () => setBookingClass(null);

    return (
        <div className="classes">
            <h2>Our Classes</h2>
            <p className="classes-intro">Explore dynamic classes led by top instructors—your perfect workout awaits!</p>

            {/* Advanced Class Filter */}
            <section className="class-filter">
                <h3><FaFilter /> Filter Classes</h3>
                <div className="filter-options">
                    <div className="filter-group">
                        <label>Category:</label>
                        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Difficulty:</label>
                        <select value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}>
                            {difficulties.map((diff, index) => (
                                <option key={index} value={diff}>{diff}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Day:</label>
                        <select value={filters.day} onChange={(e) => setFilters({ ...filters, day: e.target.value })}>
                            {days.map((day, index) => (
                                <option key={index} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Featured Class Spotlight */}
            <section className="featured-class">
                <h3><FaStar /> Featured Class: {featuredClass.name}</h3>
                <div className="featured-content">
                    <div className="featured-image" style={{ backgroundImage: 'url(spin-blast-placeholder.jpg)' }}></div>
                    <div className="featured-details">
                        <p>{featuredClass.description}</p>
                        <p><strong>Duration:</strong> {featuredClass.duration}</p>
                        <p><strong>Difficulty:</strong> {featuredClass.difficulty}</p>
                        <p><strong>When:</strong> {featuredClass.days.join(", ")} at {featuredClass.time}</p>
                        <button className="video-preview" onClick={() => openVideo(featuredClass.video)}>
                            <FaVideo /> Watch Preview
                        </button>
                        <button className="book-now" onClick={() => bookClass(featuredClass)}>Book Now</button>
                    </div>
                </div>
            </section>

            {/* Class Schedule Table */}
            <section className="class-schedule">
                <h3><FaCalendarAlt /> Weekly Class Schedule</h3>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Category</th>
                            <th>Days</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClasses.map(cls => (
                            <tr key={cls.id}>
                                <td>{cls.name}</td>
                                <td>{cls.category}</td>
                                <td>{cls.days.join(", ")}</td>
                                <td>{cls.time}</td>
                                <td>{cls.duration}</td>
                                <td>{cls.difficulty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Class List */}
            <section className="class-list">
                <div className="class-grid">
                    {filteredClasses.map(cls => (
                        <div key={cls.id} className="class-card">
                            <h4>{cls.name}</h4>
                            <p>{cls.description}</p>
                            <p><FaClock /> {cls.duration} | {cls.difficulty}</p>
                            <button className="video-preview" onClick={() => openVideo(cls.video)}>
                                <FaVideo /> Watch Preview
                            </button>
                            <button className="book-now" onClick={() => bookClass(cls)}>Book Now</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Instructor Bios */}
            <section className="instructor-bios">
                <h3><FaUserTie /> Meet Our Instructors</h3>
                <div className="instructor-grid">
                    {instructors.map(instructor => (
                        <div key={instructor.id} className="instructor-card">
                            <img src={instructor.photo} alt={instructor.name} className="instructor-photo" />
                            <h4>{instructor.name}</h4>
                            <p>{instructor.bio}</p>
                            <button className="learn-more">Learn More</button>

                        </div>
                    ))}
                </div>
            </section>

            {/* Booking CTA */}
            <section className="booking-cta">
                <h3>Ready to Sweat?</h3>
                <p>Join a class now and kickstart your fitness journey with GymFit!</p>
                <button className="cta-button" onClick={() => bookClass(filteredClasses[0] || allClasses[0])}>
                    Book Your Spot
                </button>
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="video-modal" onClick={closeVideo}>
                    <div className="video-content" onClick={e => e.stopPropagation()}>
                        <button className="close-video" onClick={closeVideo}>X</button>
                        <video controls autoPlay width="100%">
                            <source src={selectedVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {bookingClass && (
                <div className="booking-modal" onClick={cancelBooking}>
                    <div className="booking-content" onClick={e => e.stopPropagation()}>
                        <h3>Book {bookingClass.name}</h3>
                        <p><strong>When:</strong> {filters.day !== "All" ? filters.day : bookingClass.days[0]} at {bookingClass.time}</p>
                        <p><strong>Duration:</strong> {bookingClass.duration}</p>
                        <p><strong>Instructor:</strong> {instructors.find(i => i.id === bookingClass.instructorId)?.name}</p>
                        <div className="booking-actions">
                            <button className="confirm-booking" onClick={confirmBooking}>
                                <FaCheck /> Confirm Booking
                            </button>
                            <button className="cancel-booking" onClick={cancelBooking}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Classes;