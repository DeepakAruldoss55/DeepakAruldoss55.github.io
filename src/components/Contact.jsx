import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: null, error: null });

    useEffect(() => {
        AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
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
            setStatus({ loading: false, success: null, error: "You can only send 3 messages per day." });
            return;
        }

        setStatus({ loading: true, success: null, error: null });

        emailjs.send(
            'service_iytf57c',
            'template_loii407',
            formData,
            'yXoQAl-S7xEexV7CC'
        )
        .then(() => {
            console.log("Email sent successfully!");
            updateMessageCount();
            setStatus({ loading: false, success: 'Your message has been sent!', error: null });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus({ loading: false, success: null, error: null }), 5000);
        })
        .catch((error) => {
            console.error("Failed to send email:", error);
            setStatus({ loading: false, success: null, error: 'Failed to send message. Try again later.' });
        });
    };

    return (
        <section id="contact" className="contact section">
            <div className="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <p>Get in touch with us for any inquiries or collaborations. We're here to help!</p>
            </div>

            <div className="container d-flex justify-content-center">
                <div className="col-lg-10">
                    <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                        <div className="row gy-4">
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                                <input type="text" name="name" className="form-control" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                            </div>

                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                                <input type="email" className="form-control" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
                            </div>

                            <div className="col-md-12" data-aos="fade-up" data-aos-delay="500">
                                <input type="text" className="form-control" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} />
                            </div>

                            <div className="col-md-12" data-aos="fade-up" data-aos-delay="600">
                                <textarea className="form-control" name="message" rows="6" placeholder="Message" required value={formData.message} onChange={handleChange}></textarea>
                            </div>

                            <div className="col-md-12 text-center" data-aos="fade-up" data-aos-delay="700">
                                {status.loading && <div className="loading">Sending...</div>}
                                {status.error && <div className="error-message">{status.error}</div>}
                                {status.success && <div className="sent-message">{status.success}</div>}

                                <button type="submit" disabled={status.loading} className="contact-us-button">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;