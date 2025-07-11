const burgerBtn = document.getElementById('burgerBtn')
const mobileMenu = document.getElementById('mobileMenu')
const closeBtn = document.getElementById('closeBtn')

burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active')
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active')
})

window.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.desktop-nav');
  setTimeout(() => {
    nav.classList.add('active');
  }, 100)
})

let lastScroll = 0;
const navbar = document.querySelector('.desktop-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    navbar.classList.remove('scroll-up');
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains('scroll-down')
  ) {
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

