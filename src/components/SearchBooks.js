import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import BookDisplay from "./bookDisplay";
import { Link } from "react-router-dom";

class SearchBooks extends Component {
  state = { query: "", books: [] };

  updateUi = text => {
    this.setState(() => ({ books: [] }));

    BooksAPI.search(text).then(result => {
      if (!result || result.error) {
        return;
      } else {
        let ids = result.map(books => books.id);
        let books = [];
        for (const id of ids) {
          BooksAPI.get(id).then(result => {
            books.push(result);
          });
        }

        setTimeout(() => {
          this.setState(() => ({
            books: books
          }));
        }, 1000);
      }
    });
  };
  onInput = text => {
    this.setState(() => ({ query: text, books: [] }));

    this.updateUi(text);
  };
  handleChange = (book, shelf, text = this.state.query) => {
    BooksAPI.update(book, shelf).then(() => this.onInput(text));
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              onClick={() => {
                this.props.return();
              }}
              className="close-search"
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={e => {
                this.onInput(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
        {this.state.query === "" ? null : (
          <BookDisplay
            handleChange={this.handleChange}
            shelf="any"
            books={this.state.books}
          />
        )}
      </div>
    );
  }
}

export default SearchBooks;
