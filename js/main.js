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

// Parallax Effect
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
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


