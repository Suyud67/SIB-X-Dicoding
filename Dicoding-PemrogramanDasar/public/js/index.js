// get element
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.list-item');
const listItems = document.querySelectorAll('.link-item');
const arrowElement = document.querySelector('.arrow');

// event click (hamburger & list-item) in navbar
hamburger.addEventListener('click', () => {
  navbar.classList.toggle('active');
  hamburger.classList.toggle('active');
});

listItems.forEach((item) => {
  item.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
});

// event click arrow element
arrowElement.addEventListener('click', () => {
  document.body.scrollIntoView({
    behavior: 'smooth',
  });
});

// setup library typed.js
const mainDesc = {
  strings: ["<p>Get your favorite lego's in every universe</p>", "<p>Make your own world with mindblowing combo's</p>", '<p>Best price for you and get <strong>Discont</strong> in every season</p>'],
  typeSpeed: 70,
  loop: true,
  backDelay: 900,
  backSpeed: 40,
};

const DescTyped = new Typed('.main-desc', mainDesc);
