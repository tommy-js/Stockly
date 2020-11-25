import React from "react";

interface Props {
  postId: string;
  title: string;
}

export const Like: React.FC<Props> = (props) => {
  return (
    <div key={props.postId} className="profile_like">
      <h3>{props.title}</h3>
    </div>
  );
};
