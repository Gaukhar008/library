const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.library-content__button--add');
const closeModalElem = document.querySelector('.close-element');
const bookTitle = document.querySelector('.modal-content__input--title');
const bookAuthor = document.querySelector('.modal-content__input--author');
const bookPages = document.querySelector('.modal-content__input--pages');
const readBook = document.querySelector('.modal-content__input--checkbox');
const submitBookBtn = document.querySelector('.modal-content__button');

function validateForm() {
    if(bookTitle.value == '' || bookAuthor.value == '' || bookPages.value == '') {
        alert('Please fill all the fields!')
    } else {
        addBookToLibrary();
        modal.style.display = 'none';
        bookTitle.value = '';
        bookAuthor.value ='';
        bookPages.value = '';
        readBook.checked = false;
        displayBook();
    }
}

submitBookBtn.onclick = function() {
    validateForm();
}

newBookBtn.onclick = function() {
    modal.style.display = 'block';
}

closeModalElem.onclick = function() {
    modal.style.display = 'none';
    bookTitle.value = '';
    bookAuthor.value ='';
    bookPages.value = '';
    readBook.checked = false;
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = 'none';
        bookTitle.value = '';
        bookAuthor.value ='';
        bookPages.value = '';
        readBook.checked = false;
    }
}

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary() {
    const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readBook.checked);
    myLibrary.push(book);
};

let i = 0;
function displayBook() {
    for (; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    };
};

const createBookCard = (book) => {
    let bookCard = document.createElement('div');
    let title = document.createElement('div');
    let author = document.createElement('div');
    let pages = document.createElement('div');
    let readBook = document.createElement('button');
    let deleteBook = document.createElement('button');

    bookCard.innerHTML = `<div class="book-card" data-index="${i}">`; 
    title.classList.add('book-card__item');
    author.classList.add('book-card__item');
    pages.classList.add('book-card__item');
    readBook.classList.add('book-card__item');
    deleteBook.classList.add('book-card__item');

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    deleteBook.textContent = 'Delete';
    if(book.read == true) {
        readBook.textContent = 'Read';
    } else {
        readBook.textContent = 'Not read';
    }

    document.querySelector('.library-content__cards').appendChild(bookCard);
    document.querySelector(`[data-index="${i}"]`).appendChild(title);
    document.querySelector(`[data-index="${i}"]`).appendChild(author);
    document.querySelector(`[data-index="${i}"]`).appendChild(pages);
    document.querySelector(`[data-index="${i}"]`).appendChild(readBook);
    document.querySelector(`[data-index="${i}"]`).appendChild(deleteBook);
}