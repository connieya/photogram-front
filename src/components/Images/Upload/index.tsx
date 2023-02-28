import React, { useState } from "react";
import "./index.css";

import basic from "../../../assets/basic.jpg";
import logo from "../../../assets/logo.jpg";

const Upload = () => {
  const [imagePreview, setImagePreview] = useState(basic);

  const handleImageChange = (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <main className='uploadContainer'>
        <section className='upload'>
          <div className='upload-top'>
            <a href='home.html' className=''>
              <img src={logo} alt='' />
            </a>
            <p>사진 업로드</p>
          </div>
          <form className='upload-form' method='post' action='/image'>
            <input type='file' name='file' onChange={handleImageChange} />
            <div className='upload-img'>
              <img src={imagePreview} alt='' id='imageUploadPreview' />
            </div>

            <div className='upload-form-detail'>
              <input type='text' placeholder='사진설명' name='caption' />
              <button className='cta blue'>업로드</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Upload;
