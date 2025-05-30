// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.section-title, .project-card, .timeline-item, .education-item, .tech-item, .quality, .certificate-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Slide in animations
    const slideLeftElements = document.querySelectorAll('.about-text, .contact-info');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.tech-stack, .contact-form');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    emailjs.sendForm('service_yljsdgq', 'template_4mrjn8b', contactForm)
        .then(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showNotification('Oops! Something went wrong. Please try again later.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });

});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#2563eb';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Skills animation on scroll
const skillsSection = document.querySelector('.tech-stack');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const techItems = entry.target.querySelectorAll('.tech-item');
                techItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);

    // Initially hide tech items
    const techItems = skillsSection.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });
}

// Add cursor trail effect (disabled on mobile for performance)
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';

        document.body.appendChild(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 1000);
    });
}

// Add CSS for cursor trail and other dynamic styles
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 4px;
        height: 4px;
        background: #2563eb;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 1s ease-out forwards;
    }
    
    @keyframes trailFade {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Add smooth reveal animation for timeline and education items
const timelineItems = document.querySelectorAll('.timeline-item, .education-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
});

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add project card hover effects
document.querySelectorAll('.project-card, .certificate-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to hero elements
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
    element.style.animationDuration = `${4 + index}s`;
});

// Add progress bar for page scroll
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #7c3aed);
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add intersection observer for counting animations
const countElements = document.querySelectorAll('.gpa-value');
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            // Add a subtle animation to GPA values
            entry.target.style.animation = 'pulse 0.6s ease-in-out';
        }
    });
}, { threshold: 0.5 });

countElements.forEach(element => {
    countObserver.observe(element);
});

// Add smooth scrolling to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 1000;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.background = '#1d4ed8';
    scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.background = '#2563eb';
    scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
});

// Initialize all animations and effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add staggered animation to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        link.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });

    // Add entrance animation to hero social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'scale(0)';
        link.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'scale(1)';
        }, 1000 + (index * 150));
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    highlightNavLink();
}, 100));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Enter key to submit form when focused on submit button
    if (e.key === 'Enter' && document.activeElement === contactForm.querySelector('button[type="submit"]')) {
        contactForm.dispatchEvent(new Event('submit'));
    }
});

// Add focus management for accessibility
const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #2563eb';
        element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Add dynamic year to footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = `&copy; 2025 Vikas Yadav. All rights reserved.`;
}

// Add project filtering functionality
const projectCards = document.querySelectorAll('.project-card');
const projectsSection = document.querySelector('.projects');

// Create filter buttons
const filterContainer = document.createElement('div');
filterContainer.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
`;

const filterButtons = [
    { name: 'All', filter: 'all' },
    { name: 'Web Development', filter: 'web' },
    { name: 'Machine Learning', filter: 'ml' },
    { name: 'Java', filter: 'java' },
    { name: 'Full Stack', filter: 'fullstack' }
];

filterButtons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.name;
    btn.className = 'filter-btn';
    btn.dataset.filter = button.filter;

    btn.style.cssText = `
        padding: 0.5rem 1rem;
        border: 2px solid #2563eb;
        background: ${button.filter === 'all' ? '#2563eb' : 'transparent'};
        color: ${button.filter === 'all' ? 'white' : '#2563eb'};
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    `;

    btn.addEventListener('click', () => filterProjects(button.filter, btn));
    filterContainer.appendChild(btn);
});

// Insert filter container before projects grid
const projectsGrid = document.querySelector('.projects-grid');
projectsSection.insertBefore(filterContainer, projectsGrid);

// Filter projects function
function filterProjects(filter, activeBtn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = '#2563eb';
    });
    activeBtn.style.background = '#2563eb';
    activeBtn.style.color = 'white';

    // Filter projects based on technology tags
    projectCards.forEach(card => {
        const techTags = card.querySelectorAll('.project-tech span');
        const cardTechs = Array.from(techTags).map(tag => tag.textContent.toLowerCase());

        let shouldShow = filter === 'all';

        if (!shouldShow) {
            switch (filter) {
                case 'web':
                    shouldShow = cardTechs.some(tech =>
                        ['html', 'css', 'javascript', 'react', 'bootstrap'].includes(tech)
                    );
                    break;
                case 'ml':
                    shouldShow = cardTechs.some(tech =>
                        ['python', 'opencv', 'machine learning', 'computer vision'].includes(tech)
                    );
                    break;
                case 'java':
                    shouldShow = cardTechs.includes('java');
                    break;
                case 'fullstack':
                    shouldShow = cardTechs.some(tech =>
                        ['node.js', 'mongodb', 'express', 'react native', 'backend', 'frontend'].includes(tech)
                    );
                    break;
            }
        }

        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add fadeInUp animation
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);

console.log('🚀 Complete Portfolio website loaded successfully!');
console.log('📧 Contact: vkyadav0930@gmail.com');
console.log('🔗 LinkedIn: https://www.linkedin.com/in/vikas-yadav-49ba30249/');
console.log('💻 GitHub: https://github.com/Vicky068');