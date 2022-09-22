const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.library-content__button--add');
const closeModalElem = document.querySelector('.close-element');
const title = document.querySelector('.modal-content__input--title');
const author = document.querySelector('.modal-content__input--author');
const pages = document.querySelector('.modal-content__input--pages');
const isRead = document.querySelector('.modal-content__input--checkbox');
const submitBookBtn = document.querySelector('.modal-content__button');
const titleValidationText = document.querySelector('.modal-content__validation-title');
const authorValidationText = document.querySelector('.modal-content__validation-author');
const pagesValidationText = document.querySelector('.modal-content__validation-pages');
const quantityOfTotalBooks = document.querySelector('.statistics__item-quantity--total');
const quantityOfReadBooks = document.querySelector('.statistics__item-quantity--read');
const quantityOfUnreadBooks = document.querySelector('.statistics__item-quantity--not-read');
const deleteAllBooksButton = document.querySelector('.library-content__button--delete');
const cardsContainer = document.querySelector('.library-content__cards');


// Book Class: represents one book;

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}


// Library Class: represents book collection;

class Library {
    constructor() {
        this.books = [];
    }
}

const library = new Library();


// UI Class: handle UI tasks;

class UI {
    static displayBook() {
        UI.createBookCard(library.books[library.books.length - 1]);
    }

    static addBookToLibrary() {
        const book = UI.getBookFromInput();
        library.books.push(book);
    }

    static getBookFromInput() {
        const title = document.querySelector('.modal-content__input--title').value;
        const author = document.querySelector('.modal-content__input--author').value;
        const pages = document.querySelector('.modal-content__input--pages').value;
        const isRead = document.querySelector('.modal-content__input--checkbox').checked;
        return new Book(title, author, pages, isRead);
    }

    static createBookCard(book) {
        const bookCard = document.createElement('div');
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const readBookBtn = document.createElement('button');
        const deleteBookBtn = document.createElement('button');

        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', library.books.indexOf(book));
        title.classList.add('book-card__item');
        author.classList.add('book-card__item');
        pages.classList.add('book-card__item');
        readBookBtn.classList.add('book-card__item');
        readBookBtn.classList.add('book-card__read-button');
        readBookBtn.setAttribute('data-index', library.books.indexOf(book));
        deleteBookBtn.classList.add('book-card__item');
        deleteBookBtn.classList.add('book-card__delete-button');
        deleteBookBtn.setAttribute('data-index', library.books.indexOf(book));

        title.textContent = `"${book.title}"`;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;
        deleteBookBtn.textContent = 'Delete';
        if (book.isRead === true) {
            readBookBtn.textContent = 'Read';
            readBookBtn.style.backgroundColor = 'rgb(232, 180, 188)';
        } else {
            readBookBtn.textContent = 'Not read';
            readBookBtn.style.backgroundColor = 'rgb(110, 69, 85)';
            readBookBtn.style.color = '#ffffff';
        }

        bookCard.append(title);
        bookCard.append(author);
        bookCard.append(pages);
        bookCard.append(readBookBtn);
        bookCard.append(deleteBookBtn);
        cardsContainer.append(bookCard);
    }

    static validateForm() {
        if (title.value.trim().length === 0) {
            titleValidationText.textContent = 'Please fill out this field.';
        } else {
            titleValidationText.textContent = '';
        }
        if (author.value.trim().length === 0) {
            authorValidationText.textContent = 'Please fill out this field.';
        } else {
            authorValidationText.textContent = '';
        }
        if (pages.value.trim().length === 0 || pages.value === '0') {
            pagesValidationText.textContent = 'Please enter a number bigger than 0.';
        } else {
            pagesValidationText.textContent = '';
        }
        if (title.value.trim().length === 0 || author.value.trim().length === 0 ||
            pages.value.trim().length === 0 || pages.value === '0') {
            return false;
        } else {
            return true;
        }
    }

    static showStatistics() {
        let readBooks = 0;
        let unreadBooks = 0;
        for (let book of library.books) {
            if (book === null) {
                continue;
            } else if (book.isRead == true) {
                readBooks++;
            } else if (book.isRead == false) {
                unreadBooks++;
            }
        }
        quantityOfReadBooks.textContent = readBooks;
        quantityOfUnreadBooks.textContent = unreadBooks;
        quantityOfTotalBooks.textContent = readBooks + unreadBooks;
    }

    static deleteBook() {
        const deleteBtns = document.getElementsByClassName('book-card__delete-button');
        const array = Array.from(deleteBtns);
        array.forEach(button => button.onclick = function () {
            let index = button.getAttribute('data-index');
            let card = document.querySelector(`[data-index='${index}']`);
            cardsContainer.removeChild(card);
            library.books[index] = null;
            UI.showStatistics();
        });
    }

    static toggleStatus() {
        const readBookBtns = document.getElementsByClassName('book-card__read-button');
        for (let i = 0; i < readBookBtns.length; i++) {
            readBookBtns[i].onclick = function () {
                if (readBookBtns[i].textContent == 'Read') {
                    readBookBtns[i].textContent = 'Not read';
                    library.books[i]['isRead'] = false;
                    readBookBtns[i].classList.remove('book-card__read-button--cameo-pink');
                    readBookBtns[i].classList.add('book-card__read-button--eggplant');
                    UI.showStatistics();
                } else if (readBookBtns[i].textContent == 'Not read') {
                    readBookBtns[i].textContent = 'Read';
                    library.books[i]['isRead'] = true;
                    readBookBtns[i].classList.remove('book-card__read-button--eggplant');
                    readBookBtns[i].classList.add('book-card__read-button--cameo-pink');
                    UI.showStatistics();
                }
            };
        }
    }
}


// Events 

submitBookBtn.onclick = function () {
    UI.validateForm();
    if (UI.validateForm() === true) {
        UI.addBookToLibrary();
        UI.displayBook();
        modal.style.display = 'none';
        title.value = '';
        author.value = '';
        pages.value = '';
        isRead.checked = false;
        UI.showStatistics();
        UI.toggleStatus();
        UI.deleteBook();
    }
}

newBookBtn.onclick = function () {
    modal.style.display = 'block';
}

closeModalElem.onclick = function () {
    modal.style.display = 'none';
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false;
    titleValidationText.textContent = '';
    authorValidationText.textContent = '';
    pagesValidationText.textContent = '';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        title.value = '';
        author.value = '';
        pages.value = '';
        isRead.checked = false;
        titleValidationText.textContent = '';
        authorValidationText.textContent = '';
        pagesValidationText.textContent = '';
    }
}

deleteAllBooksButton.onclick = function () {
    library.books = [];
    const cards = document.querySelector('.library-content__cards');
    while (cards.firstChild) {
        cards.removeChild(cards.lastChild);
    }
    quantityOfReadBooks.textContent = 0;
    quantityOfUnreadBooks.textContent = 0;
    quantityOfTotalBooks.textContent = 0;
}
