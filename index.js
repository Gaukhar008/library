const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.library-content__button--add');
const closeModalElem = document.querySelector('.close-element');
const bookTitle = document.querySelector('.modal-content__input--title');
const bookAuthor = document.querySelector('.modal-content__input--author');
const bookPages = document.querySelector('.modal-content__input--pages');
const readBook = document.querySelector('.modal-content__input--checkbox');
const submitBookBtn = document.querySelector('.modal-content__button');
const titleValidationText = document.querySelector('.modal-content__validation-title');
const authorValidationText = document.querySelector('.modal-content__validation-author');
const pagesValidationText = document.querySelector('.modal-content__validation-pages');

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

const createBookCard = (book) => {
    let bookCard = document.createElement('div');
    let title = document.createElement('div');
    let author = document.createElement('div');
    let pages = document.createElement('div');
    let readBookBtn = document.createElement('button');
    let deleteBookBtn = document.createElement('button');

    bookCard.innerHTML = `<div class="book-card" data-index="${i}">`;
    title.classList.add('book-card__item');
    author.classList.add('book-card__item');
    pages.classList.add('book-card__item');
    readBookBtn.classList.add('book-card__item');
    readBookBtn.classList.add('book-card__read-button');
    readBookBtn.type = 'button';
    deleteBookBtn.classList.add('book-card__item');
    deleteBookBtn.classList.add('book-card__delete-button');

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    deleteBookBtn.textContent = 'Delete';
    if (book.read === true) {
        readBookBtn.textContent = 'Read';
        readBookBtn.style.backgroundColor = 'rgb(232, 180, 188)';
    } else {
        readBookBtn.textContent = 'Not read';
        readBookBtn.style.backgroundColor = 'rgb(110, 69, 85)';
        readBookBtn.style.color = '#ffffff';
    }

    document.querySelector('.library-content__cards').appendChild(bookCard);
    document.querySelector(`[data-index="${i}"]`).appendChild(title);
    document.querySelector(`[data-index="${i}"]`).appendChild(author);
    document.querySelector(`[data-index="${i}"]`).appendChild(pages);
    document.querySelector(`[data-index="${i}"]`).appendChild(readBookBtn);
    document.querySelector(`[data-index="${i}"]`).appendChild(deleteBookBtn);
}

function validateForm() {
    if (bookTitle.value.trim().length === 0) {
        titleValidationText.textContent = 'Please fill out this field.';
    } else {
        titleValidationText.textContent = '';
    }
    if (bookAuthor.value.trim().length === 0) {
        authorValidationText.textContent = 'Please fill out this field.';
    } else {
        authorValidationText.textContent = '';
    }
    if (bookPages.value.trim().length === 0 || bookPages.value === '0') {
        pagesValidationText.textContent = 'Please enter a number bigger than 0.';
    } else {
        pagesValidationText.textContent = '';
    }
    if (bookTitle.value.trim().length === 0 || bookAuthor.value.trim().length === 0 ||
        bookPages.value.trim().length === 0 || bookPages.value === '0') {
        return false;
    } else {
        return true;
    }
}

let i = 0;
function displayBook() {
    for (; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    };
};

submitBookBtn.onclick = function () {
    validateForm();
    if (validateForm() === true) {
        addBookToLibrary();
        modal.style.display = 'none';
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        readBook.checked = false;
        displayBook();
        toggleStatus();
        showStatistics();
    }
}

newBookBtn.onclick = function () {
    modal.style.display = 'block';
}

closeModalElem.onclick = function () {
    modal.style.display = 'none';
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    readBook.checked = false;
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        readBook.checked = false;
    }
}

function toggleStatus() {
    const readBookBtns = document.getElementsByClassName('book-card__read-button');
    for (let i = 0; i < readBookBtns.length; i++) {
        readBookBtns[i].onclick = function() {
            if(readBookBtns[i].textContent == 'Read') {
                readBookBtns[i].textContent = 'Not read';
                myLibrary[i]['read'] = false;
                readBookBtns[i].classList.remove('book-card__read-button--cameo-pink');
                readBookBtns[i].classList.add('book-card__read-button--eggplant');
            } else if(readBookBtns[i].textContent == 'Not read') {
                readBookBtns[i].textContent = 'Read';
                myLibrary[i]['read'] = true;
                readBookBtns[i].classList.remove('book-card__read-button--eggplant');
                readBookBtns[i].classList.add('book-card__read-button--cameo-pink');
            }
        };
    }
}

const quantityOfTotalBooks = document.querySelector('.statistics__item-quantity--total');
const quantityOfReadlBooks = document.querySelector('.statistics__item-quantity--read');
const quantityOfUnreadBooks = document.querySelector('.statistics__item-quantity--not-read');

function showStatistics() {
    let readBooks = 0;
    let unreadBooks = 0;
    for(const book of myLibrary) {
        if(book.read == true) {
            readBooks++;
        } else if(book.read == false){
            unreadBooks++;
        }
    }
    quantityOfReadlBooks.textContent = readBooks;
    quantityOfUnreadBooks.textContent = unreadBooks;
    quantityOfTotalBooks.textContent = myLibrary.length;
}