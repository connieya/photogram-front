import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

type CommentProps = {
  contentId: number;
  content: string;
  userId: number;
  username: string;
};

interface ChildProps {
  comment: CommentProps;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Comment: React.FC<ChildProps> = (props) => {
  // const userId = useSelector(selectId);
  return (
    <div>
      {/* <div className='sl__item__contents__comment'>
        <p>
          <b>{props.comment.username} :</b>
          {props.comment.content}
        </p>
        {userId === props.comment.userId ? (
          <button onClick={props.onClick}>
            <i className='fas fa-times'></i>
          </button>
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
};

export default Comment;
