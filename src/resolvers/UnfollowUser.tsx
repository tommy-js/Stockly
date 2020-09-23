import React from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { unfollowUserMutation } from "../queries/queries.js";

interface Props {
  userId: number;
  followerId: number;
  unfollowUserMutation: (variables: object) => void;
}

const UnfollowUser: React.FC<Props> = (props) => {
  function unfollow() {
    props.unfollowUserMutation({
      variables: {
        userId: props.userId,
        followerId: props.followerId,
      },
    });
  }

  return <button onClick={() => unfollow()}>unfollow</button>;
};

export default compose(
  graphql(unfollowUserMutation, { name: "unfollowUserMutation" })
)(UnfollowUser);