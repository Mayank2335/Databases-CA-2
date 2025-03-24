const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post('/', async (req, res) => {
  try {
    const { title, author, genre, publishedYear, availableCopies, borrowedBy } = req.body;
    if (!title || !author || !genre || availableCopies === undefined) return res.status(400).send('Missing required fields');
    const newBook = new Book({ title, author, genre, publishedYear, availableCopies, borrowedBy });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).send('Book not found');
    res.json(updatedBook);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).send('Book not found');
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
