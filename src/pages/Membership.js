import React, { useState, useEffect } from 'react';
import { FaCheck, FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaComment, FaToggleOn, FaToggleOff, FaClock, FaUsers, FaDumbbell, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Membership() {
    const navigate = useNavigate();

    const plans = [
        { name: "Basic", price: "$29/mo", features: ["Gym Access", "Locker Room Access"], color: "#ff6200" },
        { name: "Pro", price: "$49/mo", features: ["Gym Access", "All Classes", "Locker Room Access"], color: "#e55a00" },
        { name: "Elite", price: "$79/mo", features: ["Gym Access", "All Classes", "Personal Training", "Nutrition Plan", "VIP Locker"], color: "#d9534f" },
    ];

    const benefits = [
        { title: "Flexible Scheduling", description: "Access the gym 24/7 or join classes at your convenience." },
        { title: "Expert Support", description: "Get guidance from certified trainers and nutritionists." },
        { title: "Community Vibes", description: "Join a supportive fitness family that motivates you." },
        { title: "Top-Tier Gear", description: "Work out with the latest equipment and tech." },
    ];

    const testimonials = [
        { name: "Emily R.", text: "The Pro plan transformed my routine—classes are a game-changer!", rating: 5 },
        { name: "Tom K.", text: "Elite membership is worth every penny with personal training.", rating: 5 },
        { name: "Lisa P.", text: "Basic plan fits my budget and still gives me everything I need.", rating: 4 },
    ];

    const faqs = [
        { question: "Can I switch plans later?", answer: "Yes, you can upgrade or downgrade anytime." },
        { question: "Is there a contract?", answer: "No long-term contracts—cancel anytime with 30 days’ notice." },
        { question: "What’s included in the trial?", answer: "Full access to gym and classes for 7 days." },
    ];

    const perks = [
        { title: "24/7 Access", description: "Workout anytime, day or night.", icon: <FaClock /> },
        { title: "Group Motivation", description: "Thrive with class camaraderie.", icon: <FaUsers /> },
        { title: "Pro Equipment", description: "Top gear for top results.", icon: <FaDumbbell /> },
    ];

    const [formData, setFormData] = useState({ name: "", email: "" });
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState("");
    const [showComparison, setShowComparison] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Trial Sign-Up:", formData);
        setFormData({ name: "", email: "" });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);

    const handlePayment = (plan) => {
        setSelectedPlan(plan);
        console.log(`Processing payment for ${plan.name} - ${plan.price}`);
        setTimeout(() => {
            alert(`Payment successful for ${plan.name}! Redirecting to signup...`);
            setSelectedPlan(null);
            navigate('/signup', { state: { plan: plan.name } });
        }, 2000);
    };

    const sendChatMessage = () => {
        console.log("Chat Message:", chatMessage);
        setChatMessage("");
    };

    return (
        <div className="membership">
            <h2>Membership Options</h2>
            <p className="membership-intro">Choose your perfect plan and unlock a world of fitness possibilities!</p>

            {/* Plan Comparison Toggle */}
            <section className="plan-comparison">
                <button className="toggle-comparison" onClick={() => setShowComparison(!showComparison)}>
                    {showComparison ? <FaToggleOff /> : <FaToggleOn />} {showComparison ? "Hide Comparison" : "Compare Plans"}
                </button>
                {showComparison && (
                    <div className="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    {plans.map((plan, index) => (
                                        <th key={index} style={{ color: plan.color }}>{plan.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {["Gym Access", "Locker Room Access", "All Classes", "Personal Training", "Nutrition Plan", "VIP Locker"].map((feature, i) => (
                                    <tr key={i}>
                                        <td>{feature}</td>
                                        {plans.map((plan, index) => (
                                            <td key={index}>{plan.features.includes(feature) ? <FaCheck style={{ color: plan.color }} /> : '-'}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* Pricing Table */}
            <section className="pricing-table">
                <div className="plans-grid">
                    {plans.map((plan, index) => (
                        <div key={index} className="plan-card" style={{ borderColor: plan.color }}>
                            <h3>{plan.name}</h3>
                            <p className="price">{plan.price}</p>
                            <ul>
                                {plan.features.map((feature, i) => (
                                    <li key={i}><FaCheck /> {feature}</li>
                                ))}
                            </ul>
                            <button
                                className="join-now"
                                style={{ backgroundColor: plan.color }}
                                onClick={() => handlePayment(plan)}
                                disabled={selectedPlan !== null}
                            >
                                {selectedPlan === plan ? "Processing..." : "Join Now"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Membership Benefits */}
            <section className="benefits">
                <h3>Why Join GymFit?</h3>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <h4>{benefit.title}</h4>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Membership Perks Highlights */}
            <section className="perks-highlights">
                <h3>Membership Perks</h3>
                <div className="perks-grid">
                    {perks.map((perk, index) => (
                        <div key={index} className="perk-card">
                            <div className="perk-icon">{perk.icon}</div>
                            <h4>{perk.title}</h4>
                            <p>{perk.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Carousel */}
            <section className="testimonials">
                <h3>What Our Members Say</h3>
                <div className="testimonial-carousel">
                    <button className="carousel-arrow left" onClick={prevTestimonial}><FaChevronLeft /></button>
                    <div className="testimonial-card">
                        <FaQuoteLeft className="quote-icon" />
                        <p>{testimonials[currentTestimonial].text}</p>
                        <div className="rating">
                            {Array(testimonials[currentTestimonial].rating).fill().map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <h4>- {testimonials[currentTestimonial].name}</h4>
                    </div>
                    <button className="carousel-arrow right" onClick={nextTestimonial}><FaChevronRight /></button>
                    <div className="carousel-dots">
                        {testimonials.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                                onClick={() => setCurrentTestimonial(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Progress Tracker Preview */}
            <section className="progress-tracker">
                <h3>Track Your Journey</h3>
                <p>See how GymFit helps you monitor your fitness progress.</p>
                <div className="tracker-preview">
                    <div className="tracker-item">
                        <FaChartLine />
                        <p>Weight Lifted: 500 lbs</p>
                    </div>
                    <div className="tracker-item">
                        <FaChartLine />
                        <p>Classes Attended: 12</p>
                    </div>
                    <div className="tracker-item">
                        <FaChartLine />
                        <p>Goals Met: 3</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h4 onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}>
                                {faq.question}
                                <span>{expandedFAQ === index ? '-' : '+'}</span>
                            </h4>
                            {expandedFAQ === index && <p>{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Trial Sign-Up Form */}
            <section className="trial-signup">
                <h3>Try Us Free for 7 Days!</h3>
                <p>Experience GymFit with no commitment—sign up for your free trial today.</p>
                <form onSubmit={handleSubmit} className="trial-form">
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    <button type="submit" className="cta-button">Start Free Trial</button>
                </form>
            </section>

            {/* Live Chat Widget */}
            <div className={`live-chat ${chatOpen ? 'open' : ''}`}>
                <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)}>
                    <FaComment /> {chatOpen ? 'Close Chat' : 'Chat with Us'}
                </button>
                {chatOpen && (
                    <div className="chat-box">
                        <div className="chat-header">Live Chat</div>
                        <div className="chat-messages">
                            <p>Welcome! How can we assist you today?</p>
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Type your message..."
                                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                            />
                            <button onClick={sendChatMessage}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Membership;

