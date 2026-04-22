/* ==========================================================================
   Çağdaş Yardımcı — Portfolio JS
   Handles: section reveal, active nav tracking, scrollspy dots
   ========================================================================== */

(function () {
  'use strict';

  // --- Section Reveal on Scroll ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // --- Active Nav + Scrollspy Tracking ---
  const sections = document.querySelectorAll('.project, .about');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollspyDots = document.querySelectorAll('.scrollspy__dot');

  function setActive(sectionId) {
    navLinks.forEach((link) => {
      if (link.dataset.section === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    scrollspyDots.forEach((dot) => {
      if (dot.dataset.section === sectionId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const visible = new Set();
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });

        let best = null;
        sections.forEach((section) => {
          if (visible.has(section)) best = section;
        });

        // Bottom-of-page fallback: if the user has scrolled to the end,
        // highlight the last section regardless of threshold.
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (atBottom && sections.length) best = sections[sections.length - 1];

        if (best) setActive(best.id);
      },
      { threshold: 0, rootMargin: '-20% 0px -35% 0px' }
    );

    sections.forEach((section) => navObserver.observe(section));

    window.addEventListener('scroll', () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length) setActive(sections[sections.length - 1].id);
    }, { passive: true });
  }

  // --- Smooth scroll for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Video placeholder: hide when video loads ---
  document.querySelectorAll('.video-wrapper video').forEach((video) => {
    video.addEventListener('loadeddata', () => {
      video.closest('.video-wrapper').classList.add('has-video');
    });

    // Also check if poster exists and is reachable
    if (video.poster) {
      const img = new Image();
      img.onload = () => {
        video.closest('.video-wrapper').classList.add('has-video');
      };
      img.src = video.poster;
    }
  });
})();
