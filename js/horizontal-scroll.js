const scrollComponent = document.querySelector('.scroll-component');
const scrollContent = document.querySelector('.scroll-content');

const contentWidth = scrollContent.scrollWidth;

// Clone children for infinite loop
scrollContent.innerHTML += scrollContent.innerHTML;

let isDragging = false;
let startX = 0;
let currentX = 0;
let lastX = 0;
let velocity = 0;

const sensitivity = 1.5;
const momentumDecay = 0.95;
const autoScrollSpeed = 0.2;

let translateX = 0;

requestAnimationFrame(autoScrollLoop);

function autoScrollLoop() {
  if (!isDragging) {
    translateX -= autoScrollSpeed;
    wrapPosition();
  }

  scrollContent.style.transform = `translateX(${translateX}px)`;

  requestAnimationFrame(autoScrollLoop);
}

function wrapPosition() {
  if (translateX <= -contentWidth) {
    translateX += contentWidth;
  }

  if (translateX >= 0) {
    translateX -= contentWidth;
  }
}

// Dragging
scrollComponent.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - translateX;
  cancelMomentum();
});

scrollComponent.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  e.preventDefault();
  currentX = e.pageX;
  translateX = e.pageX - startX;

  wrapPosition();

  velocity = currentX - lastX;
  lastX = currentX;
});

scrollComponent.addEventListener('mouseup', () => {
  isDragging = false;
  startMomentum();
});

scrollComponent.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    startMomentum();
  }
});

// Momentum
let momentumID;
function startMomentum() {
  momentumID = requestAnimationFrame(momentumLoop);
}

function momentumLoop() {
  if (Math.abs(velocity) > 0.5) {
    translateX += velocity * sensitivity;
    wrapPosition();

    scrollContent.style.transform = `translateX(${translateX}px)`;

    velocity *= momentumDecay;
    momentumID = requestAnimationFrame(momentumLoop);
  }
}

function cancelMomentum() {
  cancelAnimationFrame(momentumID);
}

