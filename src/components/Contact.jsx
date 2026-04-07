import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: null, error: null });

    useEffect(() => {
        AOS.init({ duration: 1200, easing: "ease-out-back", once: true });
    }, []);

    const checkMessageLimit = () => {
        const emailLimitData = JSON.parse(localStorage.getItem("emailLimits")) || {};
        const userEmail = formData.email;
        const today = new Date().toISOString().split('T')[0];
        if (emailLimitData[userEmail] && emailLimitData[userEmail].date === today) {
            return emailLimitData[userEmail].count >= 3;
        }
        return false;
    };

    const updateMessageCount = () => {
        const emailLimitData = JSON.parse(localStorage.getItem("emailLimits")) || {};
        const userEmail = formData.email;
        const today = new Date().toISOString().split('T')[0];
        if (emailLimitData[userEmail] && emailLimitData[userEmail].date === today) {
            emailLimitData[userEmail].count += 1;
        } else {
            emailLimitData[userEmail] = { count: 1, date: today };
        }
        localStorage.setItem("emailLimits", JSON.stringify(emailLimitData));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkMessageLimit()) {
            setStatus({ loading: false, success: null, error: "Daily limit reached (3/3). Try again tomorrow." });
            return;
        }
        setStatus({ loading: true, success: null, error: null });
        emailjs.send('service_iytf57c', 'template_loii407', formData, 'yXoQAl-S7xEexV7CC')
            .then(() => {
                updateMessageCount();
                setStatus({ loading: false, success: 'Message sent! I will connect with you soon.', error: null });
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus({ loading: false, success: null, error: null }), 6000);
            })
            .catch(() => {
                setStatus({ loading: false, success: null, error: 'Network error. Please try again later.' });
            });
    };

    return (
        <section id="contact" className="contact section">
            <div className="container section-title" data-aos="fade-up">
                <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Start a Conversation</h2>
                <p className="section-subtitle">Let's discuss how we can build high-performance backend systems for your business.</p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="200">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="contact-card glass-v2 p-5 p-md-5" style={{ borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input 
                                                type="text" 
                                                name="name" 
                                                className="form-control text-white border-0 glass-v2" 
                                                id="nameInput"
                                                placeholder="Name" 
                                                required 
                                                value={formData.name} 
                                                onChange={handleChange}
                                                style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px' }}
                                            />
                                            <label htmlFor="nameInput" className="text-muted">Full Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input 
                                                type="email" 
                                                className="form-control text-white border-0 glass-v2" 
                                                name="email" 
                                                id="emailInput"
                                                placeholder="Email" 
                                                required 
                                                value={formData.email} 
                                                onChange={handleChange}
                                                style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px' }}
                                            />
                                            <label htmlFor="emailInput" className="text-muted">Email Address</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input 
                                                type="text" 
                                                className="form-control text-white border-0 glass-v2" 
                                                name="subject" 
                                                id="subjectInput"
                                                placeholder="Subject" 
                                                required 
                                                value={formData.subject} 
                                                onChange={handleChange}
                                                style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px' }}
                                            />
                                            <label htmlFor="subjectInput" className="text-muted">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea 
                                                className="form-control text-white border-0 glass-v2" 
                                                name="message" 
                                                id="messageInput"
                                                placeholder="Message" 
                                                style={{ height: '200px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px' }} 
                                                required 
                                                value={formData.message} 
                                                onChange={handleChange}
                                            ></textarea>
                                            <label htmlFor="messageInput" className="text-muted">Detailed Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center mt-5">
                                        {status.loading && <div className="text-primary mb-4 fw-bold">Connecting with server...</div>}
                                        {status.error && <div className="alert bg-danger text-white border-0 mb-4 px-4 py-3" style={{ borderRadius: '16px' }}>{status.error}</div>}
                                        {status.success && <div className="alert bg-success text-white border-0 mb-4 px-4 py-3" style={{ borderRadius: '16px' }}>{status.success}</div>}

                                        <button type="submit" disabled={status.loading} className="btn btn-premium w-100 py-4 shadow-lg" style={{ fontSize: '1.2rem' }}>
                                            Dispatch Message <i className="bi bi-send-fill ms-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;