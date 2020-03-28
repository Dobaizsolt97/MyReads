import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookDisplay from "./components/bookDisplay";
import SearchBooks from "./components/SearchBooks";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };
  // uppon initialization we store in state an array of the required books in our app
  updateState = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books: books }));
    });
  };

  componentDidMount() {
    this.updateState();
  }
  handleChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.updateState());
    //console.log(book, shelf);
  };

  render() {
    //console.log(this.state.books);
    return (
      <div className="app">
        <Route
          exact
          path="/add"
          render={() => <SearchBooks return={this.updateState} />}
        />
        <Route
          exact
          path="/"
          render={() => (
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
                <Link to="/add">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
