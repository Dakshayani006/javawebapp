package com.relevancelab.library.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "library")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Book {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@NotBlank
	private String bookname;
	
	@NotBlank
	private String author;
	
	@NotBlank
	private String category;

	public Book() {
		super();
	}

	public Book(Long id, String bookname, String author, String category) {
		super();
		this.id = id;
		this.bookname = bookname;
		this.author = author;
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
/*	@Override
	public String toString() {
		return "Book{" +
				"id='" + id + '\'' +
                ", bookname='" + bookname + '\'' +
                ", author='" + author + '\'' +
                ", category='" + category + '\'' +
                '}';
	}*/
}
