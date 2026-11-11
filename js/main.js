// JS is available: drop the no-js fallback so [data-reveal] elements
// start hidden and animate in via the observer below.
document.documentElement.classList.remove('no-js');

document.getElementById('year').textContent = new Date().getFullYear();

// Slide the slim sticky bar in once the pill nav has scrolled up out of view.
const stickyBar = document.querySelector('[data-sticky-bar]');
new IntersectionObserver(([entry]) => {
  const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
  stickyBar.classList.toggle('is-shown', scrolledPast);
}).observe(document.querySelector('.site-nav'));

const revealTargets = document.querySelectorAll('[data-reveal]');

// Stagger via data attribute — html-validate forbids inline style attributes.
revealTargets.forEach((target) => {
  const delay = target.dataset.revealDelay;
  if (delay) target.style.setProperty('--reveal-delay', `${delay}ms`);
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
} else {
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
}

// How I can help: the Children / Adults switch flips the tiles over to the
// other audience's list (instant swap under reduced motion).
const audienceToggle = document.querySelector('[data-audience-toggle]');
if (audienceToggle) {
  const FLIP_MS = 300;
  const STAGGER_MS = 50;
  const panels = document.querySelectorAll('[data-audience-panel]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pendingFlip;

  panels.forEach((panel) => {
    panel.querySelectorAll('.help-item').forEach((item, i) => {
      item.style.setProperty('--flip-delay', `${i * STAGGER_MS}ms`);
    });
  });

  const flipTime = (panel) => FLIP_MS + (panel.children.length - 1) * STAGGER_MS;

  audienceToggle.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-audience]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;

    const next = button.dataset.audience;
    const to = document.querySelector(`[data-audience-panel="${next}"]`);
    // The list on screen now — it may be mid-flip if the visitor clicks quickly.
    const from = [...panels].find((panel) => !panel.hidden);

    audienceToggle.dataset.active = next;
    audienceToggle.querySelectorAll('button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b === button));
    });

    clearTimeout(pendingFlip);
    if (reduceMotion || from === to) {
      panels.forEach((panel) => {
        panel.hidden = panel !== to;
        panel.classList.remove('is-flipping-out', 'is-flipping-in');
      });
      return;
    }

    from.classList.add('is-flipping-out');
    pendingFlip = setTimeout(() => {
      from.hidden = true;
      from.classList.remove('is-flipping-out');
      to.classList.add('is-flipping-in');
      to.hidden = false;
      void to.offsetWidth; // apply the edge-on start before flipping back in
      to.classList.remove('is-flipping-in');
    }, flipTime(from));
  });
}
