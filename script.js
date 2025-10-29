document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Download resume button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // REPLACE '#' with the actual path to your resume file
            const link = document.createElement('a');
            window.open('https://drive.google.com/file/d/1KitEuLkorFETg72dzB2Rj0fjU3BnF7Z2/view?usp=sharing', '_blank');
        });
    }

    // 3. GitHub button
    const githubBtn = document.querySelector('.github-btn');
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            // REPLACE with your actual GitHub URL
            window.open('https://github.com/dakshbilkha', '_blank');
        });
    }

    // 4. Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            // Adjust the 0.5 value to make the parallax scroll faster or slower
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
// 5. Navbar background on scroll
window.addEventListener('scroll', function() {
    const navLinks = document.querySelector('.nav-links'); 

    if (window.scrollY > 100) { 
        // 1. Makes background 50% transparent
        navLinks.style.background = 'rgba(255, 230, 0, 0.5)';
        // 2. Adds the 10px blur effect
        navLinks.style.backdropFilter = 'blur(5px)'; 
    } else {
        // Reverts to solid yellow
        navLinks.style.background = '#FFE600';
        // Removes the blur
        navLinks.style.backdropFilter = 'none';
    }
});
    // 6. Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation a bit before it's fully in view
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    // Observe elements for animation
    // We need to add CSS for this. I'll add it below.
    const animateElements = document.querySelectorAll('.service-card, .experience-item, .about-content, .education-item, .projects-container');
    animateElements.forEach(el => {
        el.classList.add('fade-in-element'); // Add base class for styling
        observer.observe(el);
    });

    // 7. Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 8. Stats counter animation
    const animateCounter = (element, target) => {
        let current = 0;
        // Check if target is '1', if so, increment is 1
        const increment = target === 1 ? 1 : target / 50; 
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            // Add '+' sign back if it was there
            const originalText = element.dataset.target;
            element.textContent = Math.ceil(current) + (originalText.includes('+') ? '+' : '');
        }, 30); // Run every 30ms
    };

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                // Store original target text and parse the number
                const targetText = statNumber.textContent;
                statNumber.dataset.target = targetText; // Store original (e.g., "5+")
                const targetNum = parseInt(targetText.replace('+', ''));
                
                animateCounter(statNumber, targetNum);
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.8 }); // Trigger when 80% is visible

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

});

