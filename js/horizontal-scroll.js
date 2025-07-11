const scrollComponent = document.querySelector('.scroll-component');
let isDragging = false;
let startX;
let scrollLeft;
let velocity = 0;
let lastX;
let momentumID;

const sensitivity = 1.5;
const momentumDecay = 0.95; // Lower = slower decay, longer glide

scrollComponent.addEventListener('mousedown', (e) => {
  isDragging = true;
  scrollComponent.classList.add('dragging');
  startX = e.pageX - scrollComponent.offsetLeft;
  scrollLeft = scrollComponent.scrollLeft;
  lastX = e.pageX;
  cancelMomentumScroll(); // stop old momentum if dragging again
});

scrollComponent.addEventListener('mouseleave', stopDragging);
scrollComponent.addEventListener('mouseup', stopDragging);

function stopDragging(e) {
  if (!isDragging) return;
  isDragging = false;
  scrollComponent.classList.remove('dragging');
  startMomentumScroll(); // ← trigger glide effect
}

scrollComponent.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollComponent.offsetLeft;
  const walk = (x - startX) * sensitivity;
  scrollComponent.scrollLeft = scrollLeft - walk;

  velocity = e.pageX - lastX;
  lastX = e.pageX;
});

function startMomentumScroll() {
  cancelMomentumScroll();
  momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumScroll() {
  cancelAnimationFrame(momentumID);
}

function momentumLoop() {
  scrollComponent.scrollLeft -= velocity * sensitivity;
  velocity *= momentumDecay;

  if (Math.abs(velocity) > 0.5) {
    momentumID = requestAnimationFrame(momentumLoop);
  }
}