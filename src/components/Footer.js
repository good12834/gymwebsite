import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaArrowUp, FaClock, FaBlog, FaComment, FaSitemap, FaComments } from 'react-icons/fa';

function Footer() {
    const [newsEmail, setNewsEmail] = useState("");
    const [formStatus, setFormStatus] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [feedbackForm, setFeedbackForm] = useState({ name: '', message: '' });
    const [showFeedback, setShowFeedback] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);

    const openingHours = {
        "Monday": { open: "06:00", close: "22:00" },
        "Tuesday": { open: "06:00", close: "22:00" },
        "Wednesday": { open: "06:00", close: "22:00" },
        "Thursday": { open: "06:00", close: "22:00" },
        "Friday": { open: "06:00", close: "22:00" },
        "Saturday": { open: "08:00", close: "20:00" },
        "Sunday": { open: "08:00", close: "20:00" },
    };

    const footerLinks = [
        { label: "Home", path: "/" },
        { label: "Classes", path: "/classes" },
        { label: "Membership", path: "/membership" },
        { label: "Trainers", path: "/trainers" },
        { label: "Gallery", path: "/gallery" },
        { label: "Book Now", path: "/booking" },
    ];

    const siteMap = [
        { label: "About Us", path: "/about" },
        { label: "FAQ", path: "/faq" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Contact Us", path: "/contact" },
        { label: "Testimonials", path: "/testimonials" },
        { label: "BMI Calculator", path: "/bmi-calculator" },
        { label: "Workout Tracker", path: "/workout-tracker" },
    ];

    const recentBlogs = [
        { title: "Top 5 Cardio Workouts", path: "/blog/cardio", date: "2025-02-20" },
        { title: "Nutrition Tips for Beginners", path: "/blog/nutrition", date: "2025-02-18" },
        { title: "Strength Training Basics", path: "/blog/strength", date: "2025-02-15" },
    ];

    const socialCounts = {
        facebook: 1200,
        twitter: 850,
        instagram: 2000,
    };

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    const getCurrentStatus = () => {
        const day = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
        const time = currentTime.toTimeString().slice(0, 5);
        const todayHours = openingHours[day];
        if (!todayHours) return "Closed";
        return time >= todayHours.open && time < todayHours.close ? "Open" : "Closed";
    };

    const handleNewsSubmit = (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(newsEmail)) {
            setFormStatus({ type: 'error', message: 'Please enter a valid email address.' });
            setTimeout(() => setFormStatus(null), 3000);
        } else {
            console.log("Newsletter Signup:", newsEmail);
            setFormStatus({ type: 'success', message: 'Subscribed successfully! Check your email for confirmation.' });
            setNewsEmail("");
            setTimeout(() => setFormStatus(null), 5000);
        }
    };

    const handleFeedbackChange = (e) => {
        const { name, value } = e.target;
        setFeedbackForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback Submitted:", feedbackForm);
        setFeedbackForm({ name: '', message: '' });
        setShowFeedback(false);
        alert("Thank you for your feedback!");
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatMessage.trim()) {
            setChatMessages(prev => [...prev, { id: Date.now(), text: chatMessage, sender: 'You' }]);
            // Simulated auto-response
            setTimeout(() => {
                setChatMessages(prev => [...prev, { id: Date.now() + 1, text: "Thanks for your message! How can we assist you today?", sender: 'Support' }]);
            }, 1000);
            setChatMessage('');
        }
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section contact-info">
                    <h3>GymFit</h3>
                    <p><FaMapMarkerAlt /> 123 Fitness St, Gym City</p>
                    <p><FaPhone /> (555) 123-4567</p>
                    <p><FaEnvelope /> info@gymfit.com</p>
                </div>

                <div className="footer-section footer-links">
                    <h3>Explore</h3>
                    <ul>
                        {footerLinks.map((link, index) => (
                            <li key={index}><a href={link.path}>{link.label}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section newsletter">
                    <h3>Stay Updated</h3>
                    <form onSubmit={handleNewsSubmit} className="news-form">
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={newsEmail}
                            onChange={(e) => setNewsEmail(e.target.value)}
                            required
                        />
                        <button type="submit" aria-label="Subscribe">Subscribe</button>
                    </form>
                    {formStatus && (
                        <p className={`news-feedback ${formStatus.type}`}>
                            {formStatus.message}
                        </p>
                    )}
                </div>

                <div className="footer-section social-links">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF /> <span>{socialCounts.facebook} Followers</span>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter /> <span>{socialCounts.twitter} Followers</span>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram /> <span>{socialCounts.instagram} Followers</span>
                        </a>
                    </div>
                </div>

                <div className="footer-section live-hours">
                    <h3>Live Hours</h3>
                    <p><FaClock /> {getCurrentStatus()} Now</p>
                    <p>{currentTime.toLocaleDateString('en-US', { weekday: 'long' })}: {openingHours[currentTime.toLocaleDateString('en-US', { weekday: 'long' })]?.open} - {openingHours[currentTime.toLocaleDateString('en-US', { weekday: 'long' })]?.close}</p>
                </div>

                <div className="footer-section recent-blogs">
                    <h3><FaBlog /> Recent Blogs</h3>
                    <ul>
                        {recentBlogs.map((blog, index) => (
                            <li key={index}>
                                <a href={blog.path}>{blog.title}</a>
                                <span>{blog.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section feedback">
                    <h3><FaComment /> Quick Feedback</h3>
                    <button className="feedback-btn" onClick={() => setShowFeedback(!showFeedback)}>
                        {showFeedback ? 'Close' : 'Give Feedback'}
                    </button>
                    {showFeedback && (
                        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={feedbackForm.name}
                                onChange={handleFeedbackChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Your Feedback"
                                value={feedbackForm.message}
                                onChange={handleFeedbackChange}
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>

                {/* Site Map */}
                <div className="footer-section site-map">
                    <h3><FaSitemap /> Site Map</h3>
                    <ul>
                        {siteMap.map((link, index) => (
                            <li key={index}><a href={link.path}>{link.label}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Live Chat */}
                <div className="footer-section live-chat">
                    <h3><FaComments /> Live Chat</h3>
                    <button className="chat-btn" onClick={() => setShowChat(!showChat)}>
                        {showChat ? 'Close Chat' : 'Chat Now'}
                    </button>
                    {showChat && (
                        <div className="chat-box">
                            <div className="chat-messages">
                                {chatMessages.map(msg => (
                                    <div key={msg.id} className={`chat-message ${msg.sender === 'You' ? 'user' : 'support'}`}>
                                        <p>{msg.text}</p>
                                        <span>{new Date(msg.id).toLocaleTimeString()}</span>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleChatSubmit} className="chat-form">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <button className="back-to-top" onClick={scrollToTop}><FaArrowUp /></button>
            <div className="footer-bottom">
                <p>© 2025 GymFit. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;