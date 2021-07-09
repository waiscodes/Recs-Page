import React, { useCallback } from "react";

const AddBook = () => {
  const [title, setTitle] = useState();

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
  return (
    <div>
      <h5>hello world from add add book component</h5>
    </div>
  );
};

export default AddBook;
