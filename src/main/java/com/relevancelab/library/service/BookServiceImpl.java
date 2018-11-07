package com.relevancelab.library.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relevancelab.library.model.Book;
import com.relevancelab.library.repository.BookRepository;
import com.relevancelab.library.DataNotFoundException.*;

@Service
public class BookServiceImpl  implements BookService{
 
	@Autowired
	private BookRepository bookRepository;
	
	public List<Book> getAllBooks(){
		List<Book> books = new ArrayList<>();
		bookRepository.findAll().forEach(books::add);
        return books;
	}
	
	public Book getBook(Long id) {
		return bookRepository.getOne(id);
	}
	
	public void deleteBook(Long id) {
		bookRepository.deleteById(id);
	}
	
	public void updateBook(Book book, Long id) {
		bookRepository.save(book);
	}
	public void addBook(Book book) {
		bookRepository.save(book);
	}

	public List<?> getAllByBookname(String bookname) {
		return bookRepository.findAllByBooknameIgnoreCase(bookname);
	}

	public List<?> getAllByAuthor(String author) {
		return bookRepository.findAllByAuthorIgnoreCase(author);
	}

	@Override
	public List<?> getAllByCategory(String category) {
		return bookRepository.findAllByCategoryIgnoreCase(category);
	}
	

}
