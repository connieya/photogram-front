import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldProps } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import React from "react";

interface FormValues {
  email: string;
  password: string;
  name: string;
  username: string;
}
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("잘못된 이메일 형식입니다.")
    .required("이메일을 입력해주세요."),
  password: Yup.string()
    .min(4, "비밀번호는 최소 4자리 이상 입력해야 합니다.")
    .required("비밀번호를 입력해주세요."),
  name: Yup.string().required("성명을 입력해주세요."),
  username: Yup.string().required("사용자 이름을 입력해주세요."),
});

const SignUp = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    username: "",
    name: "",
    password: "",
  };

  const handleSignInSubmit = (values: FormValues) => {
    console.log("회원 가입 =>", values);
  };
  return (
    <div>
      <div className="border">
        <Box
          p={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <img className="mb-5 w-[9rem]" src={logo} alt="" />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSignInSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <Form className="space-y-8">
                <Field name="email">
                  {({ field, form }: FieldProps<string, FormValues>) => (
                    <FormControl
                      isInvalid={
                        !!(form?.errors?.email && form?.touched?.email)
                      }
                    >
                      <Input
                        className="w-full "
                        {...field}
                        id="email"
                        placeholder="이메일"
                      ></Input>
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({ field, form }: FieldProps<string, FormValues>) => (
                    <FormControl
                      isInvalid={!!(form?.errors?.name && form?.touched?.name)}
                    >
                      <Input
                        className="w-full "
                        {...field}
                        id="name"
                        placeholder="성명"
                      ></Input>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="username">
                  {({ field, form }: FieldProps<string, FormValues>) => (
                    <FormControl
                      isInvalid={
                        !!(form?.errors?.username && form?.touched?.username)
                      }
                    >
                      <Input
                        className="w-full "
                        {...field}
                        id="username"
                        placeholder="사용자 이름"
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }: FieldProps<string, FormValues>) => (
                    <FormControl
                      isInvalid={
                        !!(form?.errors?.password && form?.touched?.email)
                      }
                    >
                      <Input
                        className="w-full "
                        {...field}
                        id="password"
                        type="password"
                        placeholder="비밀번호"
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  className="w-full"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  isLoading={formikProps.isSubmitting}
                >
                  회원가입
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
      <div className="border w-full border-slate-300 mt-5">
        <p className="text-center py-2 text-sm">
          계정이 있으신가요?
          <span
            onClick={() => navigate("/login")}
            className="ml-2 text-blue-700 cursor-pointer"
          >
            로그인
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
