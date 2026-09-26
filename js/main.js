// JS is available: drop the no-js fallback so [data-reveal] elements
// start hidden and animate in via the observer below.
document.documentElement.classList.remove('no-js');

document.getElementById('year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('[data-reveal]');

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

revealTargets.forEach((target) => observer.observe(target));
