import React, { useState, useEffect } from 'react';
import {
    FaFilter, FaStar, FaChevronLeft, FaChevronRight, FaVideo, FaCheck,
    FaFacebookF, FaTwitter, FaInstagram, FaInfoCircle, FaEnvelope
} from 'react-icons/fa';

function Trainers() {
    const allTrainers = [{
        id: 1, name: "John Doe", specialty: "Strength Training", experience: "5 years", bio: "Expert in powerlifting and functional fitness.", photo: "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_640.jpg", availability: { Monday: "9AM-12PM", Wednesday: "2PM-5PM", Friday: "6PM-8PM" }, testimonial: { text: "John’s strength sessions transformed my lifts!", name: "Mike R." }, certifications: [{ name: "NSCA-CPT", desc: "National Strength and Conditioning Association Certified Personal Trainer" }, { name: "CrossFit L1", desc: "CrossFit Level 1 Trainer" }],
        videoIntro: "https://cdn.pixabay.com/video/2022/12/18/143431-782373969_tiny.mp4",
        rating: 4.8,
        social: { facebook: "https://facebook.com/johndoe", twitter: "https://twitter.com/johndoe", instagram: "https://instagram.com/johndoe" },
        stats: { sessions: 320, clients: 45 }
    },
    {
        id: 2,
        name: "Jane Smith",
        specialty: "Yoga",
        experience: "8 years",
        bio: "Specializes in Vinyasa and restorative yoga.",
        photo: "https://cdn.pixabay.com/photo/2020/02/15/00/33/yoga-4849681_640.jpg",
        availability: { Tuesday: "7AM-9AM", Thursday: "6PM-8PM", Saturday: "10AM-12PM" },
        testimonial: { text: "Jane’s yoga classes are pure bliss!", name: "Sarah K." },
        certifications: [
            { name: "RYT-200", desc: "Registered Yoga Teacher, 200-hour certification" },
            { name: "Yin Yoga Certified", desc: "Certified in Yin Yoga techniques" }
        ],
        videoIntro: "https://cdn.pixabay.com/video/2019/09/20/27090-361827449_large.mp4",
        rating: 4.9,
        social: { facebook: "https://facebook.com/janesmith", twitter: "https://twitter.com/janesmith", instagram: "https://instagram.com/janesmith" },
        stats: { sessions: 450, clients: 60 }
    },
    {
        id: 3,
        name: "Mike Johnson",
        specialty: "Cardio",
        experience: "6 years",
        bio: "Passionate about HIIT and endurance training.",
        photo: "https://cdn.pixabay.com/photo/2016/02/04/21/55/gym-room-1180016_640.jpg",
        availability: { Monday: "6PM-8PM", Wednesday: "7AM-9AM", Friday: "5PM-7PM" },
        testimonial: { text: "Mike’s cardio workouts are intense!", name: "Tom L." },
        certifications: [
            { name: "ACE-CPT", desc: "American Council on Exercise Certified Personal Trainer" },
            { name: "HIIT Instructor", desc: "Certified High-Intensity Interval Training Instructor" }
        ],
        videoIntro: "https://cdn.pixabay.com/video/2017/12/01/13134-245530646_tiny.mp4",
        rating: 4.7,
        social: { facebook: "https://facebook.com/mikejohnson", twitter: "https://twitter.com/mikejohnson", instagram: "https://instagram.com/mikejohnson" },
        stats: { sessions: 280, clients: 38 }
    },
    ];

    const [filter, setFilter] = useState({ specialty: "All", rating: "All" });
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [bookingTrainer, setBookingTrainer] = useState(null);
    const [bookingDay, setBookingDay] = useState(null);
    const [expandedCertTrainer, setExpandedCertTrainer] = useState(null);
    const [contactTrainer, setContactTrainer] = useState(null);
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
    const specialties = ["All", "Strength Training", "Yoga", "Cardio"];
    const ratings = ["All", "4+", "4.5+"];

    const filteredTrainers = allTrainers.filter(trainer => {
        return (
            (filter.specialty === "All" || trainer.specialty === filter.specialty) &&
            (filter.rating === "All" || trainer.rating >= parseFloat(filter.rating))
        );
    });
    const featuredTrainer = allTrainers[0];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % allTrainers.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [allTrainers.length]);

    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + allTrainers.length) % allTrainers.length);
    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % allTrainers.length);
    const openVideo = (video) => setSelectedVideo(video);
    const closeVideo = () => setSelectedVideo(null);
    const bookTrainer = (trainer, day) => { setBookingTrainer(trainer); setBookingDay(day); };
    const confirmBooking = () => {
        console.log(`Booked ${bookingTrainer.name} on ${bookingDay} at ${bookingTrainer.availability[bookingDay]}`);
        setBookingTrainer(null);
        setBookingDay(null);
    };
    const cancelBooking = () => { setBookingTrainer(null); setBookingDay(null); };
    const toggleCerts = (trainerId) => setExpandedCertTrainer(expandedCertTrainer === trainerId ? null : trainerId);
    const openContact = (trainer) => setContactTrainer(trainer);
    const closeContact = () => { setContactTrainer(null); setContactForm({ name: "", email: "", message: "" }); };
    const handleContactChange = (e) => setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    const handleContactSubmit = (e) => {
        e.preventDefault();
        console.log(`Contact ${contactTrainer.name}:`, contactForm);
        closeContact();
    };

    return (
        <div className="trainers">
            <h2>Our Trainers</h2>
            <p className="trainers-intro">Meet our expert trainers ready to guide you to your fitness goals!</p>

            {/* Featured Trainer Spotlight */}
            <section className="featured-trainer">
                <h3>Trainer Spotlight: {featuredTrainer.name}</h3>
                <div className="featured-content">
                    <img src={featuredTrainer.photo} alt={featuredTrainer.name} className="featured-photo" />
                    <div className="featured-details">
                        <p><strong>Specialty:</strong> {featuredTrainer.specialty}</p>
                        <p><strong>Experience:</strong> {featuredTrainer.experience}</p>
                        <p>{featuredTrainer.bio}</p>
                        <div className="certifications">
                            <strong>Certifications:</strong>
                            <span onClick={() => toggleCerts(featuredTrainer.id)} className="cert-toggle">
                                {featuredTrainer.certifications.map(c => c.name).join(", ")} <FaInfoCircle />
                            </span>
                            {expandedCertTrainer === featuredTrainer.id && (
                                <ul className="cert-list">
                                    {featuredTrainer.certifications.map((cert, index) => (
                                        <li key={index}>{cert.name}: {cert.desc}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="rating">
                            <strong>Rating:</strong> {featuredTrainer.rating}
                            {Array(Math.round(featuredTrainer.rating)).fill().map((_, i) => <FaStar key={i} />)}
                        </div>
                        <div className="stats">
                            <p><strong>Sessions:</strong> {featuredTrainer.stats.sessions}</p>
                            <p><strong>Clients:</strong> {featuredTrainer.stats.clients}</p>
                        </div>
                        <div className="social-links">
                            <a href={featuredTrainer.social.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                            <a href={featuredTrainer.social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                            <a href={featuredTrainer.social.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        </div>
                        <button className="video-btn" onClick={() => openVideo(featuredTrainer.videoIntro)}> <FaVideo /> Watch Intro</button>
                        <button className="book-session">Book a Session</button>
                        <button className="contact-btn" onClick={() => openContact(featuredTrainer)}><FaEnvelope /> Contact</button>
                    </div>
                </div>
            </section>

            {/* Trainer Filter */}
            <section className="trainer-filter">
                <h3><FaFilter /> Filter Trainers</h3>
                <div className="filter-options">
                    <div className="filter-group">
                        <label>Specialty:</label>
                        <select value={filter.specialty} onChange={(e) => setFilter({ ...filter, specialty: e.target.value })}>
                            {specialties.map((spec, index) => (
                                <option key={index} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Rating:</label>
                        <select value={filter.rating} onChange={(e) => setFilter({ ...filter, rating: e.target.value })}>
                            {ratings.map((rating, index) => (
                                <option key={index} value={rating}>{rating}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Trainer List */}
            <section className="trainer-list">
                <div className="trainer-grid">
                    {filteredTrainers.map((trainer) => (
                        <div key={trainer.id} className="trainer-card">
                            <img src={trainer.photo} alt={trainer.name} className="trainer-photo" />
                            <h3>{trainer.name}</h3>
                            <p><strong>Specialty:</strong> {trainer.specialty}</p>
                            <p><strong>Experience:</strong> {trainer.experience}</p>
                            <p>{trainer.bio}</p>
                            <div className="certifications">
                                <strong>Certifications:</strong>
                                <span onClick={() => toggleCerts(trainer.id)} className="cert-toggle">
                                    {trainer.certifications.map(c => c.name).join(", ")} <FaInfoCircle />
                                </span>
                                {expandedCertTrainer === trainer.id && (
                                    <ul className="cert-list">
                                        {trainer.certifications.map((cert, index) => (
                                            <li key={index}>{cert.name}: {cert.desc}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="rating">
                                <strong>Rating:</strong> {trainer.rating}
                                {Array(Math.round(trainer.rating)).fill().map((_, i) => <FaStar key={i} />)}
                            </div>
                            <div className="stats">
                                <p><strong>Sessions:</strong> {trainer.stats.sessions}</p>
                                <p><strong>Clients:</strong> {trainer.stats.clients}</p>
                            </div>
                            <div className="social-links">
                                <a href={trainer.social.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                                <a href={trainer.social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                                <a href={trainer.social.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            </div>
                            <button className="video-btn" onClick={() => openVideo(trainer.videoIntro)}> <FaVideo /> Watch Intro</button>
                            <button className="contact-btn" onClick={() => openContact(trainer)}><FaEnvelope /> Contact</button>
                            <button className="book-session">Book Session</button>

                        </div>
                    ))}
                </div>
            </section>

            {/* Trainer Availability Schedule */}
            <section className="trainer-schedule">
                <h3>Trainer Availability</h3>
                <div className="schedule-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Trainer</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrainers.map((trainer) => (
                                <tr key={trainer.id}>
                                    <td>{trainer.name}</td>
                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                                        <td key={day}>
                                            {trainer.availability[day] ? (
                                                <button
                                                    className="schedule-book-btn"
                                                    onClick={() => bookTrainer(trainer, day)}
                                                >
                                                    {trainer.availability[day]}
                                                </button>
                                            ) : '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Testimonials Slider */}
            <section className="trainer-testimonials">
                <h3>What Our Clients Say</h3>
                <div className="testimonial-slider">
                    <button className="slider-arrow left" onClick={prevTestimonial}><FaChevronLeft /></button>
                    <div className="testimonial-card">
                        <p>"{allTrainers[currentTestimonial].testimonial.text}"</p>
                        <h4>- {allTrainers[currentTestimonial].testimonial.name}</h4>
                        <p className="trainer-ref">About {allTrainers[currentTestimonial].name}</p>
                    </div>
                    <button className="slider-arrow right" onClick={nextTestimonial}><FaChevronRight /></button>
                </div>
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
            {bookingTrainer && (
                <div className="booking-modal" onClick={cancelBooking}>
                    <div className="booking-content" onClick={e => e.stopPropagation()}>
                        <h3>Book {bookingTrainer.name}</h3>
                        <p><strong>Day:</strong> {bookingDay}</p>
                        <p><strong>Time:</strong> {bookingTrainer.availability[bookingDay]}</p>
                        <div className="booking-actions">
                            <button className="confirm-booking" onClick={confirmBooking}><FaCheck /> Confirm</button>
                            <button className="cancel-booking" onClick={cancelBooking}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {contactTrainer && (
                <div className="contact-modal" onClick={closeContact}>
                    <div className="contact-content" onClick={e => e.stopPropagation()}>
                        <h3>Contact {contactTrainer.name}</h3>
                        <form onSubmit={handleContactSubmit} className="contact-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={contactForm.name}
                                onChange={handleContactChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={contactForm.email}
                                onChange={handleContactChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={contactForm.message}
                                onChange={handleContactChange}
                                required
                            />
                            <div className="contact-actions">
                                <button type="submit" className="submit-contact"><FaEnvelope /> Send</button>
                                <button type="button" className="cancel-contact" onClick={closeContact}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Trainers;