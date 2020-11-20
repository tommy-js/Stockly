import React, { useEffect, useState } from "react";
import LikePostComment from "../resolvers/LikePostComment";
import DislikePostComment from "../resolvers/DislikePostComment";
import UserIndex from "../about/CommentHover/UserIndex";
import IndividualCommentSubComments from "./IndividualCommentSubComments";
import IndividualCommentReply from "./IndividualCommentReply";
import { returnTaggedString } from "../globals/functions/returnTagged";
import { useLazyQuery } from "react-apollo";
import { userCommentLookup } from "../queries/queries";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../actions/actions";
import { returnDate } from "../notifications/notificationsTimestamp";

type Routes = {
  username: string;
  userId: string;
  bio: string;
  profileImage: string;
};

type SubComments = {
  postId: string;
  commentId: string;
  username: string;
  text: string;
  timestamp: number;
  likes: number;
  dislikes: number;
  commentUsername: string;
  commentUserId: string;
};

interface Mapper {
  tag: string;
}

interface Redux {
  userRoutes: any;
  onUserRouteSet: (userRoutes: any) => void;
}

interface Props extends Redux {
  postId: string;
  commentId: string;
  username: string;
  text: string;
  timestamp: number;
  likes: number;
  dislikes: number;
  commentUsername: string;
  commentUserId: string;
  subComments: SubComments[];
}

const IndividualComment: React.FC<Props> = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);

  useEffect(() => {
    let foundInd = props.userRoutes.find(
      (el: Routes) => el.userId === props.commentUserId
    );
    if (!foundInd) {
      let obj = {
        username: props.commentUsername,
        userId: props.commentUserId,
        bio: "",
        profileImage: "",
      };
      let arr = [...props.userRoutes, obj];
      props.onUserRouteSet(arr);
    }
  }, []);

  function returnText() {
    let tag = returnTaggedString(props.text);
    return (
      <div>
        {tag.map((el: any) => (
          <IndMapper tag={el} />
        ))}
      </div>
    );
  }

  function likeIncrement() {
    let like = Number(likes);
    like++;
    setLikes(like);
  }

  function dislikeIncrement() {
    let dislike = Number(dislikes);
    dislike++;
    setDislikes(dislike);
  }

  function renderSubComments() {
    if (props.subComments) {
      return <IndividualCommentSubComments subComments={props.subComments} />;
    } else return null;
  }

  return (
    <div className="comment">
      <p className="comment_name">{props.username}</p>
      <p className="comment_time">posted at {returnDate(props.timestamp)}</p>
      <p className="comment_text">{returnText()}</p>
      <p className="comment_information">
        {likes}
        <LikePostComment
          postId={props.postId}
          commentId={props.commentId}
          modLikes={likeIncrement}
        />
        , {dislikes}{" "}
        <DislikePostComment
          postId={props.postId}
          commentId={props.commentId}
          modDislikes={dislikeIncrement}
        />
        ,
      </p>
      <IndividualCommentReply
        postId={props.postId}
        commentId={props.commentId}
      />
      {renderSubComments()}
      <IndividualCommentSubComments subComments={props.subComments} />
    </div>
  );
};

const IndMapper: React.FC<Mapper> = (props) => {
  const [callUser, { data }] = useLazyQuery(userCommentLookup);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (props.tag.includes("@")) {
      callUser({
        variables: {
          username: getUsername(),
        },
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(data.specUser);
    }
  }, [data]);

  function getUsername() {
    let username = props.tag.slice(1, props.tag.length);
    return username;
  }

  function renderFunc() {
    if (data && userData && data.specUser != null) {
      return (
        <UserIndex
          highlightUsername={userData.username}
          highlightUserId={userData.userId}
          highlightBio={userData.bio}
          highlightProfileImage={userData.profileImage}
        />
      );
    } else {
      return <span className="tag_span"> {props.tag} </span>;
    }
  }

  return renderFunc();
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualComment);
