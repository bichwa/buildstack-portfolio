// Page navigation functions
function showLanding() {
    document.getElementById('landing-page').classList.add('active');
    document.getElementById('fitjourney-page').classList.remove('active');
    window.scrollTo(0, 0);
}

function showFitJourney() {
    document.getElementById('landing-page').classList.remove('active');
    document.getElementById('fitjourney-page').classList.add('active');
    window.scrollTo(0, 0);
}

// Email submission function
function submitEmail() {
    const emailInput = document.getElementById('email-input');
    const emailForm = document.getElementById('email-form');
    const successMessage = document.getElementById('success-message');
    
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Hide form and show success message
        emailForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Log email (in production, send to your backend)
        console.log('Email submitted:', email);
        
        // Optional: Send to your backend
        // sendEmailToBackend(email);
        
        // Add fade-in animation
        successMessage.classList.add('fade-in');
    } else {
        alert('Please enter a valid email address.');
        emailInput.focus();
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle Enter key press in email input
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email-input');
    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitEmail();
            }
        });
    }
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
});

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.app-card, .feature-card, .stat-card, .day-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function addSmoothScrolling() {
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
}

// Particle animation enhancement
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'white';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Handle window resize for responsive animations
window.addEventListener('resize', function() {
    // Recalculate animations if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable some heavy animations on mobile for performance
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});

// Performance optimization: Reduce animations on slower devices
function optimizeForPerformance() {
    // Simple performance test
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
        Math.random();
    }
    const end = performance.now();
    
    if (end - start > 10) {
        // Slow device detected, reduce animations
        document.body.classList.add('reduced-motion');
    }
}

// Call performance optimization
document.addEventListener('DOMContentLoaded', optimizeForPerformance);

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (numericValue) {
            let currentValue = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
                }
            }, 20);
        }
    });
}

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to go back to landing from FitJourney
    if (e.key === 'Escape') {
        const fitjourneyPage = document.getElementById('fitjourney-page');
        if (fitjourneyPage && fitjourneyPage.classList.contains('active')) {
            showLanding();
        }
    }
});

// Touch gestures for mobile (basic swipe to go back)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe right to go back (only on FitJourney page)
    if (swipeDistance > swipeThreshold) {
        const fitjourneyPage = document.getElementById('fitjourney-page');
        if (fitjourneyPage && fitjourneyPage.classList.contains('active')) {
            showLanding();
        }
    }
}

// Optional: Google Analytics tracking (uncomment and add your GA ID)
/*
function trackEvent(eventName, category = 'User Interaction') {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': category,
            'event_label': window.location.pathname
        });
    }
}

// Track email submissions
function trackEmailSubmission() {
    trackEvent('email_submit', 'Lead Generation');
}

// Track app launches
function trackAppLaunch(appName) {
    trackEvent('app_launch', 'App Interaction', appName);
}
*/

// Service Worker registration for PWA (optional)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
*/

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send errors to a logging service
});

// Console easter egg
console.log(`
🏗️ BuildStack.app - Developer Console

Thanks for checking out the code! 
Built with ❤️ in Nairobi, Kenya

Interested in collaborating? 
Email: hello@buildstack.app

Current stats:
- Pure HTML/CSS/JS (no frameworks)
- Mobile-first responsive design
- Optimized for performance
- SEO-friendly structure
`);

console.log('🚀 Ready to build the future!');

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 BuildStack.app loaded successfully!');
    
    // Add any initialization code here
    
    // Optional: Preload FitJourney page assets
    // preloadFitJourneyAssets();
});

// Optional: Preload function for better UX
function preloadFitJourneyAssets() {
    // Preload any images or assets for FitJourney page
    // This improves perceived performance when navigating
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '#fitjourney-assets';
    document.head.appendChild(link);
}