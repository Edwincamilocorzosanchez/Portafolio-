// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Email redirection function
function redirectToEmail() {
    const email = 'tuemail@example.com';
    const subject = 'Contacto desde Portafolio';
    const body = 'Hola, me gustaría contactarte para...';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Add click event to email link
document.getElementById('email-link').addEventListener('click', function(e) {
    e.preventDefault();
    redirectToEmail();
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !message) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Here you would typically send the data to a server
    // For now, we'll just show a success message and redirect to email
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    redirectToEmail();

    // Reset form
    this.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Prevent right-click on images (optional)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add some interactive effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.2s ease';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Console log for debugging (remove in production)
console.log('Portafolio cargado correctamente');
