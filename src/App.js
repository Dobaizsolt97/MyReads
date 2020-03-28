import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookDisplay from "./components/bookDisplay";

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  };
  // uppon initialization we store in state an array of the required books in our app
  updateState = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books: books }));
    });
  };
  componentDidMount() {
    /* BooksAPI.getAll().then(books => {
      this.setState(() => ({ books: books }));
    }); */
    this.updateState();
  }
  handleChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.updateState());
  };

  render() {
    //console.log(this.state.books);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookDisplay
                  shelfName="Currently Reading"
                  books={this.state.books}
                  shelf={"currentlyReading"}
                  handleChange={this.handleChange}
                />
                <BookDisplay
                  shelfName="Want to read"
                  books={this.state.books}
                  shelf={"wantToRead"}
                  handleChange={this.handleChange}
                />
                <BookDisplay
                  shelfName="Read"
                  books={this.state.books}
                  shelf={"read"}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
