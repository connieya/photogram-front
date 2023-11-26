import React, { useEffect } from "react";
import logo from "../../assets/logo.jpg";
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
import { useRecoilState } from "recoil";
import { loginUser } from "../../recoil/user";
import { signinUser } from "../../lib/Auth/api_auth";

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("이메일을 입력해주세요."),
  password: Yup.string()
    .min(4, "비밀번호는 최소 4자리 이상 입력해야 합니다.")
    .required("비밀번호를 입력해주세요."),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await signinUser(values);
      if (res.data.code === 1002) {
        alert(res.data.message);
        const result = res.data.result;
        console.log("result =", result);
        localStorage.setItem("access_token", result.accessToken);
        console.log("Setting userInfo:", {
          id: result.id,
          username: result.username,
        });
        setUserInfo({
          id: result.userInfo.id,
          username: result.userInfo.username,
        });
        navigate("/");
      }
    } catch (error: any) {
      alert(error?.response.data.message);
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("loginUser ", userInfo);
    if (userInfo.id) {
      navigate("/");
    }
  }, []);

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
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <Form className="space-y-8">
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
                        !!(form?.errors?.password && form?.touched?.password)
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
                  로그인
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
      <div className="border w-full border-slate-300 mt-5">
        <p className="text-center py-2 text-sm">
          계정이 없으신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="ml-2 text-blue-700 cursor-pointer"
          >
            가입하기
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
