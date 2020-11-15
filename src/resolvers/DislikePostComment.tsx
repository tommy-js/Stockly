import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { dislikeCommentMutation } from "../queries/queries";
import dislike from "../images/dislike.png";
import dislikeFilled from "../images/dislike_filled.png";

interface Props {
  postId: string;
  commentId: string;
  modDislikes: () => void;
  dislikeCommentMutation: (variables: object) => any;
}

const DislikePostComment: React.FC<Props> = (props) => {
  const [imgColor, setImgColor] = useState(dislike);

  function passData() {
    props
      .dislikeCommentMutation({
        variables: {
          postId: props.postId,
          commentId: props.commentId,
        },
      })
      .then((res: any) => {
        props.modDislikes();
        setImgColor(dislikeFilled);
      })
      .catch((err: any) => {
        console.log("error");
      });
  }

  return (
    <div className="like_button_block" onClick={() => passData()}>
      <img className="like_button_image" src={imgColor} />
    </div>
  );
};

export default compose(
  graphql(dislikeCommentMutation, { name: "dislikeCommentMutation" })
)(DislikePostComment);
