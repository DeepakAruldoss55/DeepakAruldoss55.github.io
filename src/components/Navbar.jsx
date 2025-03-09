import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  useEffect(() => {
    setIsMobileNavVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const links = document.querySelectorAll(".navmenu a");

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });

          setIsMobileNavVisible(false);
        }
      });
    });
    

    const onScroll = () => {
      let scrollPosition = window.scrollY;

      links.forEach((link) => {
        let section = document.querySelector(link.getAttribute("href"));

        if (section) {
          let sectionTop = section.offsetTop - 100;
          let sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            links.forEach((nav) => nav.classList.remove("active"));
            link.classList.add("active");
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <header id="header" className={`header d-flex flex-column justify-content-center ${isMobileNavVisible ? "header-show" : ""}`}>
      <i className={`header-toggle d-xl-none bi ${isMobileNavVisible ? "bi-x" : "bi-list"}`} onClick={toggleMobileMenu}></i>

      <nav id="navmenu" className="navmenu">
        <ul>
          {location.pathname === "/" ? (
            <>
              <li><a href="#hero" className="active"><i className="bi bi-house navicon"></i><span>Home</span></a></li>
              <li><a href="#about"><i className="bi bi-person navicon"></i><span>About</span></a></li>
              <li><a href="#skills"><i className="bi bi-lightbulb navicon"></i><span>Skills</span></a></li>
              <li><a href="#resume"><i className="bi bi-file-earmark-text navicon"></i><span>Resume</span></a></li>
              <li><a href="#platforms"><i className="bi bi-hdd-stack navicon"></i><span>Platform</span></a></li>
              <li><a href="#contact"><i className="bi bi-envelope navicon"></i><span>Contact</span></a></li>
            </>
          ) : (
            <li>
              <Link to="/" className="active">
                <i className="bi bi-arrow-left navicon"></i><span>Home</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
