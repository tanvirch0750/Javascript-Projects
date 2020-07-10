/***************************************
 * todo -> Book Class: Represents a Book
 ***************************************/
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/***************************************
 * todo -> UI Class: Handle UI TASK
 ***************************************/
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
      `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alerts ${className}`;
    div.appendChild(document.createTextNode(message));
    const alertParent = document.querySelector('.alert-parent');
    const card = document.querySelector('.js-selector');
    alertParent.insertBefore(div, card);

    // vanish after 3 seconds
    setTimeout(() => document.querySelector('.alerts').remove(), 3000);
  }
}

/***************************************
 * todo -> Store Class: Handle Storage
 ***************************************/
class Store {

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

/***************************************
 * todo -> Event: Display Book
 ***************************************/
document.addEventListener('DOMContentLoaded', UI.displayBooks);


/***************************************
 * todo -> Event: Add a Book
 ***************************************/
document.getElementById('book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('please fill in all fields', 'error');

  } else {

    // Create Book object
    const book = new Book(title, author, isbn);

    // Add Book to Ui
    UI.addBookToList(book);

    // Add Book to Store
    Store.addBook(book);

    // Show Success Message
    UI.showAlert('Book Added', 'done');

    // Clear Fields
    UI.clearFields();

  }


});

/***************************************
 * todo -> Event: Remove a Book
 ***************************************/
document.getElementById('book-list').addEventListener('click', e => {

  // Remove Book from UI
  UI.deleteBook(e.target);

  // Remove book from the store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Remove Book
  UI.showAlert('Book Removed', 'done');

});