import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { updateAllowCommentsMutation } from "../queries/queries.js";

interface Props {
  allowCommentsOnPosts: boolean;
  modAllowComments: (allowCommentsOnPosts: boolean) => void;
  updateAllowCommentsMutation: (variables: object) => any;
}

const AllowComments: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(props.allowCommentsOnPosts);

  useEffect(() => {
    setChecked(props.allowCommentsOnPosts);
  }, [props.allowCommentsOnPosts]);

  function updateAllowComments() {
    let token = sessionStorage.getItem("Token");
    props
      .updateAllowCommentsMutation({
        variables: {
          token: token,
        },
      })
      .catch((err: any) => console.log(err))
      .then((res: any) => {
        setChecked(!checked);
        props.modAllowComments(!checked);
        console.log(res);
      });
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => updateAllowComments()}
      />
      <label>Allow Comments on Posts</label>
    </div>
  );
};

export default compose(
  graphql(updateAllowCommentsMutation, { name: "updateAllowCommentsMutation" })
)(AllowComments);
