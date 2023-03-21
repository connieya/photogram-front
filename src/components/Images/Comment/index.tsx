import React from "react";
import "./index.css";
import { UserInfo } from "../../../backend/entity";

type CommentProps = {
  id: number;
  content: string;
  user: UserInfo;
};

const Comment = (props: { comment: CommentProps }) => {
  return (
    <div>
      <div className='sl__item__contents__comment'>
        <p>
          <b>{props.comment.user.username} :</b> {props.comment.content}
        </p>
        <button onClick={() => {}}>
          <i className='fas fa-times'></i>
        </button>
      </div>
    </div>
  );
};

export default Comment;
