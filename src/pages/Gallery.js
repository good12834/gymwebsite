import React, { useState, useEffect } from 'react';
import { FaFilter, FaChevronLeft, FaChevronRight, FaExpand, FaHeart, FaComment, FaShareAlt, FaSort } from 'react-icons/fa';

function Gallery() {
    // Sample gallery data with likes, dates, and comments
    const initialImages = [
        { id: 1, url: "https://cdn.pixabay.com/photo/2018/01/21/22/52/dumbbell-3097728_640.jpg", category: "Facilities", caption: "Our spacious gym floor with modern equipment.", likes: 15, date: "2025-02-20", comments: ["Great setup!", "Love the space!"] },
        { id: 2, url: "https://media.istockphoto.com/id/913735656/photo/group-yoga-training.jpg?s=612x612&w=0&k=20&c=P-UYb5wHeFXtHIkFrlEni6FboxESM5jXt_uiworm3V0=", category: "Classes", caption: "Yoga studio during a morning session.", likes: 22, date: "2025-02-21", comments: ["So calming!", "Perfect vibe."] },
        { id: 3, url: "https://cdn.pixabay.com/photo/2015/07/02/10/22/training-828726_640.jpg", category: "Facilities", caption: "Heavy lifting in the weight room.", likes: 18, date: "2025-02-19", comments: ["Beast mode!"] },
        { id: 4, url: "https://cdn.pixabay.com/photo/2020/04/11/15/49/treadmill-5030966_640.jpg", category: "Facilities", caption: "Cardio zone with treadmills and bikes.", likes: 12, date: "2025-02-22", comments: ["Great cardio options."] },
        { id: 5, url: "https://cdn.pixabay.com/photo/2017/01/20/11/44/yoga-1994667_640.jpg", category: "Classes", caption: "High-energy Zumba class in action.", likes: 25, date: "2025-02-23", comments: ["So much fun!", "Love Zumba!"] },
        { id: 6, url: "https://cdn.pixabay.com/photo/2014/09/28/19/50/fitness-465205_640.jpg", category: "Training", caption: "One-on-one training with a pro.", likes: 20, date: "2025-02-18", comments: ["Best trainer ever!"] },
        { id: 7, url: "https://cdn.pixabay.com/photo/2013/02/15/12/04/billy-blanks-81880_640.jpg", category: "Classes", caption: "Group workout pushing limits.", likes: 17, date: "2025-02-24", comments: ["Team spirit!"] },
        { id: 8, url: "https://cdn.pixabay.com/photo/2015/09/11/23/27/woman-936549_1280.jpg", category: "Facilities", caption: "Relaxing in our infrared sauna.", likes: 14, date: "2025-02-25", comments: ["Perfect recovery spot."] },
    ];

    const recentActivities = [
        { id: 1, url: "https://cdn.pixabay.com/photo/2021/01/13/16/46/workout-5914643_640.jpg", title: "Member Appreciation Day", caption: "Celebrating our community!" },
        { id: 2, url: "https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_640.jpg", title: "Fitness Challenge", caption: "Pushing the limits with fun." },
        { id: 3, url: "https://cdn.pixabay.com/photo/2017/08/01/22/44/woman-2568410_640.jpg", title: "Yoga Retreat", caption: "A day of zen and strength." },
    ];

    const [images, setImages] = useState(initialImages);
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date"); // 'date' or 'likes'
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentActivity, setCurrentActivity] = useState(0);
    const [uploadForm, setUploadForm] = useState({ file: null, caption: '', category: 'Facilities' });
    const [imageLikes, setImageLikes] = useState(initialImages.reduce((acc, img) => ({ ...acc, [img.id]: img.likes }), {}));
    const [newComment, setNewComment] = useState('');
    const categories = ["All", "Facilities", "Classes", "Training"];

    const filteredImages = images.filter(image => filter === "All" || image.category === filter)
        .sort((a, b) => sortBy === 'likes' ? imageLikes[b.id] - imageLikes[a.id] : new Date(b.date) - new Date(a.date));

    useEffect(() => {
        const interval = setInterval(() => setCurrentActivity((prev) => (prev + 1) % recentActivities.length), 5000);
        return () => clearInterval(interval);
    }, [recentActivities.length]);

    const prevActivity = () => setCurrentActivity((prev) => (prev - 1 + recentActivities.length) % recentActivities.length);
    const nextActivity = () => setCurrentActivity((prev) => (prev + 1) % recentActivities.length);
    const openLightbox = (image) => setSelectedImage(image);
    const closeLightbox = () => setSelectedImage(null);
    const toggleLike = (imageId) => {
        setImageLikes(prev => ({ ...prev, [imageId]: prev[imageId] + (prev[imageId] % 2 === 0 ? 1 : -1) }));
    };
    const handleUploadChange = (e) => {
        const { name, value, files } = e.target;
        setUploadForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };
    const handleUploadSubmit = (e) => {
        e.preventDefault();
        if (uploadForm.file && uploadForm.caption) {
            const newImage = {
                id: Date.now(),
                url: URL.createObjectURL(uploadForm.file), // Simulated URL
                category: uploadForm.category,
                caption: uploadForm.caption,
                likes: 0,
                date: new Date().toISOString().split('T')[0],
                comments: []
            };
            setImages(prev => [...prev, newImage]);
            setImageLikes(prev => ({ ...prev, [newImage.id]: 0 }));
            setUploadForm({ file: null, caption: '', category: 'Facilities' });
            document.getElementById('fileInput').value = ''; // Reset file input
        }
    };
    const addComment = (imageId) => {
        if (newComment.trim()) {
            setImages(prev => prev.map(img => img.id === imageId ? { ...img, comments: [...img.comments, newComment] } : img));
            setNewComment('');
        }
    };
    const shareImage = (image) => {
        const shareData = {
            title: image.caption,
            text: 'Check out this photo from GymFit!',
            url: window.location.href // Simulated; replace with real image URL
        };
        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log('Share failed:', err));
        } else {
            alert('Sharing not supported on this browser. Copy this URL: ' + shareData.url);
        }
    };

    return (
        <div className="gallery">
            <h2>Gallery</h2>
            <p className="gallery-intro">Explore the heart of GymFit through our vibrant photo collection!</p>

            {/* Photo Upload Form */}
            <section className="upload-form">
                <h3>Share Your Moment</h3>
                <form onSubmit={handleUploadSubmit} className="upload-form-content">
                    <input
                        type="file"
                        id="fileInput"
                        name="file"
                        accept="image/*"
                        onChange={handleUploadChange}
                        required
                    />
                    <input
                        type="text"
                        name="caption"
                        placeholder="Caption"
                        value={uploadForm.caption}
                        onChange={handleUploadChange}
                        required
                    />
                    <select name="category" value={uploadForm.category} onChange={handleUploadChange}>
                        {categories.slice(1).map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <button type="submit">Upload</button>
                </form>
            </section>

            {/* Category Filter and Sorting */}
            <section className="gallery-filter">
                <h3><FaFilter /> Filter & Sort</h3>
                <div className="filter-sort-controls">
                    <div className="filter-buttons">
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="sort-options">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date">Date (Newest)</option>
                            <option value="likes">Likes</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="gallery-grid">
                {filteredImages.map((image) => (
                    <div key={image.id} className="gallery-item">
                        <img
                            src={image.url}
                            alt={image.caption}
                            className="gallery-image"
                            onClick={() => openLightbox(image)}
                        />
                        <div className="caption-overlay">
                            <p>{image.caption}</p>
                            <div className="like-section">
                                <button className="like-btn" onClick={(e) => { e.stopPropagation(); toggleLike(image.id); }}>
                                    <FaHeart className={imageLikes[image.id] % 2 === 1 ? 'liked' : ''} />
                                </button>
                                <span>{imageLikes[image.id]}</span>
                            </div>
                            <button className="expand-btn" onClick={() => openLightbox(image)}><FaExpand /></button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Recent Activity Slider */}
            <section className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-slider">
                    <button className="slider-arrow left" onClick={prevActivity}><FaChevronLeft /></button>
                    <div className="activity-card">
                        <img src={recentActivities[currentActivity].url} alt={recentActivities[currentActivity].title} className="activity-image" />
                        <h4>{recentActivities[currentActivity].title}</h4>
                        <p>{recentActivities[currentActivity].caption}</p>
                    </div>
                    <button className="slider-arrow right" onClick={nextActivity}><FaChevronRight /></button>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-modal" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="close-lightbox" onClick={closeLightbox}>X</button>
                        <img src={selectedImage.url} alt={selectedImage.caption} className="lightbox-image" />
                        <p className="lightbox-caption">{selectedImage.caption}</p>
                        <div className="lightbox-likes">
                            <button className="like-btn" onClick={() => toggleLike(selectedImage.id)}>
                                <FaHeart className={imageLikes[selectedImage.id] % 2 === 1 ? 'liked' : ''} />
                            </button>
                            <span>{imageLikes[selectedImage.id]}</span>
                        </div>
                        <div className="lightbox-comments">
                            <h4>Comments</h4>
                            {selectedImage.comments.map((comment, index) => (
                                <p key={index}>{comment}</p>
                            ))}
                            <div className="comment-form">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button onClick={() => addComment(selectedImage.id)}><FaComment /></button>
                            </div>
                        </div>
                        <button className="share-btn" onClick={() => shareImage(selectedImage)}>
                            <FaShareAlt /> Share
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;