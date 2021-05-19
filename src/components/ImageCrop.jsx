import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";

const ImageCrop = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] =
    useState(undefined);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const croppedAreaPixels = JSON.parse(
      window.localStorage.getItem("croppedAreaPixels")
    );
    setInitialCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    window.localStorage.setItem(
      "croppedAreaPixels",
      JSON.stringify(croppedAreaPixels)
    );
  }, []);

  return (
    <div className='App'>
      <div className='crop-container'>
        <Cropper
          image='https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          initialCroppedAreaPixels={initialCroppedAreaPixels}
        />
      </div>
      <div className='controls'>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby='Zoom'
          onChange={(e, zoom) => setZoom(zoom)}
          classes={{ container: "slider" }}
        />
      </div>
    </div>
  );
};

export default ImageCrop;
