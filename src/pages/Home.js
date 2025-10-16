import React, { useState, useEffect } from 'react';
import {
    FaDumbbell, FaUser, FaUsers, FaRunning, FaSpa, FaAppleAlt, FaLock, FaMobileAlt,
    FaHeartbeat, FaSwimmer, FaChild, FaParking, FaClock, FaMusic, FaBolt, FaBook,
    FaCalendar, FaLink, FaRocket, FaBrain, FaShieldAlt, FaStar
} from 'react-icons/fa';

function Home() {
    const sliderImages = [{
        url:
            'https://media.istockphoto.com/id/2169582212/photo/happy-muscular-fit-gym-couple-doing-lunges-exercises-on-stepper-at-gym.jpg?s=612x612&w=0&k=20&c=BVz2JtqCyLtE-O-F_kb95PwghiIyjPdY3z0krCb6yrA=', caption: 'Welcome to GymFit'
    },
    { url: 'https://media.istockphoto.com/id/692256464/photo/muscular-couple-discussing-on-the-bench.jpg?s=612x612&w=0&k=20&c=ivbsILTnKtaIs2fBCtEZNrPbVFJSU4eDx_D44JPvedk=', caption: 'State-of-the-Art Facilities' },
    { url: 'https://media.istockphoto.com/id/1063910948/photo/woman-with-her-personal-trainer.jpg?s=612x612&w=0&k=20&c=bTU7s9Nva5aD5_v1009wh5IJZDUAfMRdjItZq1qYS3Q=', caption: 'Join Our Community' }];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [sliderImages.length]);

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    // Enhanced and expanded features with attractive descriptions
    const features = [{ title: "Next-Gen Cardio Lab", description: "Immerse yourself in virtual trails with smart treadmills and live heart-rate tracking.", icon: <FaHeartbeat size={40} /> }, { title: "Elite Strength Arena", description: "Lift like a pro with Olympic-grade weights and custom power racks.", icon: <FaDumbbell size={40} /> }, { title: "World-Class Trainers", description: "Train with top experts in CrossFit, Pilates, and kettlebell mastery.", icon: <FaUser size={40} /> }, { title: "Epic Group Classes", description: "Sweat it out with HIIT, Spin, or defy gravity in Aerial Yoga.", icon: <FaUsers size={40} /> }, { title: "Luxury Indoor Pool", description: "Swim laps in our 25m pool or join exclusive coaching sessions.", icon: <FaSwimmer size={40} /> }, { title: "Ultimate Recovery Lounge", description: "Unwind with infrared saunas, steam rooms, and pro massage therapy.", icon: <FaSpa size={40} /> }, { title: "Fuel Bar", description: "Grab gourmet protein shakes or custom meal prep for peak performance.", icon: <FaAppleAlt size={40} /> }, { title: "Kids’ Power Zone", description: "Fun, supervised fitness programs to ignite young energy.", icon: <FaChild size={40} /> }, { title: "GymFit Smart App", description: "Control your fitness with live equipment updates and stats.", icon: <FaMobileAlt size={40} /> }, { title: "VIP Locker Rooms", description: "Relax in style with digital locks and spa-like showers.", icon: <FaLock size={40} /> }, { title: "Hassle-Free Parking", description: "Park easy with ample spaces and EV charging stations.", icon: <FaParking size={40} /> }, { title: "Tailored Fitness Blueprint", description: "Your goals, your plan—custom workouts and nutrition designed for you.", icon: <FaRunning size={40} /> }, { title: "Non-Stop Access", description: "Hit the gym 24/7 with secure keycard entry—your schedule, your rules.", icon: <FaClock size={40} /> }, { title: "Pulse-Pounding Audio", description: "Feel the beat with our immersive sound system for every workout.", icon: <FaMusic size={40} /> }, { title: "Powerlifting Pro Zone", description: "Dominate lifts with competition-grade platforms and gear.", icon: <FaBolt size={40} /> }, { title: "Knowledge Hub", description: "Master your craft with our fitness library and expert resources.", icon: <FaBook size={40} /> }, { title: "Performance Boost Tech", description: "Track gains with cutting-edge wearables and analytics.", icon: <FaRocket size={40} /> }, { title: "Mind & Body Studio", description: "Find zen with meditation classes and mindfulness workshops.", icon: <FaBrain size={40} /> }, { title: "Safety First Systems", description: "Train with peace of mind thanks to 24/7 monitoring and sanitized spaces.", icon: <FaShieldAlt size={40} /> }, { title: "Exclusive Member Perks", description: "Unlock VIP events, discounts, and priority class bookings.", icon: <FaStar size={40} /> }];

    // Other sections' sample data (unchanged from previous example)
    const todayClasses = [{ time: "8:00 AM", name: "Spin Blast" }, { time: "12:00 PM", name: "Yoga Flow" }, { time: "6:00 PM", name: "HIIT Power" }];

    const memberSpotlight = {
        name: "Alex Johnson",
        story: "Lost 30 lbs and gained confidence with GymFit!",
        photo: "https://cdn.pixabay.com/photo/2022/09/06/21/37/couple-7437534_640.jpg"
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="slider">
                    {sliderImages.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.url})` }}
                        >
                            <div className="slide-caption">
                                <h1>{slide.caption}</h1>
                                <button className="cta-button">Join Now</button>
                            </div>
                        </div>
                    ))}
                    <div className="slider-dots">
                        {sliderImages.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => handleSlideChange(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links Bar */}
            <section className="quick-links">
                <a href="/booking" className="quick-link"><FaLink /> Book a Class</a>
                <a href="/membership" className="quick-link"><FaLink /> Join Now</a>
                <a href="/contact" className="quick-link"><FaLink /> Contact Us</a>
            </section>

            {/* Stats Section */}
            <section className="stats">
                <div className="stat-item">
                    <h3>500+</h3>
                    <p>Members</p>
                </div>
                <div className="stat-item">
                    <h3>20+</h3>
                    <p>Trainers</p>
                </div>
                <div className="stat-item">
                    <h3>30+</h3>
                    <p>Classes Weekly</p>
                </div>
                <div className="stat-item">
                    <h3>24/7</h3>
                    <p>Access Available</p>
                </div>
            </section>

            {/* Live Class Schedule */}
            <section className="live-schedule">
                <h2>Today’s Classes</h2>
                <div className="schedule-list">
                    {todayClasses.map((classItem, index) => (
                        <div key={index} className="schedule-item">
                            <FaCalendar className="schedule-icon" />
                            <p>{classItem.time} - {classItem.name}</p>
                            <button className="book-now">Book</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section className="features">
                <h2>Why Choose GymFit?</h2>
                <p className="features-intro">
                    Elevate your fitness game with unrivaled amenities and cutting-edge services designed to inspire greatness.
                </p>

                <div className="feature-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature">
                            <div className="feature-header">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                            </div>
                            <p>{feature.description}</p>
                            <button className="learn-more">Explore</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Member Spotlight */}
            <section className="member-spotlight">
                <h2>Member Spotlight</h2>
                <div className="spotlight-content">
                    <img src={memberSpotlight.photo} alt={memberSpotlight.name} className="spotlight-photo" />
                    <div className="spotlight-text">
                        <h3>{memberSpotlight.name}</h3>
                        <p>"{memberSpotlight.story}"</p>
                        <button className="cta-button">Read More Stories</button>
                    </div>
                </div>
            </section>

            {/* Interactive Gym Tour */}
            <section className="gym-tour">
                <h2>Take a Virtual Tour</h2>
                <div className="tour-container">
                    <div className="tour-placeholder" style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1398933994/photo/fit-grinning-woman-exercising-on-sports-machine-wearing-vr-headset-having-cardio-workout.jpg?s=612x612&w=0&k=20&c=MiTw4Ky9L4AIrqbbu3kiCjgofP0hOl0euqyucm1UX7g=)' }}>
                        <button className="tour-button" style={{ top: '20%', left: '30%' }}>Cardio Zone</button>
                        <button className="tour-button" style={{ top: '60%', left: '70%' }}>Weight Room</button>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <h2>Ready to Transform Your Life?</h2>
                <p>Sign up today and get your first week free!</p>
                <button className="cta-button">Get Started</button>
            </section>
        </div>
    );
}

export default Home;