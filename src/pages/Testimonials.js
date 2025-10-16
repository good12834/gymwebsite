import React, { useState, useEffect } from 'react';
import { FaStar, FaFilter, FaQuoteLeft, FaPlus, FaChevronLeft, FaChevronRight, FaHeart, FaSearch, FaCheck, FaTimes, FaSort, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Testimonials() {
    const initialTestimonials = [
        { id: 1, name: "Emily R.", text: "The trainers here are amazing! Totally transformed my fitness journey.", rating: 5, date: "2025-02-20", URL: "https://cdn.pixabay.com/photo/2022/05/16/14/47/woman-7200534_640.jpg", likes: 10, category: "Trainers", approved: true, tags: ["Member", "Advanced"] },
        { id: 2, name: "Tom K.", text: "Great classes and a supportive community. Highly recommend!", rating: 4, date: "2025-02-21", URL: "https://cdn.pixabay.com/photo/2017/06/30/21/02/muscle-2459720_640.jpg", likes: 8, category: "Classes", approved: true, tags: ["Member"] },
        { id: 3, name: "Lisa P.", text: "Good facilities, but the schedule could be more flexible.", rating: 3, date: "2025-02-19", URL: "https://cdn.pixabay.com/photo/2015/07/02/10/23/training-828741_640.jpg", likes: 5, category: "Facilities", approved: true, tags: ["Beginner"] },
        { id: 4, name: "Jake M.", text: "Best gym experience I've ever had!", rating: 5, date: "2025-02-22", URL: "https://cdn.pixabay.com/photo/2020/09/29/12/51/man-5612736_640.jpg", likes: 12, category: "Classes", approved: true, tags: ["Member", "Advanced"] },
    ];

    const [testimonials, setTestimonials] = useState(() => {
        const saved = localStorage.getItem('testimonials');
        const data = saved ? JSON.parse(saved) : initialTestimonials;
        // Ensure every testimonial has a tags array
        return data.map(t => ({ ...t, tags: t.tags || [] }));
    });
    const [formData, setFormData] = useState({ name: '', text: '', rating: 5, photo: null, category: 'Classes', approved: false, tags: [] });
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [filterRating, setFilterRating] = useState("All");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterTag, setFilterTag] = useState("All");
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState("date");
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;
    const [showForm, setShowForm] = useState(false);
    const [likes, setLikes] = useState(() => {
        const savedLikes = localStorage.getItem('testimonialLikes');
        return savedLikes ? JSON.parse(savedLikes) : initialTestimonials.reduce((acc, t) => ({ ...acc, [t.id]: t.likes }), {});
    });

    const categories = ["All", "Classes", "Trainers", "Facilities"];
    const tags = ["All", "Member", "Beginner", "Advanced"];
    const featuredTestimonial = testimonials.filter(t => t.approved).length > 0
        ? testimonials.filter(t => t.approved).reduce((prev, curr) =>
            prev.rating > curr.rating ? prev : curr.rating === prev.rating ? (new Date(prev.date) > new Date(curr.date) ? prev : curr) : curr
        )
        : null;

    const filteredTestimonials = testimonials.filter(t =>
        t.approved &&
        (filterRating === "All" || t.rating >= parseInt(filterRating)) &&
        (filterCategory === "All" || t.category === filterCategory) &&
        (filterTag === "All" || (t.tags || []).includes(filterTag)) &&
        (searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.text.toLowerCase().includes(searchQuery.toLowerCase()))
    ).sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'likes') return likes[b.id] - likes[a.id];
        return new Date(b.date) - new Date(a.date);
    });

    const paginatedTestimonials = filteredTestimonials.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);

    useEffect(() => {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }, [testimonials]);

    useEffect(() => {
        localStorage.setItem('testimonialLikes', JSON.stringify(likes));
    }, [likes]);

    useEffect(() => {
        if (paginatedTestimonials.length > 0) {
            setCurrentTestimonial((prev) => Math.min(prev, paginatedTestimonials.length - 1));
        } else {
            setCurrentTestimonial(0);
        }
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => paginatedTestimonials.length > 0 ? (prev + 1) % paginatedTestimonials.length : 0);
        }, 5000);
        return () => clearInterval(interval);
    }, [paginatedTestimonials.length]);

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        if (name === 'tags') {
            setFormData(prev => ({
                ...prev,
                tags: checked ? [...prev.tags, value] : prev.tags.filter(tag => tag !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: files ? files[0] : type === 'checkbox' ? checked : name === 'rating' ? parseInt(value) : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTestimonial = {
            ...formData,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            photo: formData.photo ? URL.createObjectURL(formData.photo) : 'default-user.jpg',
            likes: 0,
            approved: false,
            tags: formData.tags || [] // Ensure tags is always an array
        };
        setTestimonials(prev => [...prev, newTestimonial]);
        setLikes(prev => ({ ...prev, [newTestimonial.id]: 0 }));
        setFormData({ name: '', text: '', rating: 5, photo: null, category: 'Classes', approved: false, tags: [] });
        setShowForm(false);
        document.getElementById('photoInput').value = '';
    };

    const toggleLike = (id) => {
        setLikes(prev => ({ ...prev, [id]: prev[id] + (prev[id] % 2 === 0 ? 1 : -1) }));
    };

    const toggleApproval = (id) => {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: !t.approved } : t));
    };

    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + paginatedTestimonials.length) % paginatedTestimonials.length);
    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % paginatedTestimonials.length);

    return (
        <div className="testimonials">
            <h2>Testimonials</h2>
            <p className="testimonials-intro">Hear what our members have to say about their GymFit experience!</p>

            {/* Testimonial Submission Form */}
            <section className="testimonial-form-section">
                <button className="add-testimonial-btn" onClick={() => setShowForm(!showForm)}>
                    <FaPlus /> {showForm ? 'Cancel' : 'Add Your Testimonial'}
                </button>
                {showForm && (
                    <div className="testimonial-form-card">
                        <form onSubmit={handleSubmit} className="testimonial-form">
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Photo (optional):</label>
                                <input type="file" id="photoInput" name="photo" accept="image/*" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <select name="category" value={formData.category} onChange={handleChange}>
                                    {categories.slice(1).map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tags (select all that apply):</label>
                                <div className="tags-group">
                                    {tags.slice(1).map((tag, index) => (
                                        <label key={index}>
                                            <input
                                                type="checkbox"
                                                name="tags"
                                                value={tag}
                                                checked={formData.tags.includes(tag)}
                                                onChange={handleChange}
                                            />
                                            {tag}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Testimonial:</label>
                                <textarea name="text" placeholder="Your Experience" value={formData.text} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Rating:</label>
                                <select name="rating" value={formData.rating} onChange={handleChange}>
                                    {[1, 2, 3, 4, 5].map(r => (
                                        <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="submit-testimonial-btn"><FaPlus /> Submit</button>
                        </form>
                    </div>
                )}
            </section>

            {/* Filters, Search, and Sorting */}
            <section className="filters-section">
                <div className="filter-group">
                    <h3><FaFilter /> Filter by Rating</h3>
                    <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                        <option value="All">All Ratings</option>
                        {[5, 4, 3].map(r => (
                            <option key={r} value={r}>{r}+ Stars</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <h3><FaFilter /> Filter by Category</h3>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <h3><FaFilter /> Filter by Tag</h3>
                    <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
                        {tags.map((tag, index) => (
                            <option key={index} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
                <div className="search-group">
                    <h3><FaSearch /> Search Testimonials</h3>
                    <input
                        type="text"
                        placeholder="Search by name or text..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="sort-group">
                    <h3><FaSort /> Sort By</h3>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="date">Date (Newest)</option>
                        <option value="rating">Rating (Highest)</option>
                        <option value="likes">Likes (Most)</option>
                    </select>
                </div>
            </section>

            {/* Featured Testimonial Spotlight */}
            <section className="featured-testimonial">
                <h3>Featured Testimonial</h3>
                {featuredTestimonial ? (
                    <div className="featured-card">
                        <img src={'https://cdn.pixabay.com/photo/2020/09/29/12/51/man-5612736_640.jpg'} alt={featuredTestimonial.name} className="user-photo" />
                        <FaQuoteLeft className="quote-icon" />
                        <p>{featuredTestimonial.text}</p>
                        <div className="rating">
                            {Array(featuredTestimonial.rating).fill().map((_, i) => <FaStar key={i} />)}
                        </div>
                        <h4>- {featuredTestimonial.name}</h4>
                        <p className="category">{featuredTestimonial.category}</p>
                        <p className="tags">{(featuredTestimonial.tags || []).join(', ')}</p>
                        <p className="date">{featuredTestimonial.date}</p>
                        <div className="like-section">
                            <button className="like-btn" onClick={() => toggleLike(featuredTestimonial.id)}>
                                <FaHeart className={likes[featuredTestimonial.id] % 2 === 1 ? 'liked' : ''} />
                            </button>
                            <span>{likes[featuredTestimonial.id]}</span>
                        </div>
                        <button
                            className={`approval-btn ${featuredTestimonial.approved ? 'approved' : ''}`}
                            onClick={() => toggleApproval(featuredTestimonial.id)}
                        >
                            {featuredTestimonial.approved ? <FaCheck /> : <FaTimes />} {featuredTestimonial.approved ? 'Approved' : 'Pending'}
                        </button>
                    </div>
                ) : (
                    <p>No approved testimonials available.</p>
                )}
            </section>

            {/* Testimonial Carousel */}
            <section className="testimonial-carousel-section">
                <h3>Testimonial Carousel</h3>
                {paginatedTestimonials.length > 0 ? (
                    <>
                        <div className="carousel">
                            <button className="carousel-arrow left" onClick={prevTestimonial}><FaChevronLeft /></button>
                            <div className="carousel-card">
                                <img src={'https://cdn.pixabay.com/photo/2024/02/09/13/26/ai-generated-8563109_640.jpg'} alt={paginatedTestimonials[currentTestimonial].name} className="user-photo" />
                                <FaQuoteLeft className="quote-icon" />
                                <p>{paginatedTestimonials[currentTestimonial].text}</p>
                                <div className="rating">
                                    {Array(paginatedTestimonials[currentTestimonial].rating).fill().map((_, i) => <FaStar key={i} />)}
                                </div>
                                <h4>- {paginatedTestimonials[currentTestimonial].name}</h4>
                                <p className="category">{paginatedTestimonials[currentTestimonial].category}</p>
                                <p className="tags">{(paginatedTestimonials[currentTestimonial].tags || []).join(', ')}</p>
                                <p className="date">{paginatedTestimonials[currentTestimonial].date}</p>
                                <div className="like-section">
                                    <button className="like-btn" onClick={() => toggleLike(paginatedTestimonials[currentTestimonial].id)}>
                                        <FaHeart className={likes[paginatedTestimonials[currentTestimonial].id] % 2 === 1 ? 'liked' : ''} />
                                    </button>
                                    <span>{likes[paginatedTestimonials[currentTestimonial].id]}</span>
                                </div>
                                <button
                                    className={`approval-btn ${paginatedTestimonials[currentTestimonial].approved ? 'approved' : ''}`}
                                    onClick={() => toggleApproval(paginatedTestimonials[currentTestimonial].id)}
                                >
                                    {paginatedTestimonials[currentTestimonial].approved ? <FaCheck /> : <FaTimes />} {paginatedTestimonials[currentTestimonial].approved ? 'Approved' : 'Pending'}
                                </button>
                            </div>
                            <button className="carousel-arrow right" onClick={nextTestimonial}><FaChevronRight /></button>
                        </div>
                        <div className="pagination">
                            <button
                                className="page-btn"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                <FaArrowLeft />
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                className="page-btn"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No testimonials match your criteria.</p>
                )}
            </section>

            {/* Moderation Queue */}
            <section className="moderation-queue">
                <h3>Pending Testimonials</h3>
                {testimonials.filter(t => !t.approved).length === 0 ? (
                    <p>No pending testimonials.</p>
                ) : (
                    <div className="queue-list">
                        {testimonials.filter(t => !t.approved).map(t => (
                            <div key={t.id} className="queue-card">
                                <p>{t.text}</p>
                                <h4>- {t.name}</h4>
                                <p className="category">{t.category}</p>
                                <p className="tags">{(t.tags || []).join(', ')}</p>
                                <p className="date">{t.date}</p>
                                <button className="approve-btn" onClick={() => toggleApproval(t.id)}><FaCheck /> Approve</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Testimonials;