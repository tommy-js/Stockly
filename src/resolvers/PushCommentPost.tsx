import React from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { pushCommentPostMutation } from "../queries/queries.js";

interface Props {
  username: string;
  userId: string;
  postId: string;
  text: string;
  pushCommentPostMutation: (variables: object) => any;
}

const PushCommentPost: React.FC<Props> = (props) => {
  function submitComment() {
    props
      .pushCommentPostMutation({
        variables: {
          username: props.username,
          userId: props.userId,
          postId: props.postId,
          text: props.text,
        },
      })
      .catch((err: any) => {
        console.log(err);
      })
      .then((res: any) => {
        console.log(res);
      });
  }

  return <button onClick={() => submitComment()}>Submit</button>;
};

export default compose(
  graphql(pushCommentPostMutation, { name: "pushCommentPostMutation" })
)(PushCommentPost);
