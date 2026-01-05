// Auto Winx - Main JavaScript
// Professional Car Tinting Service Website

// Language Management
const translations = {
  th: {
    nav: {
      home: 'หน้าแรก',
      services: 'บริการ',
      about: 'เกี่ยวกับเรา',
      gallery: 'ผลงาน',
      contact: 'ติดต่อเรา'
    },
    hero: {
      title: 'Auto Winx - บริการติดฟิล์มรถยนต์ระดับพรีเมียม',
      subtitle: 'เปลี่ยนรถคุณให้พรีเมียมกว่าใคร ด้วยทีมงานมืออาชีพและผลิตภัณฑ์คุณภาพสูง',
      cta1: 'ดูบริการ',
      cta2: 'ติดต่อเรา'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      gallery: 'Gallery',
      contact: 'Contact'
    },
    hero: {
      title: 'Auto Winx - Premium Car Tinting Services',
      subtitle: 'Transform your vehicle with professional service and premium quality products',
      cta1: 'View Services',
      cta2: 'Contact Us'
    }
  }
};

let currentLang = localStorage.getItem('lang') || 'th';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initLoadingScreen();
  initNavigation();
  initAnimations();
  initLanguage();
  initCounters();
  initForms();
  initMobileMenu();
});

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }
}

// Navigation
function initNavigation() {
  // Set active nav item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Language Switcher
function initLanguage() {
  const langButtons = document.querySelectorAll('.lang-switcher button');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      switchLanguage(lang);
    });
  });

  // Set active language button
  document.querySelector(`.lang-switcher button[data-lang="${currentLang}"]`)?.classList.add('active');
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  // Update active button
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });

  // Update page content (if elements have data-translate attribute)
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    const keys = key.split('.');
    let translation = translations[lang];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    if (translation) {
      element.textContent = translation;
    }
  });
}

// Animations
function initAnimations() {
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

  // Observe elements with fade-in class
  document.querySelectorAll('.service-card, .testimonial-card, .price-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Animated Counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Forms
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ff4444';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Show success message (in real app, submit to server)
        alert('Thank you! We will contact you soon.');
        form.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });
}

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }
}

// Parallax Effect (optimized with throttling)
let parallaxTicking = false;
window.addEventListener('scroll', function() {
  if (!parallaxTicking) {
    window.requestAnimationFrame(function() {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      parallaxTicking = false;
    });
    parallaxTicking = true;
  }
});

// Gallery Lightbox (if needed)
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        // Simple lightbox implementation
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', function() {
          document.body.removeChild(lightbox);
        });
      }
    });
  });
}

// Initialize gallery if on gallery page
if (document.querySelector('.gallery-grid')) {
  initGallery();
}

// ============================================
// Scrollytelling Animations
// ============================================

// Scroll Progress Bar (optimized)
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  let progressTicking = false;
  window.addEventListener('scroll', function() {
    if (!progressTicking) {
      window.requestAnimationFrame(function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
        progressTicking = false;
      });
      progressTicking = true;
    }
  });
}

