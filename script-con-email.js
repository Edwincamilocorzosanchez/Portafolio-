// Professional Portfolio JavaScript with Email Functionality
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

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
        });
    });

    // Header background on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'var(--white)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Contact Form Handling with FormSubmit
    const contactForm = document.getElementById('contacto-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('nombre');
            const email = formData.get('email');
            const subject = formData.get('asunto');
            const message = formData.get('mensaje');

            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Por favor, complete todos los campos requeridos.');
                e.preventDefault();
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingrese un email válido.');
                e.preventDefault();
                return false;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Form will be submitted to FormSubmit.co
            // The page will redirect to the thank you page
        });
    }

    // CV Download functionality
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://drive.google.com/file/d/1bwbCNg5q_Cy_1eD3C9EmcSj7lEU-Nxyl/view?usp=drive_link', '_blank');
    });
}
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Project cards hover effect
    document.querySelectorAll('.proyecto-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skills animation on scroll
    const skillsSection = document.querySelector('.habilidades');
    if (skillsSection) {
        const skillTags = skillsSection.querySelectorAll('.habilidad-tag');

        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillTags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.transform = 'scale(1)';
                            tag.style.opacity = '1';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.3 });

        // Initially hide skill tags
        skillTags.forEach(tag => {
            tag.style.transform = 'scale(0.8)';
            tag.style.opacity = '0';
            tag.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        });

        skillsObserver.observe(skillsSection);
    }

    // Typing effect for the tagline (optional enhancement)
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add loading animation to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add click tracking for analytics (optional)
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            // In a real application, you would send analytics data here
            console.log('External link clicked:', this.href);
        });
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Add focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Trap focus in mobile menu when open
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                const firstFocusable = navMenu.querySelector(focusableElements);
                if (firstFocusable) firstFocusable.focus();
            }
        });
    }

    console.log('Portfolio with email functionality loaded successfully! 🚀');
});
