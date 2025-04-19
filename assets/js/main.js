// main.js so blah blah blah 
// This is the main JavaScript file for the portfolio website
// It handles the following functionalities:

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/js/particles-config.json', function() {
      console.log('Particles.js loaded successfully');
    });
    
    
    setTimeout(function() {
      document.body.classList.add('loaded');
    }, 500);
    
    //smooth scroll
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 800,
      speedAsDuration: true,
      easing: 'easeInOutCubic',
      offset: function(anchor, toggle) {
        return toggle.getAttribute('data-offset') || 0;
      }
    });
    
    // scroll animation trigger
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.section, .section-title, .skill-card, .project-card, .contact-form');
      const windowHeight = window.innerHeight;
      const windowTop = window.scrollY;
      const windowBottom = windowTop + windowHeight;
      
      elements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top + windowTop;
        const elementBottom = elementTop + element.offsetHeight;
        
        // Check if element is in viewport
        if (elementBottom >= windowTop && elementTop <= windowBottom) {
          element.classList.add('animate');
        }
      });
    };
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        
        console.log('Form submitted:', data);
        

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
    
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img.lazy');
      
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            imageObserver.unobserve(lazyImage);
            
            // Add fade-in effect when image loads
            lazyImage.style.opacity = '0';
            lazyImage.style.transition = 'opacity 0.6s ease-out';
            setTimeout(function() {
              lazyImage.style.opacity = '1';
            }, 50);
          }
        });
      });
      
      lazyImages.forEach(function(lazyImage) {
        imageObserver.observe(lazyImage);
      });
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      });
    });
  });