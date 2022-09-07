const hamburger = document.querySelector('.hamburger');
const listItem = document.querySelector('.list-item');
const items = document.querySelectorAll('.item');

hamburger.addEventListener('click', function () {
  listItem.classList.toggle('active');
  hamburger.classList.toggle('active');
});

items.forEach((item) => {
  item.addEventListener('click', function (e) {
    if (e.target.classList.contains('link-item')) {
      listItem.classList.toggle('active');
      hamburger.classList.toggle('active');
    }
  });
});
