import { Button, Spinner, } from "reactstrap";
import "react-toastify/dist/ReactToastify.min.css";
import BookCard from "./BookCard.js";

const BookList = (props) => {
    const handle = () => {
        props.handleMoreResults(props.loadResults + 5);
    }
    if (props.loading) {
        return (
            <div className="d-flex justify-content-center mt-3">
                <Spinner style={{ width: "3rem", height: "3rem" }} />
            </div>
        );
    } else {
        const items = props.books.slice(0, props.loadResults).map((item, i) => {
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
                {props.loadMore && <Button className="load" onClick={handle}>
                    Load more
                </Button>
                }
            </div>
        );
    }
};

export default BookList;
