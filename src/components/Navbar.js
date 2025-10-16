import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaUser, FaSearch, FaBell, FaSun, FaMoon, FaSignOutAlt, FaCog, FaTimes,
    FaShoppingCart, FaGlobe, FaBars
} from 'react-icons/fa';

function Navbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Gym Membership", price: 49 },
        { id: 2, name: "Personal Training", price: 50 }
    ]);

    useEffect(() => {
        const fetchNotifications = () => {
            const newNotifications = [
                { id: 1, message: "New class scheduled for tomorrow!", timestamp: new Date().toLocaleTimeString() },
                { id: 2, message: "Your booking is confirmed.", timestamp: new Date().toLocaleTimeString() }
            ];
            setNotifications(newNotifications);
        };
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search query:", searchQuery);
        setSearchQuery('');
        setIsSearchOpen(false);
    };
    const clearNotification = (id) => setNotifications(notifications.filter(notif => notif.id !== id));
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };
    const removeCartItem = (id) => setCartItems(cartItems.filter(item => item.id !== id));
    const changeLanguage = (lang) => {
        setLanguage(lang);
        console.log("Language changed to:", lang);
    };

    return (
        <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
            <div className="navbar-brand">
                <h1><Link to="/">GymFit</Link></h1>
                <button className="menu-toggle" onClick={toggleMenu}><FaBars /></button>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/classes" onClick={toggleMenu}>Classes</Link></li>
                <li><Link to="/membership" onClick={toggleMenu}>Membership</Link></li>
                <li><Link to="/trainers" onClick={toggleMenu}>Trainers</Link></li>
                <li><Link to="/gallery" onClick={toggleMenu}>Gallery</Link></li>
                <li><Link to="/booking" onClick={toggleMenu}>Book Now</Link></li>
                <li><Link to="/bmi-calculator" onClick={toggleMenu}>BMI Calculator</Link></li>
                <li><Link to="/workout-tracker" onClick={toggleMenu}>Workout Tracker</Link></li>
                <li><Link to="/testimonials" onClick={toggleMenu}>Testimonials</Link></li> {/* New */}
                <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                
                <li className="nav-item search-item">
                    <button className="icon-btn" onClick={toggleSearch}><FaSearch /></button>
                    {isSearchOpen && (
                        <form onSubmit={handleSearch} className="search-form">
                            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
                            <button type="submit">Go</button>
                        </form>
                    )}
                </li>
                <li className="nav-item notification-item">
                    <button className="icon-btn">
                        <FaBell />
                        {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
                    </button>
                    {notifications.length > 0 && (
                        <div className="notification-dropdown">
                            {notifications.map(notif => (
                                <div key={notif.id} className="notification">
                                    <p>{notif.message} <small>({notif.timestamp})</small></p>
                                    <button className="clear-notif" onClick={() => clearNotification(notif.id)}><FaTimes /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </li>
                <li className="nav-item cart-item">
                    <button className="icon-btn" onClick={toggleCart}>
                        <FaShoppingCart />
                        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                    </button>
                    {isCartOpen && (
                        <div className="cart-dropdown">
                            {cartItems.length === 0 ? (
                                <p>Cart is empty</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <p>{item.name} - ${item.price}</p>
                                        <button className="remove-cart" onClick={() => removeCartItem(item.id)}><FaTimes /></button>
                                    </div>
                                ))
                            )}
                            {cartItems.length > 0 && <Link to="/checkout" className="checkout-btn" onClick={toggleCart}>Checkout</Link>}
                        </div>
                    )}
                </li>
                <li className="nav-item language-switcher">
                    <button className="icon-btn"><FaGlobe /> {language}</button>
                    <div className="language-dropdown">
                        <button onClick={() => changeLanguage('EN')}>EN</button>
                        <button onClick={() => changeLanguage('ES')}>ES</button>
                        <button onClick={() => changeLanguage('FR')}>FR</button>
                    </div>
                </li>
                <li className="nav-item theme-toggle">
                    <button className="icon-btn" onClick={toggleTheme}>{isDarkMode ? <FaSun /> : <FaMoon />}</button>
                </li>
                <li className="nav-item profile-item">
                    <button className="icon-btn" onClick={toggleProfile}><FaUser /></button>
                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <Link to="/profile" onClick={toggleProfile}><FaUser /> Profile</Link>
                            <Link to="/settings" onClick={toggleProfile}><FaCog /> Settings</Link>
                            <Link to="/logout" onClick={toggleProfile}><FaSignOutAlt /> Logout</Link>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;