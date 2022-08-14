const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.library-content__button--add');
const closeModalElem = document.querySelector('.close-element');
const bookTitle = document.querySelector('.modal-content__input--title');
const bookAuthor = document.querySelector('.modal-content__input--author');
const bookPages = document.querySelector('.modal-content__input--pages');
const readBook = document.querySelector('.modal-content__input--checkbox');
const submitBookBtn = document.querySelector('.modal-content__button');

submitBookBtn.onclick = function() {
    addBookToLibrary();
    displayBook();
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

function displayBook() {
myLibrary.forEach((book) => {
    let bookCard = createBookCard(book);

});
};

const createBookCard = (book) => {
    let bookCard = document.createElement('div');
    let title = document.createElement('div');
    let author = document.createElement('div');
    let pages = document.createElement('div');
    let readBook = document.createElement('button');
    let deleteBook = document.createElement('button');

    bookCard.classList.add('book-card');
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
    document.querySelector('.book-card').appendChild(title);
    document.querySelector('.book-card').appendChild(author);
    document.querySelector('.book-card').appendChild(pages);
    document.querySelector('.book-card').appendChild(readBook);
    document.querySelector('.book-card').appendChild(deleteBook);
}

function updateBookCard() {

}

createBookCard();