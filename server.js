const express = require("express");
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "Első könyv", author: "Nagy István", year: 2017 },
  { id: 2, title: "Második könyv", author: "Kis István", year: 2018 },
  { id: 3, title: "Harmadik könyv", author: "Közepes István", year: 2019 },
];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body;
  const ujKonyv = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    year,
  };
  books.push(ujKonyv);
  res.status(201).json(ujKonyv);
});

app.get("/api/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "A könyv nem található." });
    res.json(book);
  });

app.put("/api/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "A könyv nem taláható." });
  
    const { title, author, year } = req.body;
    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.year = year ?? book.year;
  
    res.json(book);
  });
  
app.listen(3010, () => console.log("A Books API fut a 3010-es porton."));




