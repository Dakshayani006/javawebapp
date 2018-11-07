package com.relevancelab.library.service;

import java.util.List;

import com.relevancelab.library.model.Book;

public interface BookService {
	
	public List<Book> getAllBooks();
    
	public Book getBook(Long id);
    
	public void deleteBook(Long id);
    	 
	public void addBook(Book book);

	public void updateBook(Book book, Long id);

	public List<?> getAllByBookname(String bookname);

	public List<?> getAllByAuthor(String author);

	public List<?> getAllByCategory(String category);

	

}
