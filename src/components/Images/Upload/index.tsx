import React from "react";
import "./index.css";

import basic from "../../../assets/basic.jpg";

const Upload = () => {
  return (
    <div>
      <main className='uploadContainer'>
        <section className='upload'>
          <div className='upload-top'>
            <a href='home.html' className=''>
              <img src='/images/logo.jpg' alt='' />
            </a>
            <p>사진 업로드</p>
          </div>
          <form className='upload-form' method='post' action='/image'>
            <input type='file' name='file' />
            <div className='upload-img'>
              <img src={basic} alt='' id='imageUploadPreview' />
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
