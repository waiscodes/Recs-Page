import React from "react";
import { Container } from "react-bootstrap";

const DisplayBooks = () => {
  return (
    <>
      <Container className='books-map'>
        {books &&
          books.map((book) => (
            <div key={book.id} className='ind-book'>
              <img src={book.thumbnail} alt='' />
              <p>{book.title}</p>
            </div>
          ))}
      </Container>
    </>
  );
};

export default DisplayBooks;
