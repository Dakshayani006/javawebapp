package com.relevancelab.library.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.relevancelab.library.model.Book;
import com.relevancelab.library.repository.BookRepository;
import com.relevancelab.library.service.BookService;

@Controller
@RestController
public class BookController {

	@Autowired
	private BookService bookService;
	private BookRepository bookRepository;
	
		
	//Get all books
	@CrossOrigin(origins ="*")
	@RequestMapping("/books")
	public List<Book> getBooks(){
		return bookService.getAllBooks();
	}
	
	//Add a new book
	@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.POST, value = "/books")
	public void addBook(@RequestBody Book book) {
		bookService.addBook(book);
	}
	
	//Get By id
	@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.GET, value = "/books/{id}")
	public Book getBook(@PathVariable Long id) {
		return bookService.getBook(id);
	}
		
	//Get book by book name
	
	@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.GET, value = "/books/searchbook/{bookname}")
	public List<?> getAllByBookname(@PathVariable(value="bookname") String bookname) {
		return bookService.getAllByBookname(bookname);
	}
		
	//get book by author name
	@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.GET, value = "/books/searchauthor/{author}")
	public List<?> getAllByAuthor(@PathVariable(value="author") String author) {
		return bookService.getAllByAuthor(author);
	}
			
	//search books by category
	@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.GET, value = "/books/searchcategory/{category}")
	public List<?> getAllByCategory(@PathVariable(value="category") String category) {
		return bookService.getAllByCategory(category);
	}
	
	//Update the existing book
	@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.PUT, value="/books/{id}")
	public void updateBook(@RequestBody Book book, @PathVariable Long id) {
		bookService.updateBook(book, id);
	}
		
	//Delete the book
	@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.DELETE, value="/books/{id}")
	public void deleteBook(@PathVariable Long id) {
		bookService.deleteBook(id);
	}
}
