document.addEventListener('DOMContentLoaded', () => {
  // Modal functionality
  function openModal($el) {
    $el.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
    document.body.style.overflow = 'auto';
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Modal triggers
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Modal close buttons
  (document.querySelectorAll('.modal-overlay, .modal-close') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Close modal on ESC key
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;
    if (e.keyCode === 27) {
      closeAllModals();
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle?.classList.remove('active');
      navbarMenu?.classList.remove('active');
    });
  });

  // Animated particles
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 3 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(0, 255, 136, 0.8)';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      particle.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
      
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
      
      particlesContainer.appendChild(particle);
    }
  }

  // Add floating animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      25% {
        transform: translate(20px, -30px) scale(1.1);
      }
      50% {
        transform: translate(-20px, -60px) scale(0.9);
      }
      75% {
        transform: translate(30px, -30px) scale(1.05);
      }
    }
  `;
  document.head.appendChild(style);

  createParticles();

  // Smooth scroll for anchor links
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

  // Animated counter for stats
  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Intersection Observer for stats animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
          if (!num.classList.contains('animated')) {
            animateCounter(num);
            num.classList.add('animated');
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Parallax effect for hero section and hide scroll indicator
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Hide scroll indicator after scrolling
    if (scrollIndicator) {
      if (scrolled > 100) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }
  });

  // Add scroll reveal animation for feature cards
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    featureObserver.observe(card);
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 14, 39, 0.95)';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 136, 0.2)';
    } else {
      navbar.style.background = 'rgba(10, 14, 39, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });
});

