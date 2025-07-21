// const scrollComponent = document.querySelector('.scroll-component');
// let isDragging = false;
// let startX;
// let scrollLeft;
// let velocity = 0;
// let lastX;
// let momentumID;

// const sensitivity = 1.5;
// const momentumDecay = 0.95; // Lower = slower decay, longer glide

// scrollComponent.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   scrollComponent.classList.add('dragging');
//   startX = e.pageX - scrollComponent.offsetLeft;
//   scrollLeft = scrollComponent.scrollLeft;
//   lastX = e.pageX;
//   cancelMomentumScroll(); // stop old momentum if dragging again
// });

// scrollComponent.addEventListener('mouseleave', stopDragging);
// scrollComponent.addEventListener('mouseup', stopDragging);

// function stopDragging(e) {
//   if (!isDragging) return;
//   isDragging = false;
//   scrollComponent.classList.remove('dragging');
//   startMomentumScroll(); // ← trigger glide effect
// }

// scrollComponent.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;
//   e.preventDefault();
//   const x = e.pageX - scrollComponent.offsetLeft;
//   const walk = (x - startX) * sensitivity;
//   scrollComponent.scrollLeft = scrollLeft - walk;

//   velocity = e.pageX - lastX;
//   lastX = e.pageX;
// });

// function startMomentumScroll() {
//   cancelMomentumScroll();
//   momentumID = requestAnimationFrame(momentumLoop);
// }

// function cancelMomentumScroll() {
//   cancelAnimationFrame(momentumID);
// }

// function momentumLoop() {
//   scrollComponent.scrollLeft -= velocity * sensitivity;
//   velocity *= momentumDecay;

//   if (Math.abs(velocity) > 0.5) {
//     momentumID = requestAnimationFrame(momentumLoop);
//   }
// }

const scrollComponent = document.querySelector('.scroll-component');
const scrollContent = document.querySelector('.scroll-content');

let isDragging = false;
let startX = 0;
let currentX = 0;
let lastX = 0;
let velocity = 0;

const sensitivity = 1.5;
const momentumDecay = 0.95;
const autoScrollSpeed = 0.3; // Slower = smoother

let translateX = 0;
let contentWidth = scrollContent.scrollWidth;
let animationID;

// Start the loop
requestAnimationFrame(autoScrollLoop);

function autoScrollLoop() {
  if (!isDragging) {
    translateX -= autoScrollSpeed;
    wrapPosition();
  }

  scrollContent.style.transform = `translateX(${translateX}px)`;

  animationID = requestAnimationFrame(autoScrollLoop);
}

// Wrap the position when content fully moves out of view
function wrapPosition() {
  if (translateX <= -contentWidth) {
    translateX = 0;
  }
  if (translateX > 0) {
    translateX = -contentWidth;
  }
}

// Drag events
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

// Momentum glide after drag
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
