// ShoreSquad App JavaScript
// Features: Interactive elements, accessibility, performance optimizations

class ShoreSquadApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.animateStats();
    this.setupAccessibility();
    console.log('🌊 ShoreSquad App initialized!');
  }

  setupEventListeners() {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
      });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          navMenu?.classList.remove('active');
          navToggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // CTA Button interactions
    const joinCrewBtn = document.getElementById('joinCrewBtn');
    const findCleanupBtn = document.getElementById('findCleanupBtn');

    if (joinCrewBtn) {
      joinCrewBtn.addEventListener('click', () => {
        this.handleJoinCrew();
      });
    }

    if (findCleanupBtn) {
      findCleanupBtn.addEventListener('click', () => {
        this.handleFindCleanup();
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        navToggle?.focus();
      }
    });
  }

  setupIntersectionObserver() {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .map-container, .weather-container').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateNumber = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 FPS
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
      }, duration / steps);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(stat => animateNumber(stat));
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  setupAccessibility() {
    // Add keyboard navigation for interactive elements
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    // Update map and weather placeholders with keyboard accessibility
    const mapPlaceholder = document.getElementById('map');
    const weatherPlaceholder = document.getElementById('weather');

    if (mapPlaceholder) {
      mapPlaceholder.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.handleMapInteraction();
        }
      });
    }

    if (weatherPlaceholder) {
      weatherPlaceholder.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.handleWeatherInteraction();
        }
      });
    }
  }

  handleJoinCrew() {
    // Placeholder for crew joining functionality
    this.showNotification('🤝 Crew joining feature coming soon! We\'re building something amazing.', 'info');
    
    // Future implementation would include:
    // - User authentication
    // - Crew search and filtering
    // - Social features
    // - Profile creation
  }

  handleFindCleanup() {
    // Placeholder for cleanup finding functionality
    this.showNotification('🗺️ Find cleanups feature coming soon! Get ready to make a difference.', 'info');
    
    // Future implementation would include:
    // - Geolocation API
    // - Map integration (Google Maps/Mapbox)
    // - Event filtering
    // - RSVP system
  }

  handleMapInteraction() {
    this.showNotification('🗺️ Interactive map will load here with real cleanup locations!', 'info');
    
    // Future implementation:
    // - Initialize map with cleanup locations
    // - Add markers for events
    // - Enable location search
    // - Show event details on marker click
  }

  handleWeatherInteraction() {
    this.showNotification('🌤️ Weather data will load here to help plan your cleanup!', 'info');
    
    // Future implementation:
    // - Fetch weather data from API (OpenWeatherMap)
    // - Show current conditions
    // - Display 5-day forecast
    // - Weather-based cleanup recommendations
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close" aria-label="Close notification">&times;</button>
    `;

    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '90px',
      right: '20px',
      backgroundColor: type === 'info' ? '#20B2AA' : '#FF6B6B',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '10000',
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'slideIn 0.3s ease'
    });

    // Close button styles
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.2rem',
      cursor: 'pointer',
      padding: '0',
      marginLeft: 'auto'
    });

    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-animations')) {
      const style = document.createElement('style');
      style.id = 'notification-animations';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close functionality
    const closeNotification = () => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    };

    closeBtn.addEventListener('click', closeNotification);

    // Auto-close after 5 seconds
    setTimeout(closeNotification, 5000);

    // Keyboard accessibility
    closeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeNotification();
      }
    });
  }

  // Future API integration methods
  async initializeMap() {
    // Will integrate with Google Maps or Mapbox
    try {
      // Placeholder for map initialization
      console.log('🗺️ Initializing interactive map...');
      // const map = new google.maps.Map(document.getElementById('map'), options);
    } catch (error) {
      console.error('Map initialization failed:', error);
    }
  }

  async fetchWeatherData(lat, lon) {
    // Will integrate with OpenWeatherMap API
    try {
      // Placeholder for weather API call
      console.log('🌤️ Fetching weather data...');
      // const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      // return await response.json();
    } catch (error) {
      console.error('Weather fetch failed:', error);
    }
  }

  async getUserLocation() {
    // Get user's current location for nearby events
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }
}

// Performance optimization: Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ShoreSquadApp();
  });
} else {
  new ShoreSquadApp();
}

// Service Worker registration for PWA functionality (future enhancement)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoreSquadApp;
}
