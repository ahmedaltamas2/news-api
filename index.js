const express = require('express');
const puppeteer = require('puppeteer');
const authMiddleware = require('./authMiddleware'); 
const jsonData = require('./data.json');

const app = express();
const port = 3000;

const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }
  ];
  
  // GET request to fetch all books
  app.get('/api/books', authMiddleware,(req, res) => {
    // console.log("data");
    res.json(jsonData);

  });


 app.get('/api/ambition-box-link', authMiddleware,(async (req, res) => {
  const { company_name } = req.query;

  try {
      const url = await pup(company_name);
      res.send({ "url": url });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
    
  })
);
  
  // GET request to fetch a specific book by ID
  app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (!book) {
      res.status(404).send('Book not found');
    } else {
      res.json(book);
    }
  });
  
  // POST request to add a new book
  app.post('/api/books', (req, res) => {
    // Here you would typically handle adding a new book to your data
    res.send('Add new book');
  });
  
  // PUT request to update an existing book
  app.put('/api/books/:id', (req, res) => {
    // Here you would typically handle updating an existing book in your data
    res.send('Update book');
  });
  
  // DELETE request to delete an existing book
  app.delete('/api/books/:id', (req, res) => {
    // Here you would typically handle deleting an existing book from your data
    res.send('Delete book');
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
 async function pup(company_name) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.ambitionbox.com/');
    await page.setViewport({width: 1080, height: 1024});

    // await page.waitForSelector('.ab-typeahead');
    await page.type('.component-input', company_name);


    const searchResultSelector = '.autocomplete-list';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    const currentURL = page.url();
    await browser.close();
    return currentURL;
    
  } catch (error) {
    console.error('Error:', error);
  }
}