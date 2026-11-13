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
// other audience's list, while the wrapper's height glides to the new list's
// height (instant swap under reduced motion).
const audienceToggle = document.querySelector('[data-audience-toggle]');
if (audienceToggle) {
  const FLIP_MS = 320;
  const STAGGER_MS = 45;
  const wrapper = document.querySelector('[data-audience-panels]');
  const panels = [...wrapper.querySelectorAll('[data-audience-panel]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let run = 0;

  const flip = (panel, fromDeg, toDeg, easing, fill) =>
    Promise.all(
      [...panel.querySelectorAll('.help-item')].map((item, i) =>
        item.animate(
          [
            { transform: `perspective(900px) rotateY(${fromDeg}deg)` },
            { transform: `perspective(900px) rotateY(${toDeg}deg)` },
          ],
          { duration: FLIP_MS, delay: i * STAGGER_MS, easing, fill }
        ).finished
      )
    );

  // Draw the hidden list once, invisibly, when the page is idle, so the
  // first switch doesn't stall while the browser lays out and paints it.
  const prewarm = () => {
    panels.filter((panel) => panel.hidden).forEach((panel) => {
      panel.classList.add('is-prewarming');
      panel.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (panel.classList.contains('is-prewarming')) {
          panel.hidden = true;
          panel.classList.remove('is-prewarming');
        }
      }));
    });
  };
  if ('requestIdleCallback' in window) requestIdleCallback(prewarm, { timeout: 2000 });
  else setTimeout(prewarm, 1000);

  const stopAll = () => {
    wrapper.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    wrapper.style.height = '';
  };

  audienceToggle.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-audience]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;

    const next = button.dataset.audience;
    const to = panels.find((panel) => panel.dataset.audiencePanel === next);
    // The list on screen now; a quick second click interrupts the flip.
    const from = panels.find((panel) => !panel.hidden && !panel.classList.contains('is-prewarming'));

    audienceToggle.dataset.active = next;
    audienceToggle.querySelectorAll('button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b === button));
    });

    const thisRun = ++run;
    stopAll();
    panels.forEach((panel) => {
      if (panel.classList.contains('is-prewarming')) {
        panel.classList.remove('is-prewarming');
        panel.hidden = true;
      }
    });
    if (reduceMotion || from === to) {
      panels.forEach((panel) => { panel.hidden = panel !== to; });
      return;
    }

    try {
      const startHeight = wrapper.offsetHeight;
      wrapper.style.height = `${startHeight}px`;
      await flip(from, 0, 90, 'cubic-bezier(0.55, 0, 1, 0.45)', 'forwards');
      if (thisRun !== run) return;

      from.hidden = true;
      to.hidden = false;
      wrapper.style.height = '';
      const endHeight = wrapper.offsetHeight;
      wrapper.style.height = `${startHeight}px`;

      const grow = wrapper.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: 350, easing: 'ease-in-out' }
      );
      const flipIn = flip(to, -90, 0, 'cubic-bezier(0, 0.55, 0.45, 1)', 'backwards');
      from.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      wrapper.style.height = '';
      await Promise.all([grow.finished, flipIn]);
    } catch {
      // Cancelled by a newer click; that click has taken over.
    }
  });
}
