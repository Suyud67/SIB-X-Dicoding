// LocalStorage Key
const BOOKSHELF_KEY = 'BookShelf_Key';

let books = [];

// cek localStorage
function checkLocalStorage() {
  if (typeof Storage !== 'undefined') {
    return true;
  } else {
    alert('Browser Anda Tidak Mendukung Local Storage!');
    return false;
  }
}

// menyimpan data input ke object
function saveToObject(judul, author, year, isCompleted) {
  return {
    id: +new Date(),
    judul,
    author,
    year,
    isCompleted,
  };
}

// save perubahan yang terjadi pada element
function saveDataBuku() {
  if (checkLocalStorage()) {
    const getData = JSON.stringify(books);
    localStorage.setItem(BOOKSHELF_KEY, getData);
  }
}

// cari book dari parent atau id element yang dikirim
function findBook(itemId) {
  for (book of books) {
    if (book.id === itemId) return book;
  }
}

// mencari index item dari book id yang diambil
function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

// ketika user load atau baru masuk ke browser dan sekalian render
function loadDataBuku() {
  if (checkLocalStorage()) {
    if (localStorage.getItem(BOOKSHELF_KEY) !== null) {
      const getItemsData = localStorage.getItem(BOOKSHELF_KEY);
      let items = JSON.parse(getItemsData);

      if (items !== null) books = items;

      for (book of books) {
        const refreshBook = cetakBuku(book.judul, book.author, book.year, book.isCompleted);
        refreshBook[getId] = book.id;
      }
    } else {
      return [];
    }
  }
}

const getBooks = (keyword) => {
  if (checkLocalStorage()) {
    if (localStorage.getItem(BOOKSHELF_KEY) !== null) {
      const bookDatas = localStorage.getItem(BOOKSHELF_KEY);
      const books = JSON.parse(bookDatas);
      const filteredBooks = books.filter((book) => book.judul.toLowerCase().includes(keyword.toLowerCase()));

      if (filteredBooks.length) {
        return filteredBooks;
      } else {
        alert('Buku tidak ditemukan!');
        return [];
      }
    } else {
      return [];
    }
  }
};
