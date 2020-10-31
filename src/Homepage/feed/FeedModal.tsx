import React from "react";
import { RenderModal } from "./FeedModalTypes";
import { Link } from "react-router-dom";

interface Props {
  data: any;
}

const FeedModal: React.FC<Props> = (props) => {
  console.log("feed modal data: ");
  console.log(props.data);
  return (
    <div id="modal">
      <div id="central_modal">
        <RenderModal
          title={props.data.title}
          postId={props.data.postId}
          userId={props.data.userId}
          user={props.data.user}
          text={props.data.text}
          timestamp={props.data.timestamp}
          likes={props.data.likes}
          dislikes={props.data.dislikes}
          replies={props.data.replies}
          comments={props.data.comments}
        />
      </div>
      <Link to="/home">
        <div id="feed_modal"></div>
      </Link>
    </div>
  );
};

export default FeedModal;
