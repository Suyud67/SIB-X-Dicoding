// mendapatkan element form
const formSubmit = document.getElementById('form');
const getId = 'itemID';

// form di submit
formSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Buku Berhasil Ditambahkan');
  tambahBuku();
});

// ketika user baru masuk atau refresh browser
window.addEventListener('load', function () {
  if (checkLocalStorage()) {
    loadDataBuku();
  }
});

// search book event
const btnSearchBook = document.getElementById('btnSearch');

btnSearchBook.addEventListener('click', () => {
  const searchInput = document.getElementById('searchBook').value;
  // mendapatkan data dari input user
  const books = getBooks(searchInput);

  /* ketika data dapat maka akan dimunculkan / ditempel 
  di elemen result */
  books.forEach((book) => {
    const Book = bookResult(book.judul, book.author, book.year);

    const result = document.querySelector('.result');
    result.appendChild(Book);
  });
});

function tambahBuku() {
  // input user
  const inputJudul = document.getElementById('judul').value;
  const inputAuthor = document.getElementById('pembuat').value;
  const inputYear = document.getElementById('year').value;
  const checkInput = document.getElementById('isCompleted').checked;

  //   data input dikirim ke function cetakBuku & saveToObject
  const cetak = cetakBuku(inputJudul, inputAuthor, inputYear, checkInput);
  const saveObject = saveToObject(inputJudul, inputAuthor, inputYear, checkInput);

  //   bagian ini untuk track perubahan user melalui Id yang ada di saveObject
  cetak[getId] = saveObject.id;
  books.push(saveObject);

  saveDataBuku();
}

function cetakBuku(judul, author, year, isCompleted) {
  //   membuat element dan ditempel dari argument
  const Judul = document.createElement('h2');
  Judul.innerHTML = judul;
  const Author = document.createElement('h3');
  Author.innerHTML = author;
  const Year = document.createElement('p');
  Year.innerHTML = year;

  // membuat pembungkus untuk element yang sudah dibuat
  const infoBook = document.createElement('div');
  infoBook.classList.add('info-book');
  infoBook.append(Judul, Author, Year);

  const tempatBuku = document.createElement('div');
  tempatBuku.classList.add('book');
  tempatBuku.append(infoBook);

  // menempelkan elemen yang sudah jadi ke container
  if (isCompleted) {
    tempatBuku.append(createBtnUndo(), createBtnDelete());
    const completedBook = document.querySelector('.completed-books');
    completedBook.append(tempatBuku);
  } else {
    tempatBuku.append(createBtnCompleted(), createBtnDelete());
    const uncompletedBook = document.querySelector('.uncomplete-books');
    uncompletedBook.append(tempatBuku);
  }
  return tempatBuku;
}

// btn ketika user sudah selesai bacaan
function createBtnCompleted() {
  // buat element btn
  const button = document.createElement('i');
  button.classList.add('fas', 'fa-check-circle', 'fa-2x', 'btn');
  //   membuat event ketika user sudah selesai membaca buku
  button.addEventListener('click', function (event) {
    completedReadBook(event.target.parentElement);
  });
  return button;
}

// btn ketika user ingin membaca buku yang dipilih lagi
function createBtnUndo() {
  // buat element btn
  const button = document.createElement('i');
  button.classList.add('fas', 'fa-redo-alt', 'fa-2x', 'btn');
  //   membuat event pada btn ketika user ingin membaca buku lagi
  button.addEventListener('click', function (event) {
    readBookAgain(event.target.parentElement);
  });
  return button;
}

// btn untuk menghapus buku
function createBtnDelete() {
  // buat element btn
  const button = document.createElement('i');
  button.classList.add('fas', 'fa-trash', 'fa-2x', 'btn');
  //   event untuk menghapus buku
  button.addEventListener('click', function (event) {
    let confirmBuku = confirm('anda yakin akan menghapus buku ini?');
    if (confirmBuku == false) {
      return false;
    } else {
      deleteBook(event.target.parentElement);
    }
  });
  return button;
}

// ketika pembaca selesai membaca buku
function completedReadBook(event) {
  const innerJudul = event.querySelector('.info-book > h2').innerHTML;
  const innerAuthor = event.querySelector('.info-book > h3').innerHTML;
  const innerYear = event.querySelector('.info-book > p').innerHTML;

  const cetak = cetakBuku(innerJudul, innerAuthor, innerYear, true);
  const findIdBook = findBook(event[getId]);
  findIdBook.isCompleted = true;
  cetak[getId] = findIdBook.id;

  event.remove();

  saveDataBuku();
}

// ketika user ingin membaca buku yang dipilih lagi
function readBookAgain(event) {
  const innerJudul = event.querySelector('.info-book > h2').innerHTML;
  const innerAuthor = event.querySelector('.info-book > h3').innerHTML;
  const innerYear = event.querySelector('.info-book > p').innerHTML;

  const cetak = cetakBuku(innerJudul, innerAuthor, innerYear, false);
  const findIdBook = findBook(event[getId]);
  findIdBook.isCompleted = false;
  cetak[getId] = findIdBook.id;

  event.remove();

  saveDataBuku();
}

function deleteBook(event) {
  const bookPosition = findBookIndex(event[getId]);
  books.splice(bookPosition, 1);

  event.remove();

  saveDataBuku();
}

const bookResult = (title, author, year) => {
  // membuat element dan ditempel dari argument
  const Judul = document.createElement('h2');
  Judul.innerHTML = `Title: ${title}`;
  const Author = document.createElement('h3');
  Author.innerHTML = `Author: ${author}`;
  const Year = document.createElement('p');
  Year.innerHTML = `Year: ${year}`;

  // membuat pembungkus untuk element yang sudah dibuat

  const tempatBuku = document.createElement('div');
  tempatBuku.classList.add('bookSearch');
  tempatBuku.append(Judul, Author, Year);

  return tempatBuku;
};
