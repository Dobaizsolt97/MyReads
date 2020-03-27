import React from "react";
import Book from "./Book";

const BookDisplay = props => {
  const nowReading = props.books.filter(book => book.shelf === props.shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {nowReading.map(item => (
            <Book key={item.id} info={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookDisplay;
