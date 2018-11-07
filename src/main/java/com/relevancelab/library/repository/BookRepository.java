package com.relevancelab.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.relevancelab.library.model.*;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findAllByBooknameIgnoreCase(String bookname);

	List<Book> findAllByAuthorIgnoreCase(String author);

	List<Book> findAllByCategoryIgnoreCase(String category);

}