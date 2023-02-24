const authorForm = document.querySelector("#author");
const titleForm = document.querySelector("#title");
const pagesForm = document.querySelector("#amount-of-pages");
const submitButton = document.querySelector("#submit-button");

const bookTable = document.querySelector(".book-table");

let myLibrary = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.added = false;
  this.read = false;
}

function addBookToLibrary(array) {
  let book = new Book(authorForm.value, titleForm.value, pagesForm.value);

  authorForm.value = "";
  titleForm.value = "";
  pagesForm.value = "";

  array.push(book);
  searchThroughBooks(myLibrary);
}

function searchThroughBooks(books) {
  books.forEach((book) => {
    if (!book.added) {
      const div = document.createElement("div");
      div.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
      div.setAttribute("id", `${myLibrary.indexOf(book)}`);
      div.setAttribute("class", "p-3 bg-slate-300");
      bookTable.appendChild(div);

      addButtons(div, book);
      book.added = true;
    }
  });
}

function addButtons(div, book) {
  const readButton = createButton("read");

  div.appendChild(readButton);

  readButton.addEventListener("click", () => {
    book.read = true;
    div.setAttribute("style", "color: green;");
  });

  const removeButton = createButton("remove");
  removeButton.setAttribute(
    "class",
    "bg-slate-500 rounded-xl text-slate-50 shadow-xl"
  );

  div.appendChild(removeButton);

  removeButton.addEventListener("click", () => {
    bookTable.removeChild(div);
    delete myLibrary[myLibrary.indexOf(book)];
    console.log(myLibrary);
  });
}

function createButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.setAttribute("style", "width: 4rem; height: 2rem; margin: 5px;");
  return button;
}
