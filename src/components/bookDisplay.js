import React from "react";
import Book from "./Book";

const BookDisplay = props => {
  let nowReading = [];
  if (props.shelf === "any") {
    nowReading = props.books;
  } else {
    nowReading = props.books.filter(book => book.shelf === props.shelf);
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {nowReading.map(item => (
            <Book key={item.id} info={item} handleChange={props.handleChange} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookDisplay;
