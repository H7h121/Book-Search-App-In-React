import React, { useState } from "react";
import {
  Dropdown,
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Button,
  Modal,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
// import EmbedViewer from "./EmbedViewer";

const BookCard = (props) => {
  // States for setting and showing modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [Open, setOpen] = useState(false);

  return (
    <Card id="card" style={{ width: "233px" }} className="m-auto ">
      <CardImg
        top
        className="cardImg"
        src={props.thumbnail}
        alt={props.title}
      />
      <CardBody>
        <CardTitle className="card-title">{props.title}</CardTitle>
        <p>Publisher: {props.publisher}</p>
        <p>Author: {props.authors}</p>
        <p>Date: {props.publishedDate}</p>
        <p>Ratings Count: {props.ratingcount}</p>
        <p>
          <StarRatingComponent starCount={5} value={props.Starrating} />
        </p>

        <Button onClick={toggle}>More info</Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-header d-flex justify-content-center">
          <h5 className="modal-title text-center" id="exampleModalLabel">
            {props.title}
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between ml-3">
            <img
              src={props.thumbnail}
              alt={props.title}
              style={{ height: "233px", width: "35%" }}
            />
            <div style={{ paddingLeft: 34 }}>
              <p>Page Count: {props.pageCount}</p>
              <p>Language : {props.language}</p>
              <p>Authors : {props.authors}</p>
              <p>Publisher : {props.publisher}</p>
            </div>
          </div>
          <div className="mt-3">{props.description}</div>
        </div>
        <div className="modal-footer">
          <div className="left-silde">
            <Button
              target="_blank"
              onClick={() => {
                window.open(props.previewLink);
              }}
            >
              Preview
            </Button>
            {/* <Button
              target="_blank"
              onClick={() => {
                <EmbedViewer ISBN={props.ISBNBook} />
              }}
            >
              Preview
            </Button> */}
          </div>
          <div className="divider"></div>
          <div className="right-silde">
            <Dropdown
              toggle={() => {
                setOpen(!Open);
              }}
              isOpen={Open}
            >
              <DropdownToggle caret>Download Book</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>choose download format</DropdownItem>
                {!props.pdflink && !props.epublink ? (
                  <DropdownItem>You Can not download this book </DropdownItem>
                ) : (
                  ""
                )}
                {props.pdflink ? (
                  <DropdownItem
                    onClick={() => {
                      window.open(props.pdflink);
                    }}
                  >
                    pdf
                  </DropdownItem>
                ) : (
                  ""
                )}

                {props.epublink ? (
                  <DropdownItem
                    onClick={() => {
                      window.open(props.epublink);
                    }}
                  >
                    epub
                  </DropdownItem>
                ) : (
                  ""
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default BookCard;
