function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
};

const myLibrary = [];

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayLibrary();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

function toggleRead(index) {
    myLibrary[index].toggleReadStatus();
    displayLibrary();
}

function displayLibrary() {
    const libraryDisplay = document.getElementById("libraryDisplay");
    libraryDisplay.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.isRead ? "Read" : "Not Read"}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
        <button class="toggle-btn" data-index="${index}">Change Read Status</button>
      `;

        libraryDisplay.appendChild(bookCard);
    });

    document.querySelectorAll(".remove-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            removeBook(index);
        })
    );

    document.querySelectorAll(".toggle-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            toggleRead(index);
        })
    );
}


document.getElementById("newBookBtn").addEventListener("click", () => {
    const formContainer = document.getElementById("formContainer");
    const body = document.body;

    if (formContainer.style.display === "none" || !formContainer.style.display) {
        formContainer.style.display = "block";
        body.classList.add("show-overlay");
    } else {
        formContainer.style.display = "none";
        body.classList.remove("show-overlay");
    }
});

document.getElementById("bookForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("readStatus").checked;

    addBookToLibrary(title, author, parseInt(pages), isRead);

    e.target.reset();
    document.getElementById("formContainer").style.display = "none";
    document.body.classList.remove("show-overlay");
});



