import React from "react";
import "./index.css";
import { UserInfo } from "../../../backend/entity";
import { selectId } from "../../../store/userSlice";
import { useSelector } from "react-redux";

type CommentProps = {
  id: number;
  content: string;
  user: UserInfo;
};

interface ChildProps {
  comment: CommentProps;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Comment: React.FC<ChildProps> = (props) => {
  const userId = useSelector(selectId);
  return (
    <div>
      <div className='sl__item__contents__comment'>
        <p>
          <b>{props.comment.user.username} :</b> {props.comment.content}
        </p>
        {userId === props.comment.user.id ? (
          <button onClick={props.onClick}>
            <i className='fas fa-times'></i>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;
