 // Smooth scrolling for navigation links
/* document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'var(--dark-brown)';
        navLinks.style.padding = '1rem';
        navLinks.style.gap = '1rem';
    }
});

// Form submission handler
/*const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});*/

// Animate elements on scroll
/*const observerOptions = {
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

// Observe all cards and sections
document.querySelectorAll('.service-card, .training-card, .product-card, .blog-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
       // const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});*/
// ========================================
// EMAILJS CONFIGURATION
// ========================================
const EMAILJS_PUBLIC_KEY = "gHXyp2PQeCII4ud99";
const EMAILJS_SERVICE_ID = "service_7hj9q48";
const EMAILJS_TEMPLATE_ID = "template_zkw7i59";

// ========================================
// INITIALIZE ON DOM LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollAnimations();
    initializeActiveNavigation();
});

// ========================================
// EMAILJS INITIALIZATION
// ========================================
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
    } else {
        console.warn('EmailJS library not loaded');
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenu || !navLinks) return;
    
    // Toggle mobile menu
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu(navLinks);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navLinks.style.display === 'flex' && 
            !navLinks.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            navLinks.style.display = 'none';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.flexDirection = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.gap = '';
        }
    });
}

function toggleMobileMenu(navLinks) {
    const isOpen = navLinks.style.display === 'flex';
    
    if (isOpen) {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'var(--dark-brown)';
        navLinks.style.padding = '1rem';
        navLinks.style.gap = '1rem';
        navLinks.style.zIndex = '1000';
    }
}

// ========================================
// CONTACT FORM
// ========================================
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_email: 'imalobeeslimited1@gmail.com'
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Send email via EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('success', '✓ Message sent successfully! We\'ll get back to you soon.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    showMessage('error', '✗ Failed to send message. Please try again or email us directly at imalobeeslimited1@gmail.com');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                });
        } else {
            showMessage('error', '✗ Email service not available. Please email us directly at imalobeeslimited1@gmail.com');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// ========================================
// FORM VALIDATION
// ========================================
function validateForm(data) {
    if (!data.from_name || data.from_name.length < 2) {
        showMessage('error', 'Please enter a valid name (minimum 2 characters)');
        return false;
    }
    
    if (!isValidEmail(data.from_email)) {
        showMessage('error', 'Please enter a valid email address');
        return false;
    }
    
    if (!data.subject || data.subject.length < 3) {
        showMessage('error', 'Please enter a subject (minimum 3 characters)');
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showMessage('error', 'Please enter a message (minimum 10 characters)');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// MESSAGE DISPLAY
// ========================================
function showMessage(type, text) {
    // Remove existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = text;
    
    // Add styles
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.fontSize = '0.95rem';
    messageDiv.style.transition = 'opacity 0.3s ease';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    // Insert message before form
    const form = document.querySelector('.contact-form form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        messageDiv.style.opacity = '0';
        setTimeout(function() {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.service-card, .training-card, .product-card, .blog-card, .gallery-item'
    );
    
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ========================================
function initializeActiveNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Add smooth scroll behavior to the whole page
document.documentElement.style.scrollBehavior = 'smooth';

console.log('Imalo Bees Limited - Website Scripts Loaded Successfully');