import styled from "styled-components";

export const Main = styled.main`
  padding-top: 54px;
`;

export const Section = styled.section`
  padding-top: 30px;
  width: 935px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const StoryList = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListItem = styled.div`
  margin-bottom: 30px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;

export const ListItemHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;

export const ProfileImageBox = styled.div`
  width: 40px;
  height: 40px;
  padding: 3px;
  border-radius: 50%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #c18ddf;
  }
`;

export const UploadImageBox = styled.div`
  height: 600px;
  min-height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentsWrappeIcon = styled.div`
  height: 40px;
  padding: 5px 0;
  text-align: left;
  button {
    background-color: transparent;
    width: 40px;
    font-size: 25px;
    text-align: left;
    border: 0;
    cursor: pointer;
    .active {
      color: red;
    }
  }
`;

export const Span = styled.span`
  text-align: left;
  b {
    margin-right: 5px;
  }
`;

export const ContentsBox = styled.div`
  text-align: left;
`;

export const CommentsInfo = styled.div`
  text-align: left;
  cursor: pointer;
  color: #ccc4c4;
  font-weight: bold;
`;

export const InputBox = styled.div`
  display: flex;
  border-top: 1px solid #dbdbdb;
  input {
    flex: 9;
    height: 56px;
    border: 0;
    padding-left: 15px;
  }
`;

export const Button = styled.button`
  flex: 1;
  height: 56px;
  border: 0;
  background-color: transparent;
  font-weight: 500;
  color: #0095f6;
  font-size: 14px;
`;
