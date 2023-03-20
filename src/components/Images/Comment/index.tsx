import React, { useState } from "react";
import "./index.css";
import { addComment } from "../../../backend/api";
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
      </div>
    </div>
  );
};

export default Comment;
