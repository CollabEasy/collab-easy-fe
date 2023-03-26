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
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const Notification = ({
  notifications,
  isFetchingNotifications,
  user,
  fetchNotifications,
}: Props) => {
  const router = useRouter();
  const innerNotifs = [];
  notifications.forEach((notification, _) => {
    if (notification.notif_type === "NOTIFICATION_COLLAB_REQUEST_SENT") {
      innerNotifs.push(
        <CollabNotification
          collabStatus="received"
          fromArtistName={JSON.parse(notification.notification_data)['from_artist_name']}
          onClick={() => {
            router.push(`/collab/${notification.redirect_id}`);
          }}
        />
      );
    }
  });
  const userMenu = (
    <Menu className="notification-menu">
      {innerNotifs}
      <Menu.Divider />
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );
  return (
    <div className="notification-icon" onClick={fetchNotifications}>
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <div className="notification-inner">
          <BellOutlined className="user-icon" />
        </div>
      </Dropdown>
    </div>
  );
};

export default connector(Notification);
