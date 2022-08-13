

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} ${this.author}, ${this.pages} pages, ${this.read}`
    };
};

function addBookToLibrary() {
    const title = prompt('Title?','');
    const author = prompt('Author?','');
    const pages = prompt('Pages?','');
    const read = prompt('Have you read it?','');

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
};

function displayBook() {
myLibrary.forEach((book) => {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.textContent += book.info();
    document.querySelector('.library-content__cards').appendChild(bookCard);
});
};

