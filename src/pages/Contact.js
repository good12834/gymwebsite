import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaPlus, FaMinus } from 'react-icons/fa';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const faqs = [
        { question: "What are your opening hours?", answer: "Mon-Fri: 6AM-10PM, Sat-Sun: 8AM-8PM" },
        { question: "How do I cancel a booking?", answer: "Visit the Booking page and use the Cancel button next to your session." },
        { question: "Do you offer trial memberships?", answer: "Yes, we offer a 7-day free trial. Sign up on the Membership page!" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: '' }); // Clear errors on change
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.message.trim()) errors.message = "Message is required";
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            console.log("Contact Form Submitted:", formData);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3s
        } else {
            setFormErrors(errors);
        }
    };

    const toggleFAQ = (index) => setExpandedFAQ(expandedFAQ === index ? null : index);

    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <p className="contact-intro">We’re here to help! Reach out with any questions or feedback.</p>

            {/* Contact Form */}
            <section className="contact-form-section">
                <h3>Get in Touch</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.name && <span className="error">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Message:</label>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.message && <span className="error">{formErrors.message}</span>}
                    </div>
                    <button type="submit" className="submit-btn"><FaEnvelope /> Send Message</button>
                </form>
                {isSubmitted && (
                    <div className="confirmation-message">

                        <p>Message sent successfully! We’ll get back to you soon.</p>
                    </div>
                )}
            </section>

            {/* Gym Location Map */}
            <section className="contact-map">
                <h3>Our Location</h3>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509506!2d144.9537363153167!3d-37.8162799797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d9f5e2b8b1e!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1635787890123!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen=""
                        loading="lazy"
                        title="GymFit Location"
                    ></iframe>
                    <p><FaMapMarkerAlt /> 123 Fitness St, Gym City</p>
                    <p><FaPhone /> (555) 123-4567</p>
                </div>
            </section>

            {/* Social Media Links */}
            <section className="contact-social">
                <h3>Connect With Us</h3>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="contact-faq">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h4 onClick={() => toggleFAQ(index)}>
                                {faq.question}
                                <span>{expandedFAQ === index ? <FaMinus /> : <FaPlus />}</span>
                            </h4>
                            {expandedFAQ === index && <p>{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Contact;