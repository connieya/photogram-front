import React, { useState } from "react";
import "./index.css";

import basic from "../../../assets/basic.jpg";
import logo from "../../../assets/logo.jpg";
import { uploadFeed } from "../../../backend/api";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(basic);
  const [file, setFile] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const handleImageChange = (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    setFile(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (event: any) => {
    event.preventDefault();
    const res = (
      await uploadFeed({
        createPayload: {
          file: file,
          caption: caption,
        },
      })
    ).entity;

    console.log("이미지 업로드 ", res);
    if (res.code === 1) {
      alert(res.message);
      navigate(`/user/${res.data}`);
    }
  };
  return (
    <div>
      <main className='uploadContainer'>
        <section className='upload'>
          <div className='upload-top'>
            <a href='home.html' className=''>
              <img src={logo} alt='' />
            </a>
            <p>게시물 업로드</p>
          </div>
          <form onSubmit={uploadImage} className='upload-form'>
            <input type='file' name='file' onChange={handleImageChange} />
            <div className='upload-img'>
              <img src={imagePreview} alt='' id='imageUploadPreview' />
            </div>

            <div className='upload-form-detail'>
              <input
                type='text'
                placeholder='사진설명'
                name='caption'
                value={caption}
                onChange={(e: any) => {
                  setCaption(e.target.value);
                }}
              />
              <button type='submit' className='cta blue'>
                업로드
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Upload;
