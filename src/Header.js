import React, { useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import BookList from "./BookList";

const Header = () => {
  // State for loading the results
  const [loadResults, setLoadResults] = useState(10);
  // state for geting query from search input
  const [query, setQuery] = useState("");
  //state for loading results
  const [loading, setLoading] = useState(false);
  //state for geting Book cards
  const [books, setbooks] = useState([]);
  // State sor hiding and  showing button load more
  const [loadMore, setloadMore] = useState(false);

  // Handle Search
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}+inauthor:${query}&key=AIzaSyAKhTHZWCnkHc2iiFb9MyotunrifavI-h0&filter=free-ebooks&maxResults=${loadResults}`
      )
      .then((Response) => {
        if (Response.data.items.length > 0) {
          const cleanData = CleanData(Response);
          setbooks(cleanData);
          setLoading(false);
          setloadMore(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`There Is No More Books Authored by ${query}`);
        console.log(error);
        setLoadResults(10);
      });
  };
  //function use to  set the loadResults in the handle for the load more button in the BookList component
  const setResults = (results) => {
    setLoadResults(results);
  };
  //checking and filtering the data in book
  const CleanData = (Response) => {
    const cleandata = Response.data.items.map((book) => {
      if (book.volumeInfo.hasOwnProperty("publishedDate") === false) {
        book.volumeInfo["publishedDate"] = "0000";
      }
      if (book.volumeInfo.hasOwnProperty("imageLinks") === false) {
        book.volumeInfo["imageLinks"] = {
          thumbnail:
            "https://upload.wikimedia.org/wikipedia/en/0/0f/Image_not_available-en.png",
        };
      }
      if (book.volumeInfo.hasOwnProperty("ratingsCount") === false) {
        book.volumeInfo["ratingsCount"] = "0";
      }
      if (book.volumeInfo.hasOwnProperty("publisher") === false) {
        book.volumeInfo["publisher"] = "not availabe yet";
      }
      if (book.volumeInfo.hasOwnProperty("pageCount") === false) {
        book.volumeInfo["pageCount"] = "not availabe";
      }
      if (book.volumeInfo.hasOwnProperty("authors") === false) {
        book.volumeInfo["authors"] = "not availabe";
      }
      if (book.accessInfo.hasOwnProperty("epub") === false) {
        book.accessInfo["epub"] = { downloadLink: "" };
      }
      if (book.accessInfo.hasOwnProperty("pdf") === false) {
        book.accessInfo["pdf"] = { downloadLink: "" };
      }
      return book;
    });
    const sortedCleanData = cleandata.sort((a, b) => {
      return (
        parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
        parseInt(a.volumeInfo.publishedDate.substring(0, 4))
      );
    });
    return sortedCleanData;
  };
  //changing the class of the body
  var element = document.getElementById("body");
  element.classList.remove("body");
  element.classList.add("bodyHeader");
  return (
    <div>
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1
          className="display-2 text-center text-white mb-3"
          style={{ zIndex: 2 }}
        >
          Google Books
        </h1>
        <div style={{ width: "60%", zIndex: 2 }}>
          <form onSubmit={handleSubmit}>
            <InputGroup size="lg" className="mb-3">
              <Input
                placeholder="Search For An Authors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button color="secondary">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </form>
        </div>
      </div>
      <BookList
        loading={loading}
        loadResults={loadResults}
        handleMoreResults={setResults}
        books={books}
        loadMore={loadMore}
        handle={handleSubmit}
      />
    </div>
  );
};

export default Header;