// Enhanced Scroll Animations
function initScrollytelling() {
  // Create Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Handle text reveal animation
        if (entry.target.classList.contains('text-reveal')) {
          const spans = entry.target.querySelectorAll('span');
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.style.transitionDelay = `${index * 0.1}s`;
              span.classList.add('animated');
            }, index * 50);
          });
        }
        
        // Don't observe again after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  const animatedElements = document.querySelectorAll(`
    .scroll-animate,
    .fade-in,
    .slide-up,
    .slide-down,
    .slide-left,
    .slide-right,
    .scale-in,
    .zoom-in,
    .rotate-in,
    .section-title,
    .service-card,
    .testimonial-card,
    .gallery-item,
    .stat-card,
    .text-reveal
  `);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for hero content (optimized)
  let heroContent = document.querySelector('.hero-content');
  let heroParallaxTicking = false;
  if (heroContent) {
    window.addEventListener('scroll', function() {
      if (!heroParallaxTicking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          const heroSection = document.querySelector('.hero');
          if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (scrolled < heroHeight) {
              const parallaxSpeed = 0.5;
              heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
              heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
            }
          }
          heroParallaxTicking = false;
        });
        heroParallaxTicking = true;
      }
    });
  }

  // Parallax for background images (optimized)
  const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
  let bgParallaxTicking = false;
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      if (!bgParallaxTicking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          parallaxElements.forEach(el => {
            const speed = el.classList.contains('parallax-slow') ? 0.3 : 
                         el.classList.contains('parallax-medium') ? 0.5 : 0.7;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
          });
          bgParallaxTicking = false;
        });
        bgParallaxTicking = true;
      }
    });
  }
}

// Enhanced counter animation with scroll
function enhanceCounterAnimation() {
  const statCards = document.querySelectorAll('.stat-card');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        const counter = entry.target.querySelector('.stat-number');
        if (counter && !counter.classList.contains('counted')) {
          animateCounter(counter);
          counter.classList.add('counted');
        }
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => {
    counterObserver.observe(card);
  });
}

// ============================================
// Advanced Scrollytelling Features
// ============================================

// Magnetic Buttons Effect (optimized with throttling)
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic-btn, .btn');
  
  magneticButtons.forEach(btn => {
    let magneticTicking = false;
    btn.addEventListener('mousemove', function(e) {
      if (!magneticTicking) {
        window.requestAnimationFrame(function() {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          const moveX = x * 0.3;
          const moveY = y * 0.3;
          
          btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
          magneticTicking = false;
        });
        magneticTicking = true;
      }
    });
    
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

// 3D Card Tilt Effect (optimized with throttling)
function init3DCardTilt() {
  const cards3D = document.querySelectorAll('.card-3d, .service-card, .testimonial-card');
  
  cards3D.forEach(card => {
    let tiltTicking = false;
    card.addEventListener('mousemove', function(e) {
      if (!tiltTicking) {
        window.requestAnimationFrame(function() {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
          tiltTicking = false;
        });
        tiltTicking = true;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// Scroll Velocity Tracker (optimized)
let lastScrollTop = 0;
let scrollVelocity = 0;
let scrollDirection = 'down';
let velocityIndicator = null;
let velocityTicking = false;

function initScrollVelocity() {
  velocityIndicator = document.createElement('div');
  velocityIndicator.className = 'scroll-velocity';
  const velocityBar = document.createElement('div');
  velocityBar.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    background: var(--gold);
    border-radius: 2px;
    transition: height 0.1s ease;
  `;
  velocityIndicator.appendChild(velocityBar);
  document.body.appendChild(velocityIndicator);
  
  window.addEventListener('scroll', function() {
    if (!velocityTicking) {
      window.requestAnimationFrame(function() {
        const currentScroll = window.pageYOffset;
        scrollVelocity = Math.abs(currentScroll - lastScrollTop);
        scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';
        lastScrollTop = currentScroll;
        
        // Update velocity indicator
        const maxVelocity = 50;
        const velocityPercent = Math.min((scrollVelocity / maxVelocity) * 100, 100);
        if (velocityBar) {
          velocityBar.style.height = velocityPercent + '%';
        }
        
        // Apply velocity-based effects (throttled)
        if (scrollVelocity > 20) {
          document.querySelectorAll('.service-card, .testimonial-card, .gallery-item').forEach(el => {
            el.style.transition = 'transform 0.1s ease';
          });
        }
        
        velocityTicking = false;
      });
      velocityTicking = true;
    }
  });
}

// Advanced Text Splitting
function initTextSplitting() {
  const splitTexts = document.querySelectorAll('.split-text');
  
  splitTexts.forEach(element => {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word => 
      `<span>${word}</span>`
    ).join(' ');
  });
}

// Interactive Cursor Effect
function initCursorFollow() {
  const cursorFollowElements = document.querySelectorAll('.cursor-follow');
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  cursorFollowElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      element.style.setProperty('--mouse-x', x + 'px');
      element.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

// Section Divider Animation
function initSectionDividers() {
  const dividers = document.querySelectorAll('.section-divider');
  const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.5 });
  
  dividers.forEach(divider => dividerObserver.observe(divider));
}

// Advanced Parallax with Multiple Layers (optimized)
function initAdvancedParallax() {
  const parallaxLayers = document.querySelectorAll('[class*="parallax-layer"]');
  
  if (parallaxLayers.length === 0) return;
  
  let advancedParallaxTicking = false;
  window.addEventListener('scroll', function() {
    if (!advancedParallaxTicking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
          let speed = 0.1;
          if (layer.classList.contains('parallax-layer-1')) speed = 0.1;
          else if (layer.classList.contains('parallax-layer-2')) speed = 0.2;
          else if (layer.classList.contains('parallax-layer-3')) speed = 0.3;
          else if (layer.classList.contains('parallax-layer-4')) speed = 0.4;
          
          const yPos = -(scrolled * speed);
          layer.style.transform = `translateY(${yPos}px)`;
        });
        
        advancedParallaxTicking = false;
      });
      advancedParallaxTicking = true;
    }
  });
}

// Glow on Scroll Effect
function initGlowOnScroll() {
  const glowElements = document.querySelectorAll('.glow-on-scroll');
  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.5 });
  
  glowElements.forEach(el => glowObserver.observe(el));
}

// Image Reveal Animation
function initImageReveal() {
  const imageReveals = document.querySelectorAll('.image-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.3 });
  
  imageReveals.forEach(img => revealObserver.observe(img));
}

// Section Background Transition
function initSectionBgTransition() {
  const sections = document.querySelectorAll('.section-bg-transition');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(section => sectionObserver.observe(section));
}

// Smooth Scroll with Easing
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Scroll-triggered Animations with Velocity (removed - redundant with other scroll handlers)

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
  initScrollProgress();
  initScrollytelling();
  enhanceCounterAnimation();
  initMagneticButtons();
  init3DCardTilt();
  initScrollVelocity();
  initTextSplitting();
  initCursorFollow();
  initSectionDividers();
  initAdvancedParallax();
  initGlowOnScroll();
  initImageReveal();
  initSectionBgTransition();
  initSmoothScroll();
});



