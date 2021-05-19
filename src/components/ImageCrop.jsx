import React, { useRef } from "react";
import { Button } from "react-bootstrap";

const ImageCrop = () => {
  const imageRef = useRef();

  const triggerFileSelectPopup = () => {
    imageRef.current.click();
  };

  return (
    <>
      <input
        type='file'
        accept='image/*'
        ref={imageRef}
        style={{ display: "none" }}
      />
      <Button onClick={triggerFileSelectPopup}>Choose Picture</Button>
    </>
  );
};

export default ImageCrop;
