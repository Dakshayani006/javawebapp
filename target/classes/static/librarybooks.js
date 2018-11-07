	$(document).ready(function() {
	    bookList();
	});
	/* $.ajax({
        url: "http://localhost:8080/books"
    }).then(function(data) {
	    console.log(data);
		// Iterate over the collection of data
		var books = data;
		$.each(books, function (index, book) {
			// Add a row to the book table
			//console.log(books);
			//console.log(book);
			bookAddRow(book);
		});
    
	}); */

	var Book = {
	    id: 0,
	    bookname: "",
	    author: "",
		category:"",
	}

	function bookList() {
	    // Call Rest API to get a list of books
	    $.ajax({
	        url: 'http://localhost:8080/books',
	        type: 'GET',
	        dataType: 'json',
	        success: function(books) {
	            bookListSuccess(books);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function bookListSuccess(books) {
	    $.each(books, function(index, book) {
	        // Add a row to the book table
	        bookAddRow(book);
	    });
	}

	function bookAddRow(book) {
	    console.log('inside bookAddRow');
	    console.log(book);
	    // Check if <tbody> tag exists, add one if not
	    if ($("#bookTable tbody").length == 0) {
	        $("#bookTable").append("<tbody id='tableid'></tbody>");
	    }
	    // Append row to <table>
	    $("#bookTable tbody").append(bookBuildTableRow(book));
	}

	function bookBuildTableRow(book) {
	    console.log(book);
	    var ret =
	        "<tr>" +
	        "<td>" +
	        "<button type='button' " +
	        "onclick='bookGet(this);' " +
	        "class='btn btn-default' " +
	        "data-id='" + book.id + "'>" +
	        "<span class='glyphicon glyphicon-edit' />" +
	        "</button>" +
	        "</td >" +
	        "<td>" + book.id + "</td>" +
	        "<td>" + book.bookname + "</td>" +
	        "<td>" + book.author + "</td>" +
			"<td>" + book.category + "</td>" +
	        "<td>" +
	        "<button type='button' " +
	        "onclick='bookDelete(this);' " +
	        "class='btn btn-default' " +
	        "data-id='" + book.id + "'>" +
	        "<span class='glyphicon glyphicon-remove' />" +
	        "</button>" +
	        "</td>" +
	        "</tr>";
	    return ret;
	}

	function handleException(request, message, error) {
	    var msg = "";
	    msg += "Code: " + request.status + "\n";
	    msg += "Text: " + request.statusText + "\n";
	    if (request.responseJSON != null) {
	        msg += "Message" + request.responseJSON.Message + "\n";
	    }
	    alert(msg);
	}

	// Handle click event on Update button
	function bookUpdate(book) {
	    $.ajax({
	        url: "http://localhost:8080/books/" + book.id,
	        type: 'PUT',
	        contentType: "application/json;charset=utf-8",
	        data: JSON.stringify(book),
	        success: function(book) {
	            bookUpdateSuccess(book);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function bookUpdateSuccess(book) {
	    bookUpdateInTable(book);
	    //$("#bookTable tbody").remove();
	    //formClear();
	    //bookList();
	}

	function bookUpdateInTable(book) {

	    Book = new Object();
	    Book.bookname = $("#bookname").val();
	    Book.author = $("#author").val();
        Book.category = $("#category").val();

	    // Find book in <table>
	    var row = $("#bookTable button[data-id='" + Book.id + "']").parents("tr")[0];
	    // Add changed book to table
	    $(row).after(bookBuildTableRow(Book));
	    // Remove original book
	    $(row).remove();
	    formClear(); // Clear form fields
	    // Change Update Button Text
	    $("#updateButton").text("Add");
	}

	// Handle click event on Add button
	function bookAdd(book) {
	    $.ajax({
	        url: "http://localhost:8080/books",
	        type: 'POST',
	        contentType: "application/json;",
	        data: JSON.stringify(book),
	        success: function(book) {
	            bookAddSuccess(book);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function bookAddSuccess(book) {
	    $("#bookTable tbody").remove();
	    formClear();
	    bookList();
	}

	function formClear() {
	    $("#bookid").val("");
	    $("#bookname").val("");
	    $("#author").val("");
	    $("#category").val("");
	}

	function addClick() {
	    formClear();
	}

	function updateClick() {
	    // Build Book object from inputs
	    Book = new Object();
	    Book.bookname = $("#bookname").val();
	    Book.author = $("#author").val();
	    Book.category = $("#category").val();
	    if ($("#updateButton").text().trim() == "Add") {
	        //console.log(Book);
	        bookAdd(Book);
	    } else {
	        Book.id = $("#bookid").val();
	        bookUpdate(Book);
	    }
	}

	function bookToFields(book) {
	    $("#bookid").val(book.id);
	    $("#bookname").val(book.bookname);
	    $("#author").val(book.author);
		$("#category").val(book.category);
	}

	function bookGet(ctl) {
	    // Get book id from data- attribute
	    var id = $(ctl).data("id");

	    // Store book id in hidden field
	    $("#id").val(id);

	    // Call REST API to get a list of Book
	    $.ajax({
	        url: "http://localhost:8080/books/" + id,
	        type: 'GET',
	        dataType: 'json',
	        success: function(book) {
	            bookToFields(book);

	            // Change Update Button Text
	            $("#updateButton").text("Update");
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function bookDelete(ctl) {
	    var id = $(ctl).data("id");

	    $.ajax({
	        url: "http://localhost:8080/books/" + id,
	        type: 'DELETE',
	        success: function(book) {
	            $(ctl).parents("tr").remove();
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}
	
   function searchBoook(){
		var book_name =  $("#searchbook").val();
		$.ajax({
	        url: 'http://localhost:8080/books/searchbook/' + book_name,
	        type: 'GET',
	        dataType: 'json',
	        success: function(books) {
	        	$("#tableid").empty();
	        	formClear();
	            bookListSuccess(books);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}
	function searchAuthor(){
	   var author_name = $("#searchauthor").val();
		$.ajax({
	        url: 'http://localhost:8080/books/searchauthor/' + author_name,
	        type: 'GET',
	        dataType: 'json',
	        success: function(books) {
	        	$("#tableid").empty();
	        	formClear();
	            bookListSuccess(books);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });	
	}
	function searchCategory(){
		 var category_name = $("#searchcategory").val();
		$.ajax({
	        url: 'http://localhost:8080/books/searchcategory/' + category_name,
	        type: 'GET',
	        dataType: 'json',
	        success: function(books) {
	        	formClear();
	        	$("#tableid").empty();
	            bookListSuccess(books);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });	
	}