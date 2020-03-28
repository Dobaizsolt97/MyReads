import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import BookDisplay from "./bookDisplay";

class SearchBooks extends Component {
  state = { query: "", books: [] };
  onInput = text => {
    this.setState(() => ({ query: text, books: [] }));
    BooksAPI.search(text).then(result => {
      if (!result) {
        return;
      } else if (result.error) {
        return;
      } else {
        let ids = result.map(books => books.id);
        //console.log(ids);

        for (const id of ids) {
          BooksAPI.get(id).then(result => {
            this.setState(() => ({
              books: [...this.state.books, result]
            }));
          });
        }
      }
    });
  };
  render() {
    console.log(this.state.books);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={e => this.onInput(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
        <BookDisplay shelf="any" books={this.state.books} />
      </div>
    );
  }
}

export default SearchBooks;
