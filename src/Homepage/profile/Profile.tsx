import React from "react";
import Settings from "./Settings";
import TradeHistory from "./TradeHistory";
import CurrentAccount from "./CurrentAccount";

interface Props {
  username: string;
}

const Profile: React.FC<Props> = (props) => {
  return (
    <div className="feed">
      <p>{props.username}</p>
      <Settings />
      <CurrentAccount />
      <TradeHistory />
    </div>
  );
};

export default Profile;