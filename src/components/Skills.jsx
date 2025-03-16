import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );
    
        const currentRef = skillsRef.current;
    
        if (currentRef) {
            observer.observe(currentRef);
        }
    
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const progressBars = document.querySelectorAll(".progress-bar");
            progressBars.forEach((bar) => {
                const percentage = bar.getAttribute("aria-valuenow");
                bar.style.width = "0%";
                setTimeout(() => {
                    bar.style.transition = "width 1.5s ease-in-out";
                    bar.style.width = `${percentage}%`;
                }, 200);
            });
        }
    }, [isVisible]);

    return (
        <section ref={skillsRef} id="skills" className="skills section">
            <div className="container section-title" data-aos="fade-up">
                <h2>Skills</h2>
                <p>I am a fast learner with a strong ability to adapt to new technologies and frameworks efficiently. My passion for problem-solving and continuous improvement enables me to quickly grasp and implement technical skills in dynamic environments.</p>
            </div>
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row skills-content skills-animation">
                    <div className="col-lg-6 skill-separate-section">
                        <div className="skill-header">Core Languages</div>
                        <div className="progress">
                            <span className="skill"><span>PHP</span> <i className="val">90%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar php-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>JavaScript</span> <i className="val">70%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar javascript-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Python</span> <i className="val">60%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar javascript-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 skill-separate-section">
                        <div className="skill-header">Platforms</div>
                        <div className="progress">
                            <span className="skill"><span>Shopware 5</span> <i className="val">90%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar shopware-5-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Shopware 6</span> <i className="val">90%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar shopware-6-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Odoo 17</span> <i className="val">60%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar odoo-17-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 skill-separate-section">
                        <div className="skill-header">Frameworks</div>
                        <div className="progress">
                            <span className="skill"><span>Symfony</span> <i className="val">85%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar symfony-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Zend</span> <i className="val">85%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar zend-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Laravel</span> <i className="val">75%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar laravel-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Node.js</span> <i className="val">60%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar node-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Django</span> <i className="val">60%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar django-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>jQuery</span> <i className="val">60%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar jquery-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 skill-separate-section">
                        <div className="skill-header">Frontend Technologies</div>
                        <div className="progress">
                            <span className="skill"><span>HTML</span> <i className="val">85%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar html-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Twig Template Engine</span> <i className="val">85%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar twig-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Smarty Template Engine</span> <i className="val">85%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar smarty-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>React</span> <i className="val">30%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar react-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>Embedded JavaScript templating</span> <i className="val">85%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar ejs-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>CSS</span> <i className="val">50%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar css-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 skill-separate-section">
                        <div className="skill-header">Databases</div>
                        <div className="progress">
                            <span className="skill"><span>MySQL</span> <i className="val">90%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar mysql-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>PostgreSQL</span> <i className="val">60%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar javascript-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 skill-separate-section">
                        <div className="skill-header">Other Technologies</div>
                        <div className="progress">
                            <span className="skill"><span>GIT</span> <i className="val">70%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar git-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="progress">
                            <span className="skill"><span>AWS(EC2)</span> <i className="val">70%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar aws-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
