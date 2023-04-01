import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../state/action";
import { BellOutlined } from "@ant-design/icons";
import router, { useRouter } from "next/router";
import { connect, ConnectedProps } from "react-redux";
import { ToastContainer, ToastOptions } from "react-toastify";
import { Button, Dropdown, Menu, notification, Space } from "antd";
import type { MenuProps } from "antd";
import CollabNotification from "./collabNotification";
import { AppState } from "state";

const mapStateToProps = (state: AppState) => ({
  notifications: state.notification.notifications,
  user: state.user,
  isFetchingNotifications: state.notification.isFetchingNotifications,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchNotifications: () => dispatch(actions.fetchNotifications()),
  markNotificationsRead: () => dispatch(actions.markNotificationsRead()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const Notification = ({
  notifications,
  isFetchingNotifications,
  user,
  fetchNotifications,
  markNotificationsRead,
}: Props) => {
  const [fetched, setFetched] = useState(false);
  const [hasNewNotifs, setHasNewNotifs] = useState(false);
  const router = useRouter();
  const innerNotifs = [];

  useEffect(() => {
    if (!fetched) {
      fetchNotifications();
      setFetched(true);
    }

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  notifications.forEach((notification, _) => {
    if (!hasNewNotifs && !notification.notifRead) {
      setHasNewNotifs(true);
    }
    if (notification.notifType === "NOTIFICATION_COLLAB_REQUEST_SENT") {
      const notifData = notification.notificationData;
      innerNotifs.push(
        <CollabNotification
          collabStatus="received"
          fromArtistName={
            JSON.parse(JSON.stringify(notifData))["from_artist_name"]
          }
          onClick={() => {
            router.push(`/collab/${notification.redirectId}`);
          }}
        />
      );
    }
  });
  const userMenu = (
    <Menu className="notification-menu">
      {innerNotifs}
      <Menu.Divider />
      <Menu.Item key="3">No new notifications</Menu.Item>
    </Menu>
  );
  return (
    <div
      className="notification-icon"
      onClick={() => {
        setHasNewNotifs(false);
        markNotificationsRead();
      }}
    >
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <div className="notification-inner">
          {hasNewNotifs && <div className="circle_dot"></div>}
          <BellOutlined className="user-icon" />
        </div>
      </Dropdown>
    </div>
  );
};

export default connector(Notification);
