import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { FaPhotoVideo } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import "./CreatePostModal.css";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CommentModalProps> = ({ isOpen, onClose }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dropedFile = event.dataTransfer.files[0];
    if (
      dropedFile.type.startsWith("/image/") ||
      dropedFile.type.startsWith("video/")
    ) {
      setFile(dropedFile);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      if (
        (file && file.type.startsWith("image/")) ||
        file.type.startsWith("video/")
      ) {
        setFile(file);
      } else {
        setFile(null);
        alert("이미지 또는 비디오만 선택하세요");
      }
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  return (
    <div>
      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>새 게시물 만들기</p>
            <Button
              className=""
              variant={"ghost"}
              size="sm"
              colorScheme={"blue"}
            >
              Share
            </Button>
          </div>
          <hr />
          <ModalBody>
            <div className="h-[70vh] justify-between pb-5 flex">
              <div className="w-[50%]">
                {!file && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="drag-drop h-full"
                  >
                    <div>
                      <FaPhotoVideo className="text-3xl" />
                      <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      컴퓨터에서 선택
                    </label>
                    <input
                      className="fileInput"
                      type="file"
                      id="file-upload"
                      accept="image/* , video/*"
                      onChange={handleOnChange}
                    />
                  </div>
                )}
                {file && (
                  <img
                    className="max-h-full"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )}
              </div>
              <div className="w-[1px] border h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://cdn.pixabay.com/photo/2015/07/02/10/23/training-828741_640.jpg"
                    alt=""
                  />
                  <p className="font-semibold ml-4">username</p>
                </div>
                <div className="px-2">
                  <textarea
                    placeholder="Write a caption"
                    className="captionInput"
                    name="caption"
                    id=""
                    rows={10}
                    onChange={handleCaptionChange}
                  ></textarea>
                </div>

                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p className="opacity-70">{caption?.length} / 500</p>
                </div>
                <hr />
                <div className="p-2 flex justify-between items-center">
                  <input
                    className="locationInput"
                    type="text"
                    placeholder="location"
                    name="location"
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
