import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import "./App.css";
import { InputGroup, Input, Button, Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import BookCard from "./BookCard.js";
function Apptest() {
  // State for loading the results
  const [loadResults, setLoadResults] = useState(10);
  // state for geting query from search input
  const [query, setQuery] = useState("");
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

  // Header Component
  const Header = () => {
    var element = document.getElementById("body");
    element.classList.remove("body");
    element.classList.add("bodyHeader");
    return (
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
    );
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

  //handle for loading more results
  const handle = (e) => {
    setLoadResults(loadResults + 5);
    handleSubmit(e);
  };
  // Show  List Books component
  const BookList = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </div>
      );
    } else {
      const items = books.map((item, i) => {
        return (
          <div className="col-lg-4 mb-3" key={i}>
            {
              // adding bookcard to the list books and sending props to bookcard
              <BookCard
                thumbnail={item.volumeInfo.imageLinks.thumbnail}
                title={item.volumeInfo.title}
                pageCount={item.volumeInfo.pageCount}
                language={item.volumeInfo.language}
                authors={item.volumeInfo.authors}
                publisher={item.volumeInfo.publisher}
                previewLink={item.volumeInfo.previewLink}
                epublink={item.accessInfo.epub.downloadLink}
                publishedDate={item.volumeInfo.publishedDate}
                Starrating={item.volumeInfo.averageRating}
                ratingcount={item.volumeInfo.ratingsCount}
                pdflink={item.accessInfo.pdf.downloadLink}
              />
            }
          </div>
        );
      });
      return (
        <div className="container my-5">
          <div className="row">{items}</div>
          {loadMore ? (
            <Button className="load" onClick={handle}>
              Load more
            </Button>
          ) : (
            ""
          )}
        </div>
      );
    }
  };
  //Google Auth component
  const Authenticaton = () => {
    const clientId =
      "998452743005-etmguubtqm5kk5kp4185k7lbqq26mpvf.apps.googleusercontent.com";
    //states for hiding and showing header and button
    const [showloginButton, setShowloginButton] = useState(true);
    const [ShowHeader, setShowHeader] = useState(false);
    //google login success
    const onLoginSuccess = (res) => {
      console.log("Login Success:", res.profileObj);
      setShowloginButton(false);
      setShowHeader(true);
    };
    const onLoginFailure = () => {
      alert("something went wrong..login failed.Please try again");
      setShowloginButton(true);
    };

    return (
      //after login success the login button hide and show the header component
      <div>
        {showloginButton ? (
          <div id="grad1">
            <h1 className="das">Welcome To Our Library! </h1>

            <div className="g-signin">
              <div className="customBtn">
                <GoogleLogin
                  className="goole"
                  clientId={clientId}
                  buttonText="log in with google to continue"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </div>
            </div>
          </div>
        ) : null}
        {ShowHeader ? Header() : null}
      </div>
    );
  };

  return (
    <div className="w-100 h-100">
      {Authenticaton()}
      {BookList()}
      <ToastContainer />
    </div>
  );
}

export default Apptest;
