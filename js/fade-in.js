const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');
    observer.unobserve(entry.target); // Stop observing after it becomes visible
  });
}, {
  threshold: 0.1
});

faders.forEach(fader => observer.observe(fader));
