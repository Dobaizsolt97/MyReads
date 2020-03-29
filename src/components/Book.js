import React from "react";

const Book = props => {
  const { title, authors, imageLinks = "", shelf } = props.info;

  return (
    <li key={props.info.id}>
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
              onChange={e => {
                props.handleChange(props.info, e.target.value);
              }}
            >
              <option value="move">Move to...</option>
              <option value="none">
                {shelf === "none" ? "> None" : "None"}
              </option>
              <option value="currentlyReading">
                {shelf === "currentlyReading"
                  ? "> Currently Reading"
                  : "Currently Reading"}
              </option>
              <option value="wantToRead">
                {shelf === "wantToRead" ? "> Want to read" : "Want to read"}
              </option>
              <option value="read">
                {shelf === "read" ? "> Read" : "Read"}
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.info ? `${title}` : ""}</div>
        <div className="book-authors">{props.info ? `${authors}` : ""}</div>
      </div>
    </li>
  );
};

export default Book;
