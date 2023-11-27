import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface ChagneProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  handleProfileImageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const ChangeProfilePhotoModal = ({
  isOpen,
  onClose,
  onOpen,
  handleProfileImageChange,
}: ChagneProfileModalProps) => {
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Title</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center">
              <label
                htmlFor=""
                className="font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-full"
              >
                프로필 업로드
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleProfileImageChange}
              />
            </div>
            <hr />
            <p className="font-bold py-3 text-red-600 text-center">사진 삭제</p>
            <hr />
            <p onClick={onClose} className="py-3 text-center">
              취소
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ChangeProfilePhotoModal;
