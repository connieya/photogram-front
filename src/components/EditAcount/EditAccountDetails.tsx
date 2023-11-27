import React, { useState } from "react";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";

const initialValues = {
  name: "박건희",
  username: "",
  bio: "",
  website: "",
};

const token = localStorage.getItem("access_token");

const EditAccountDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState<File>();

  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files !== null) {
      const selectedFile = event.target.files[0];
      setImageFile(selectedFile);
    }
  };

  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: (values) => {
      const data = {
        token: token,
      };
      console.log("value => ", values);
    },
  });

  return (
    <div className="border rounded-md p-10 lg:px-40">
      <div className="flex pb-7">
        <div className="w-[15%]">
          <img
            className="w-8 h-8 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt=""
          />
        </div>
        <div>
          <p>username</p>
          <p
            onClick={onOpen}
            className="font-bold text-blue-800 cursor-pointer"
          >
            프로필 사진 변경
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="6">
          <FormControl className="flex" id="name">
            <FormLabel className="w-[15%]">이름</FormLabel>
            <div className="w-full">
              <Input
                placeholder="이름"
                className="w-full"
                type="text"
                {...formik.getFieldProps("name")}
              />
            </div>
          </FormControl>
          <FormControl className="flex" id="username">
            <FormLabel className="w-[15%]">사용자 이름</FormLabel>
            <div className="w-full">
              <Input
                placeholder="사용자 이름"
                className="w-full"
                type="text"
                {...formik.getFieldProps("username")}
              />
            </div>
          </FormControl>
          <FormControl className="flex" id="website">
            <FormLabel className="w-[15%]">웹 사이트</FormLabel>
            <div className="w-full">
              <Input
                placeholder="웹 사이트"
                className="w-full"
                type="text"
                {...formik.getFieldProps("website")}
              />
            </div>
          </FormControl>
          <FormControl className="flex" id="bio">
            <FormLabel className="w-[15%]">소개</FormLabel>
            <div className="w-full">
              <Input
                placeholder="소개"
                className="w-full"
                type="text"
                {...formik.getFieldProps("bio")}
              />
            </div>
          </FormControl>
          {/* <div className="py-10">
              <p className="font-bold text-sm">개인 정보</p>
              <p className="text-xs"> </p>
            </div> */}

          <div>
            <Button colorScheme="blue" type="submit" className="">
              제출
            </Button>
          </div>
        </Stack>
      </form>
      <ChangeProfilePhotoModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        handleProfileImageChange={handleProfileImageChange}
      />
    </div>
  );
};

export default EditAccountDetails;
