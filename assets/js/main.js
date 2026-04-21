/**
 * Teen Patti Guide India - Main JavaScript
 * Handles smooth scrolling, navigation, and UI interactions
 */

(function () {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function () {
    initSmoothScroll();
    initNavigation();
    initScrollEffects();
  });

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Navigation active state management
   */
  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav a, .topbar .nav a');
    const sections = document.querySelectorAll('section[id], main[id]');

    if (navLinks.length === 0 || sections.length === 0) return;

    // Set active state on scroll
    window.addEventListener('scroll', throttle(function () {
      let currentSection = '';

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('active');
        }
      });
    }, 100));
  }

  /**
   * Scroll-based visual effects
   */
  function initScrollEffects() {
    // Add scrolled class to navigation on scroll
    const nav = document.querySelector('.nav, .topbar');
    if (!nav) return;

    window.addEventListener('scroll', throttle(function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, 50));

    // Lazy load images with intersection observer
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(function (img) {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Utility: Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function () {
          return inThrottle = false;
        }, limit);
      }
    };
  }

  /**
   * Utility: Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

})();
