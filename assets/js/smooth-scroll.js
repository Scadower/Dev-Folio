// smooth scroll 👌
class SmoothScroll {
    constructor(selector, options) {
      this.selector = selector || 'a[href*="#"]';
      this.options = Object.assign({
        header: '[data-scroll-header]',
        speed: 500,
        easing: 'easeInOutCubic',
        offset: 0
      }, options);
      
      this.links = document.querySelectorAll(this.selector);
      this.easingPatterns = {
        easeInOutCubic: function(t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuad: function(t) {
          return t * t;
        },
        easeOutQuad: function(t) {
          return t * (2 - t);
        }
      };
      
      this.init();
    }
    
    init() {
      if (this.links.length) {
        this.links.forEach(link => {
          link.addEventListener('click', e => this.handleClick(e));
        });
      }
    }
    
    handleClick(e) {
      const link = e.currentTarget;
      const targetId = link.getAttribute('href');
      
      if (targetId === '#' || targetId === '' || targetId.charAt(0) !== '#') {
        return;
      }
      
      e.preventDefault();
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      const header = document.querySelector(this.options.header);
      const headerHeight = header ? header.offsetHeight : 0;
      const targetOffset = typeof this.options.offset === 'function' 
        ? this.options.offset(target, link) 
        : this.options.offset;
      
      const startPosition = window.pageYOffset;
      const targetPosition = target.getBoundingClientRect().top + startPosition - headerHeight - targetOffset;
      const distance = targetPosition - startPosition;
      const duration = this.options.speedAsDuration 
        ? this.options.speed 
        : Math.abs(distance / 1000 * this.options.speed);
      
      let startTime = null;
      
      const scroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easePattern = this.easingPatterns[this.options.easing] || this.easingPatterns.easeInOutCubic;
        const easeProgress = easePattern(progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (timeElapsed < duration) {
          window.requestAnimationFrame(scroll);
        } else {
          this.resetFocus(target);
        }
      };
      
      window.requestAnimationFrame(scroll);
    }
    
    resetFocus(target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.removeAttribute('tabindex');
      history.pushState(null, null, `#${target.id}`);
    }
  }