import React from "react";

const Book = props => {
  const { title, authors, imageLinks = "" } = props.info;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${props.info ? imageLinks.thumbnail : ""})`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={e => props.handleChange(props.info, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="none">None</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {props.info ? `${title}` : "To Kill a Mockingbird"}
        </div>
        <div className="book-authors">
          {props.info ? `${authors}` : "To Kill a Mockingbird"}
        </div>
      </div>
    </li>
  );
};

export default Book;
