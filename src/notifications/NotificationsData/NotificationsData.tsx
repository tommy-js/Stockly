import React, { useState, useEffect } from "react";
import { NotificationsElement } from "../NotificationsElement/NotificationsElement";
import { MutateUserSettings } from "../MutateUserSettings/MutateUserSettings";
import VoidAlert from "../VoidAlert/VoidAlert";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../actions/actions";
import { NotificationItem } from "../../types/types";

interface Redux {
  userId: string;
  invisible: boolean;
  allowCommentsOnPosts: boolean;
  darkmode: boolean;
  notifications: NotificationItem[];
  onDarkmodeSet: (darkmode: boolean) => void;
  onInvisibleSet: (invisible: boolean) => void;
  onAllowCommentsSet: (allowCommentsOnPosts: boolean) => void;
}

interface Props extends Redux {
  tab: number;
  changeTab: (tab: number) => void;
  modNotificationColor: (notifArr: object[]) => void;
}

const NotificationsDataContainer: React.FC<Props> = (props) => {
  const [notifications, setNotifications] = useState(props.notifications);

  function modNotifs(id: number) {
    let notifArr = props.notifications;
    let foundArr = notifArr.find((el: any) => el.id === id);
    if (foundArr) {
      let index = notifArr.indexOf(foundArr);
      notifArr[index].viewed = true;
      setNotifications(notifArr);
      props.modNotificationColor(notifArr);
    }
  }

  function modDarkMode(darkmode: boolean) {
    props.onDarkmodeSet(darkmode);
  }

  function modPrivate(invisible: boolean) {
    props.onInvisibleSet(invisible);
  }

  function modAllowComments(allowCommentsOnPosts: boolean) {
    props.onAllowCommentsSet(allowCommentsOnPosts);
  }

  function returnEmptyNotifications() {
    if (notifications.length < 1) {
      return (
        <div>
          <button onClick={() => props.changeTab(0)}>back</button>
          <VoidAlert />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => props.changeTab(0)}>back</button>
          {notifications.map((el: any) => (
            <NotificationsElement
              key={el.id}
              userId={props.userId}
              id={el.id}
              content={el.content}
              viewed={el.viewed}
              modNotifs={modNotifs}
            />
          ))}
        </div>
      );
    }
  }

  function returnEmptyHistory() {
    // if (props.history.length < 1) {
    //   return (
    //     <div>
    //       <button onClick={() => props.changeTab(0)}>back</button>
    //       <VoidAlert />
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <button onClick={() => props.changeTab(0)}>back</button>
    //       {props.history.map((el: any) => (
    //         <HistoryElement
    //           text={el.text}
    //           style={el.style}
    //           timestamp={el.timestamp}
    //         />
    //       ))}
    //     </div>
    //   );
    // }
    return null;
  }

  useEffect(() => {
    console.log(props.notifications);
  }, [notifications]);

  function checkTab() {
    if (props.tab === 1) {
      return <div>{returnEmptyNotifications()}</div>;
    } else if (props.tab === 2) {
      return <div>{returnEmptyHistory()}</div>;
    } else if (props.tab === 3) {
      return (
        <div>
          <button onClick={() => props.changeTab(0)}>back</button>
          <MutateUserSettings
            modDarkMode={modDarkMode}
            darkmode={props.darkmode}
            modPrivate={modPrivate}
            invisible={props.invisible}
            modAllowComments={modAllowComments}
            allowCommentsOnPosts={props.allowCommentsOnPosts}
          />
        </div>
      );
    }
  }

  return <div>{checkTab()}</div>;
};

export const NotifData = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsDataContainer);