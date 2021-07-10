import React, { useState, useCallback } from "react";
import { Form } from "react-bootstrap";

const GetBookFromGoogle = ({ title }) => {
  const [loading, setLoading] = useState(false);

  const debounceSearch = useCallback(
    debounce((title) => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
        .then((res) => {
          if (res.data.items) {
            setLoading(false);
            setResult(res.data.items.slice(0, 5));
          }
        });
    }, 500),
    []
  );

  const handleChange = (e) => {
    if (e.target.value.length > 1) {
      debounceSearch(e.target.value);
      setLoading(true);
    }
    if (e.target.value.length < 1) {
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Label className='d-none'>Title</Form.Label>
        <Form.Control
          type='text'
          placeholder='Add Book Recommendation'
          onChange={handleChange}
          value={title}
          required
        />
      </Form.Group>
    </div>
  );
};

export default GetBookFromGoogle;
